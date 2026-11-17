// Capas "Reclamos SAC solucionados" y "Auditoría SAC" (datos: backend/api.php?query=sac_*).
import map from './map.js';

// sin verde ni rojo puros: quedan reservados para la auditoría
const PALETA = ['#1f77b4', '#ff7f0e', '#17becf', '#a55194', '#9467bd', '#8c564b', '#e377c2', '#2b2b2b', '#bcbd22',
    '#393b79', '#e7ba52', '#843c39', '#6b6ecf', '#8c6d31', '#f781bf', '#5254a3', '#e6550d', '#7b4173', '#b5a300'];
const OTROS = '#b0b0b0'; // categorías más allá de la paleta
const FOTOS_URL = 'https://sistemas.ciudaddecorrientes.gov.ar/documentos/sac_fotos/'; // donde SAC publica sac.fotos
// 0 = solucionado en el período sin respuesta del vecino todavía (no se lo llamó o no atendió)
const AUD = { 1: ['Sí, se solucionó', '#1a9641'], 2: ['No se solucionó', '#d7191c'], 3: ['No sabe', '#8c8c8c'], 0: ['Falta respuesta', '#ffffff'] };

const renderer = L.canvas({ padding: 0.5 });
const capas = { sac_solucionados: L.layerGroup(), sac_auditoria: L.layerGroup() };
const activos = new Set();
const ocultos = new Set();          // claves de leyenda apagadas, ej. "area:DIR. DE ARBOLADO URBANO" o "aud:2"
let rows = [], colores = { area: {}, tipo: {} }, periodos = null, leyendaKeys = [], secciones = [];

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = d => d ? d.split('-').reverse().join('/') : '';
const $p = sel => panel.querySelector(sel);

const panel = L.DomUtil.create('div', 'sac-panel leaflet-bar');
panel.innerHTML = `
    <b>Reclamos SAC</b>
    <small class="d-block text-muted" id="sac-corte">Cargando…</small>
    <div class="d-flex">
        <select id="sac-periodo" class="custom-select custom-select-sm w-auto">
            <option value="semana">Semana</option><option value="mes">Mes</option>
        </select>
        <select id="sac-valor" class="custom-select custom-select-sm"></select>
    </div>
    <select id="sac-area" class="custom-select custom-select-sm"></select>
    <select id="sac-tipo" class="custom-select custom-select-sm"></select>
    <select id="sac-barrio" class="custom-select custom-select-sm"></select>
    <label class="mb-0" id="sac-resp-box">Respuesta del vecino
        <select id="sac-resp" class="custom-select custom-select-sm">
            <option value="">Todos</option><option value="resp">Ya respondieron</option><option value="falta">Faltan responder</option>
        </select>
    </label>
    <label class="mb-0">Colorear por
        <select id="sac-color" class="custom-select custom-select-sm">
            <option value="area">Área responsable</option><option value="tipo">Tipo de reclamo</option>
        </select>
    </label>
    <div id="sac-leyenda"></div>`;
L.DomEvent.disableClickPropagation(panel);
L.DomEvent.disableScrollPropagation(panel);
const control = L.control({ position: 'topright' });
control.onAdd = () => panel;

function llenarPeriodos() {
    const semana = $p('#sac-periodo').value === 'semana';
    $p('#sac-valor').innerHTML = (semana ? periodos.semanas : periodos.meses).map(v => {
        if (!semana) {
            const [y, m] = v.split('-');
            const mes = new Date(y, m - 1, 1).toLocaleDateString('es-AR', { month: 'long' });
            return `<option value="${v}">${mes[0].toUpperCase() + mes.slice(1)}</option>`; // sin año: son 12 meses distintos
        }
        const hasta = new Date(v + 'T00:00:00'); hasta.setDate(hasta.getDate() + 6);
        return `<option value="${v}">Jue ${fmt(v).slice(0, 5)} – Mié ${hasta.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })}</option>`;
    }).join('');
}

function llenarSelect(id, campo, todos) {
    const sel = $p(id), actual = sel.value;
    const valores = [...new Set(rows.map(r => r[campo]))].sort((a, b) => a.localeCompare(b, 'es'));
    sel.innerHTML = `<option value="">${todos}</option>` + valores.map(v => `<option>${esc(v)}</option>`).join('');
    sel.value = valores.includes(actual) ? actual : '';
}

// Colores por cantidad en el período: los más frecuentes se llevan la paleta, el resto gris.
function asignarColores(campo) {
    const n = {};
    rows.forEach(r => { if (r.sol == 1) n[r[campo]] = (n[r[campo]] || 0) + 1; });
    const m = {};
    Object.keys(n).sort((a, b) => n[b] - n[a]).forEach((k, i) => { m[k] = PALETA[i] || OTROS; });
    return m;
}

