-- Capas "Reclamos SAC solucionados" y "Auditoría SAC" del visor privado.
-- Base: gis en 192.168.10.51 (PG 9.3), dueño appGis (el backend la refresca: ver sacRefrescar en backend/api.php).
-- Origen: bdSueldos.sac en 192.168.10.181, leído por dblink con el mismo usuario que gismcc.vwlnk_reclamos2020.
--
-- Ejecutar:  psql -h 192.168.10.51 -U appGis -d gis -v sac_conn='host=192.168.10.181 port=5432 dbname=bdSueldos user=gis password=...' -f sql/sac_reclamos.sql

-- Nombres de áreas: el usuario gis no puede leer public.scm001_her en .181, así que se copian acá.
-- shortcut: copia manual (id_area -> c01leyen); si se da GRANT SELECT ON public.scm001_her TO gis, reemplazar por join remoto.
CREATE TABLE IF NOT EXISTS gismcc.sac_areas_nombre (
    id_area integer PRIMARY KEY,
    nombre  varchar NOT NULL
);

DROP MATERIALIZED VIEW IF EXISTS gismcc.mv_sac_solucionados;

CREATE MATERIALIZED VIEW gismcc.mv_sac_solucionados AS
SELECT t.id_contacto,
       t.the_geom,
       t.fecha_cierre,
       coalesce(an.nombre, nullif(trim(t.area_desc), ''), 'Área ' || t.id_area) AS area,
       coalesce(t.grupo, 'Sin tipo') AS tipo,
       t.problema,
       coalesce(t.barrio, 'Sin barrio') AS barrio,
       t.aud_resultado,   -- 1 Sí, 2 No, 3 No sabe (última llamada con respuesta); null = sin auditar
       t.aud_fecha,
       t.fotos,           -- nombres separados por coma; archivos en https://sistemas.ciudaddecorrientes.gov.ar/documentos/sac_fotos/
       (now() AT TIME ZONE 'America/Argentina/Buenos_Aires') AS actualizado
FROM dblink(:'sac_conn', $remoto$
    WITH ult_asig AS (
        SELECT DISTINCT ON (id_contacto) id_contacto, id_asignacion, id_area, id_tipo_cierre, fecha_cierre
        FROM sac.contactos_asignacion
        ORDER BY id_contacto, id_asignacion DESC
    ), ult_llamada AS (
        SELECT DISTINCT ON (ac.id_contacto) ac.id_contacto, co.resuelto, co.fe_comunicacion
        FROM sac.aud_comunicaciones co
        JOIN sac.aud_contactos ac USING (id_aud_contacto)
        WHERE co.resuelto IN (1, 2, 3)
        ORDER BY ac.id_contacto, co.fe_comunicacion DESC, co.id_aud_comunicaciones DESC
    ), fotos_gestor AS (   -- fotos que el gestor carga en el seguimiento (las del vecino no tienen id_seguimiento)
        SELECT f.id_contacto, sg.id_asignacion, string_agg(f.nombre_foto, ',' ORDER BY f.id_foto) AS fotos
        FROM sac.fotos f
        JOIN sac.seguimiento sg ON sg.id_contacto = f.id_contacto AND sg.id_seguimiento = f.id_seguimiento
        GROUP BY f.id_contacto, sg.id_asignacion
    )
    SELECT c.id_contacto, c.ubi_punto, u.fecha_cierre, u.id_area, a.descripcion,
           g.descripcion, p.asunto, b.nomba, l.resuelto, l.fe_comunicacion, fg.fotos
    FROM ult_asig u
    JOIN sac.contactos c USING (id_contacto)
    JOIN sac.areas a ON a.id_area = u.id_area
    LEFT JOIN sac.problemas p ON p.id_problema = c.id_problema
    LEFT JOIN sac.problemas_grupos g ON g.id_grupo_problema = p.id_grupo_problema
    LEFT JOIN sac.barrios b ON b.codba = c.codba
    LEFT JOIN ult_llamada l ON l.id_contacto = c.id_contacto
                           AND l.fe_comunicacion >= u.fecha_cierre  -- llamadas de un cierre anterior (reabierto) no cuentan
    LEFT JOIN fotos_gestor fg ON fg.id_contacto = c.id_contacto AND fg.id_asignacion = u.id_asignacion  -- solo el ciclo que cerró
    WHERE u.id_tipo_cierre = 1                      -- Solucionado
      AND u.fecha_cierre >= DATE '2023-09-01'       -- inicio de la auditoría
      AND c.ubi_punto IS NOT NULL
      AND st_x(c.ubi_punto) BETWEEN -59 AND -58.5   -- descarta POINT(0 0) y puntos fuera de la ciudad
      AND st_y(c.ubi_punto) BETWEEN -27.7 AND -27.3
$remoto$) AS t(id_contacto bigint, the_geom geometry, fecha_cierre date, id_area integer, area_desc varchar,
               grupo varchar, problema varchar, barrio varchar, aud_resultado integer, aud_fecha date, fotos text)
LEFT JOIN gismcc.sac_areas_nombre an ON an.id_area = t.id_area;

CREATE INDEX mv_sac_solucionados_cierre_idx ON gismcc.mv_sac_solucionados (fecha_cierre);
CREATE INDEX mv_sac_solucionados_aud_idx ON gismcc.mv_sac_solucionados (aud_fecha);