let pedido = 0;
async function cargar() {
    const yo = ++pedido; // si el usuario cambia de período antes de que llegue la respuesta, se descarta
    $p('#sac-corte').textContent = 'Cargando…';
    const q = new URLSearchParams({ query: 'sac_reclamos', periodo: $p('#sac-periodo').value, desde: $p('#sac-valor').value });
    const res = await fetch('backend/api.php?' + q);
    const data = res.ok ? await res.json() : null;
    if (yo !== pedido) return;
    if (!data) { $p('#sac-corte').textContent = 'Error al cargar los reclamos'; return; }
    rows = data.rows;
    colores = { area: asignarColores('area'), tipo: asignarColores('tipo') };
    llenarSelect('#sac-area', 'area', 'Todas las áreas');
    llenarSelect('#sac-tipo', 'tipo', 'Todos los tipos');
    llenarSelect('#sac-barrio', 'barrio', 'Todos los barrios');
    $p('#sac-corte').textContent = `Auditoría cerrada al miércoles ${fmt(periodos.corte)} 21 hs`;
    dibujar();
}

function popup(r) {
    let h = `<h6 class="mb-1">Reclamo N° ${esc(r.id_contacto)}</h6>
        <b>Área:</b> ${esc(r.area)}<br><b>Tipo:</b> ${esc(r.tipo)}${r.problema ? ' – ' + esc(r.problema) : ''}<br>
        <b>Barrio:</b> ${esc(r.barrio)}<br><b>Solucionado (SAC):</b> ${fmt(r.fecha_cierre)}`;
    h += r.aud_resultado
        ? `<br><b>Auditoría:</b> <span style="color:${AUD[r.aud_resultado][1]}">${AUD[r.aud_resultado][0]}</span> (${fmt(r.aud_fecha)})`
        : '<br><b>Auditoría:</b> falta respuesta del vecino';
    if (r.fotos) {
        h += '<div class="sac-fotos"><b>Fotos de la solución:</b><br>' + r.fotos.split(',').map(n => {
            const url = FOTOS_URL + encodeURIComponent(n);
            return /\.(jpe?g|png|gif|webp)$/i.test(n)
                ? `<img src="${url}" loading="lazy" alt="Foto ${esc(n)}" data-reclamo="${esc(r.id_contacto)}" title="Ver en grande">`
                : `<a href="${url}" target="_blank" rel="noopener">${esc(n)}</a>`;
        }).join('') + '</div>';
    } else h += '<br><i class="text-muted">Sin fotos de la solución</i>';
    return h;
}

function dibujar() {
    const f = { area: $p('#sac-area').value, tipo: $p('#sac-tipo').value, barrio: $p('#sac-barrio').value };
    const campo = $p('#sac-color').value;
    const vis = rows.filter(r => (!f.area || r.area === f.area) && (!f.tipo || r.tipo === f.tipo) && (!f.barrio || r.barrio === f.barrio));
    const sol = vis.filter(r => r.sol == 1), aud = vis.filter(r => r.aud == 1);
    Object.values(capas).forEach(c => c.clearLayers());
    leyendaKeys = []; secciones = [];
    let html = '';
    $p('#sac-resp-box').style.display = activos.has('sac_auditoria') ? '' : 'none';

    if (activos.has('sac_solucionados')) {
        const n = {};
        sol.forEach(r => {
            n[r[campo]] = (n[r[campo]] || 0) + 1;
            if (ocultos.has(campo + ':' + r[campo])) return;
            L.circleMarker([r.lat, r.lng], { renderer, radius: 5, weight: 1, color: '#fff', fillColor: colores[campo][r[campo]], fillOpacity: 0.9 })
                .bindPopup(() => popup(r)).addTo(capas.sac_solucionados);
        });
        html += seccion(`Solucionados (${sol.length})`,
            Object.keys(n).sort((a, b) => n[b] - n[a]).map(k => [campo + ':' + k, colores[campo][k], k, n[k]]));
    }

    if (activos.has('sac_auditoria')) {
        const resp = $p('#sac-resp').value;
        // respondidos: llamada con respuesta en el período; faltan: solucionados en el período sin respuesta aún
        const puntos = [...(resp !== 'falta' ? aud : []), ...(resp !== 'resp' ? sol.filter(r => !r.aud_resultado) : [])];
        const n = { 1: 0, 2: 0, 3: 0, 0: 0 };
        puntos.forEach(r => {
            const k = r.aud_resultado || 0;
            n[k]++;
            if (ocultos.has('aud:' + k)) return;
            // mismo tamaño que los solucionados; el blanco ("falta respuesta") necesita borde para verse
            L.circleMarker([r.lat, r.lng], { renderer, radius: 5, weight: 1, color: k ? '#fff' : '#666', fillColor: AUD[k][1], fillOpacity: 0.9 })
                .bindPopup(() => popup(r)).addTo(capas.sac_auditoria);
        });
        const respondieron = n[1] + n[2] + n[3];
        const pctNo = respondieron ? Math.round(n[2] * 100 / respondieron) : 0;
        const partes = [];
        if (resp !== 'falta') partes.push(`${respondieron} respondieron` + (respondieron ? ` · ${pctNo}% no resuelto` : ''));
        if (resp !== 'resp') partes.push(`${n[0]} faltan responder`);
        html += seccion('Auditoría: ' + partes.join(' · '),
            [1, 2, 3, 0].filter(k => resp === '' || (resp === 'falta') === (k === 0)).map(k => ['aud:' + k, AUD[k][1], AUD[k][0], n[k]]));
    }
    $p('#sac-leyenda').innerHTML = html;
}

// items: [clave, color, texto, cantidad]
function seccion(titulo, items) {
    secciones.push(items.map(i => i[0]));
    const s = secciones.length - 1;
    return `<div class="sac-tit">${esc(titulo)}
            <span class="sac-todos"><a href="#" data-s="${s}" data-ver="1">Todos</a> · <a href="#" data-s="${s}" data-ver="0">Ninguno</a></span></div>`
        + items.map(([key, color, texto, cant]) => {
            leyendaKeys.push(key);
            return `<div class="sac-item${ocultos.has(key) ? ' sac-off' : ''}" data-i="${leyendaKeys.length - 1}" title="Clic para ocultar/mostrar">
                <span style="background:${color}"></span>${esc(texto)}<b>${cant}</b></div>`;
        }).join('');
}

$p('#sac-periodo').addEventListener('change', () => { llenarPeriodos(); cargar(); });
$p('#sac-valor').addEventListener('change', cargar);
['#sac-area', '#sac-tipo', '#sac-barrio', '#sac-color', '#sac-resp'].forEach(s => $p(s).addEventListener('change', dibujar));
$p('#sac-leyenda').addEventListener('click', e => {
    const todos = e.target.closest('[data-s]');
    if (todos) {
        e.preventDefault();
        secciones[todos.dataset.s].forEach(k => todos.dataset.ver === '1' ? ocultos.delete(k) : ocultos.add(k));
        return dibujar();
    }
    const el = e.target.closest('.sac-item');
    if (!el) return;
    const k = leyendaKeys[el.dataset.i];
    ocultos.has(k) ? ocultos.delete(k) : ocultos.add(k);
    dibujar();
});

// ---- Visor de fotos (sobre el mapa, sin salir de la página) ----
const visor = L.DomUtil.create('div', 'sac-visor', document.body);
visor.innerHTML = `<button class="sac-v-cerrar" aria-label="Cerrar">&times;</button>
    <button class="sac-v-ant" aria-label="Anterior">&#10094;</button>
    <img alt=""><button class="sac-v-sig" aria-label="Siguiente">&#10095;</button>
    <div class="sac-v-pie"></div>`;
let fotosVisor = [], iVisor = 0, reclamoVisor = '';

function mostrarFoto(i) {
    iVisor = (i + fotosVisor.length) % fotosVisor.length;
    visor.querySelector('img').src = fotosVisor[iVisor];
    visor.querySelector('.sac-v-pie').textContent = `Reclamo N° ${reclamoVisor} · foto ${iVisor + 1} de ${fotosVisor.length}`;
    visor.querySelectorAll('.sac-v-ant, .sac-v-sig').forEach(b => b.style.display = fotosVisor.length > 1 ? '' : 'none');
}
const cerrarVisor = () => { visor.classList.remove('abierto'); visor.querySelector('img').removeAttribute('src'); };

visor.addEventListener('click', e => {
    if (e.target.closest('.sac-v-ant')) mostrarFoto(iVisor - 1);
    else if (e.target.closest('.sac-v-sig')) mostrarFoto(iVisor + 1);
    else if (e.target.tagName !== 'IMG') cerrarVisor(); // fondo o ✕
});
document.addEventListener('keydown', e => {
    if (!visor.classList.contains('abierto')) return;
    if (e.key === 'Escape') cerrarVisor();
    if (e.key === 'ArrowLeft') mostrarFoto(iVisor - 1);
    if (e.key === 'ArrowRight') mostrarFoto(iVisor + 1);
});
let toqueX = null; // deslizar en celular
visor.addEventListener('touchstart', e => { toqueX = e.touches[0].clientX; }, { passive: true });
visor.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 40) mostrarFoto(iVisor + (dx < 0 ? 1 : -1));
});

// Leaflet frena la propagación de clics del popup, así que se engancha al abrirlo.
map.on('popupopen', e => {
    const imgs = [...e.popup.getElement().querySelectorAll('.sac-fotos img')];
    imgs.forEach((img, i) => img.addEventListener('click', () => {
        fotosVisor = imgs.map(x => x.src);
        reclamoVisor = img.dataset.reclamo;
        visor.classList.add('abierto');
        mostrarFoto(i);
    }));
});

let inicio = null;
async function iniciar() {
    const res = await fetch('backend/api.php?query=sac_periodos');
    if (!res.ok) { $p('#sac-corte').textContent = 'Error al cargar los períodos'; inicio = null; return; }
    periodos = await res.json();
    llenarPeriodos();
    await cargar();
}

async function show(id) {
    activos.add(id);
    capas[id].addTo(map);
    if (!control._map) control.addTo(map);
    await (inicio ??= iniciar());
    dibujar();
}

function hide(id) {
    activos.delete(id);
    capas[id].remove();
    if (activos.size) dibujar(); else control.remove();
}

export default { show, hide };
