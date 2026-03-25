<?php
/*
 * Actualizado: 29/10/2019
 * Developer: Lic Carlos Garcia - carlosgctes@gmail.com
 * Uso: para agregar una capa a la rama de informacion publica
 * agregar una entrada <li> al archivo tree_publico.php
 *
 */

// include('../glg.php');
require('data-jstree.php')
?>



<!-- VISOR PUBLICO -->

<ul>
    <li id="arbolCapasMcc" data-jstree='{"opened": true, "icon": false}'>

        <b>Informaci&oacute;n Geogr&aacute;fica</b>
        
        <!-- Obras Lineales-->

        <ul>
            <li id="obras_lineales" data-jstree='<?= $data['obras_lineales'] ?>'>
                Obras Lineales
                <ul>
                    <li id="cloacas_social" data-jstree='<?= $data['cloacas_social'] ?>'>
                        Cloacas social
                        <ul>
                            <li id="cloacas_social_anio" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por año
                                <ul>
                                    <li id="cloacas_social_anio_2018" data-jstree='<?= $data['cloacas_social_anio_2018'] ?>'>2018</li>
                                    <li id="cloacas_social_anio_2019" data-jstree='<?= $data['cloacas_social_anio_2019'] ?>'>2019</li>
                                    <li id="cloacas_social_anio_2020" data-jstree='<?= $data['cloacas_social_anio_2020'] ?>'>2020</li>
                                    <li id="cloacas_social_anio_2021" data-jstree='<?= $data['cloacas_social_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li><!-- 
                            <li id="cloacas_social_fondo" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por fondo
                                <ul>
                                    <li id="cloacas_social_fondo_muni" data-jstree='{"icon": "images/_fondo_muni.svg", "category":"Obras Lineales"}'>Municipal</li>
                                    <li id="cloacas_social_fondo_pro" data-jstree='{"icon": "images/_fondo_pro.svg", "category":"Obras Lineales"}'>Provincial</li>
                                    <li id="cloacas_social_fondo_fog" data-jstree='{"icon": "images/_fondo_fog.svg", "category":"Obras Lineales"}'>Fogop</li>
                                </ul>
                            </li> -->
                        </ul>   
                    </li>
                    <li id="cordon_cuneta" data-jstree='<?= $data['cordon_cuneta'] ?>'>´
                        Cordon cuneta
                        <ul>
                            <li id="cordon_cuneta_anio" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por año
                                <ul>
                                    <li id="cordon_cuneta_anio_2018" data-jstree='<?= $data['cordon_cuneta_anio_2018'] ?>'>2018</li>
                                    <li id="cordon_cuneta_anio_2019" data-jstree='<?= $data['cordon_cuneta_anio_2019'] ?>'>2019</li>
                                    <li id="cordon_cuneta_anio_2020" data-jstree='<?= $data['cordon_cuneta_anio_2020'] ?>'>2020</li>
                                    <li id="cordon_cuneta_anio_2021" data-jstree='<?= $data['cordon_cuneta_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li>
                            <li id="cordon_cuneta_fondo" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por fondo
                                <ul>
                                    <li id="cordon_cuneta_fondo_muni" data-jstree='<?= $data['cordon_cuneta_fondo_muni'] ?>'>Municipal</li>
                                    <li id="cordon_cuneta_fondo_pro" data-jstree='<?= $data['cordon_cuneta_fondo_pro'] ?>'>Provincial</li>
                                    <li id="cordon_cuneta_fondo_fog" data-jstree='<?= $data['cordon_cuneta_fondo_fog'] ?>'>Fogop</li>
                                </ul>
                            </li>
                            <li id="cordon_cuneta_estado" data-jstree='{"icon": "", "category":"Obras Lineales", "opened":true}'>Por estado
                                <ul>
                                    <li id="cordon_cuneta_proyectado" data-jstree='<?= $data['cordon_cuneta_proyectado']?>'>Proyectado</li>
                                    <li id="cordon_cuneta_ejecucion" data-jstree='<?=$data['cordon_cuneta_ejecucion'] ?>'>Ejecución</li>
                                    <li id="cordon_cuneta_existente" data-jstree='<?= $data['cordon_cuneta_existente']?>'>Existente</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li id="obras_enripiado" data-jstree='<?=$data['obras_enripiado']?>'>
                        Obras de enripiado
                        <ul>
                            <li id="obras_enripiado_anio" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por año
                                <ul>
                                    <li id="obras_enripiado_anio_2018" data-jstree='<?=$data['obras_enripiado_anio_2018']?>'>2018</li>
                                    <li id="obras_enripiado_anio_2019" data-jstree='<?=$data['obras_enripiado_anio_2019']?>'>2019</li>
                                    <li id="obras_enripiado_anio_2020" data-jstree='<?=$data['obras_enripiado_anio_2020']?>'>2020</li>
                                    <li id="obras_enripiado_anio_2021" data-jstree='<?=$data['obras_enripiado_anio_2021']?>'>2021</li>
                                </ul>
                            </li>
                            <li id="obras_enripiado_fondo" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por fondo
                                <ul>
                                    <li id="obras_enripiado_fondo_muni" data-jstree='<?=$data['obras_enripiado_fondo_muni']?>'>Municipal</li>
                                    <li id="obras_enripiado_fondo_pro" data-jstree='<?=$data['obras_enripiado_fondo_pro']?>'>Provincial</li>
                                    <li id="obras_enripiado_fondo_fog" data-jstree='<?=$data['obras_enripiado_fondo_fog']?>'>Fogop</li>
                                </ul>
                            </li>
                            <li id="obras_enripiado_estado" data-jstree='{"icon": "", "category":"Obras Lineales"}'>Por estado
                                <ul>
                                    <li id="obras_enripiado_proyectado" data-jstree='<?=$data['obras_enripiado_proyectado']?>'>Proyectado</li>
                                    <li id="obras_enripiado_ejecucion" data-jstree='<?=$data['obras_enripiado_ejecucion']?>'>Ejecucion</li>
                                    <li id="obras_enripiado_finalizado" data-jstree='<?=$data['obras_enripiado_finalizado']?>'>Finalizado</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li id="pavimento" data-jstree='<?= $data['pavimento'] ?>'>
                        Pavimento
                        <ul>
                            <li id="pavimento_anio" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por año
                                <ul>
                                    <li id="pavimento_anio_2018" data-jstree='<?= $data['pavimento_anio_2018'] ?>'>2018</li>
                                    <li id="pavimento_anio_2019" data-jstree='<?= $data['pavimento_anio_2019'] ?>'>2019</li>
                                    <li id="pavimento_anio_2020" data-jstree='<?= $data['pavimento_anio_2020'] ?>'>2020</li>
                                    <li id="pavimento_anio_2021" data-jstree='<?= $data['pavimento_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li>
                            <li id="pavimento_fondo" data-jstree='{"icon": "", "category":"Obras Lineales"}'>
                                Por fondo
                                <ul>
                                    <li id="pavimento_fondo_muni" data-jstree='<?= $data['pavimento_fondo_muni'] ?>'>Municipal</li>
                                    <li id="pavimento_fondo_pro" data-jstree='<?= $data['pavimento_fondo_pro'] ?>'>Provincial</li>
                                    <li id="pavimento_fondo_fog" data-jstree='<?= $data['pavimento_fondo_fog'] ?>'>Fogop</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li id="recapado" data-jstree='<?= $data['recapado'] ?>'>
                        Recapado
                        <ul>
                            <li id="recapado_anio">Por año
                                <ul>
                                    <li id="recapado_anio_2018" data-jstree='<?= $data['recapado_anio_2018'] ?>'>2018</li>
                                    <li id="recapado_anio_2019" data-jstree='<?= $data['recapado_anio_2019'] ?>'>2019</li>
                                    <li id="recapado_anio_2020" data-jstree='<?= $data['recapado_anio_2020'] ?>'>2020</li>
                                    <li id="recapado_anio_2021" data-jstree='<?= $data['recapado_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li>
                            <!-- <li id="recapado_fondo">
                                Por fondo
                                <ul>
                                    <li id="recapado_fondo_muni" data-jstree='{"icon": "images/_fondo_muni.svg", "category":"Obras Lineales"}'>Municipal</li>
                                    <li id="recapado_fondo_pro" data-jstree='{"icon": "images/_fondo_pro.svg", "category":"Obras Lineales"}'>Provincial</li>
                                    <li id="recapado_fondo_fog" data-jstree='{"icon": "images/_fondo_fog.svg", "category":"Obras Lineales"}'>Fogop</li>
                                </ul>
                            </li> -->
                        </ul>
                    </li>
                    <li id="rehabilitacion_pluviales" data-jstree='<?= $data['rehabilitacion_pluviales'] ?>'>
                        Rehabilitación de pluviales
                        <ul>
                            <li id="rehabilitacion_pluviales_anio">Por año
                                <ul>
                                    <li id="rehabilitacion_pluviales_anio_2018" data-jstree='<?= $data['rehabilitacion_pluviales_anio_2018'] ?>'>2018</li>
                                    <li id="rehabilitacion_pluviales_anio_2019" data-jstree='<?= $data['rehabilitacion_pluviales_anio_2019'] ?>'>2019</li>
                                    <li id="rehabilitacion_pluviales_anio_2020" data-jstree='<?= $data['rehabilitacion_pluviales_anio_2020'] ?>'>2020</li>
                                    <li id="rehabilitacion_pluviales_anio_2021" data-jstree='<?= $data['rehabilitacion_pluviales_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li>
                            <!-- <li id="rehabilitacion_pluviales_fondo">Por fondo
                                <ul>
                                    <li id="rehabilitacion_pluviales_fondo_muni" data-jstree='{"icon": "images/_fondo_muni.svg", "category":"Obras Lineales"}'>Municipal</li>
                                    <li id="rehabilitacion_pluviales_fondo_pro" data-jstree='{"icon": "images/_fondo_pro.svg", "category":"Obras Lineales"}'>Provincial</li>
                                    <li id="rehabilitacion_pluviales_fondo_fog" data-jstree='{"icon": "images/_fondo_fog.svg", "category":"Obras Lineales"}'>Fogop</li>
                                </ul>
                            </li> -->
                        </ul>
                    </li>
                    <li id="tubos_acceso_dom" data-jstree='<?= $data['tubos_acceso_dom'] ?>'>
                        Tubos de acceso domiciliario
                        <ul>
                            <li id="tubos_acceso_dom_anio">Por año
                                <ul>
                                    <li id="tubos_acceso_dom_anio_2018" data-jstree='<?= $data['tubos_acceso_dom_anio_2018'] ?>'>2018</li>
                                    <li id="tubos_acceso_dom_anio_2019" data-jstree='<?= $data['tubos_acceso_dom_anio_2019'] ?>'>2019</li>
                                    <li id="tubos_acceso_dom_anio_2020" data-jstree='<?= $data['tubos_acceso_dom_anio_2020'] ?>'>2020</li>
                                    <li id="tubos_acceso_dom_anio_2021" data-jstree='<?= $data['tubos_acceso_dom_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li>
                            <!-- <li id="tubos_acceso_dom_fondo">Por fondo
                                <ul>
                                    <li id="tubos_acceso_dom_fondo_muni" data-jstree='{"icon": "images/_fondo_muni.svg", "category":"Obras Lineales"}'>Municipal</li>
                                    <li id="tubos_acceso_dom_fondo_pro" data-jstree='{"icon": "images/_fondo_pro.svg", "category":"Obras Lineales"}'>Provincial</li>
                                    <li id="tubos_acceso_dom_fondo_fog" data-jstree='{"icon": "images/_fondo_fog.svg", "category":"Obras Lineales"}'>Fogop</li>
                                </ul>
                            </li> -->
                        </ul>
                    </li>
                    <li id="tubos_cruce_calle" data-jstree='<?= $data['tubos_cruce_calle'] ?>'>
                        Tubos cruce de calle
                        <ul>
                            <li id="tubos_cruce_calle_anio">Por año
                                <ul>
                                    <li id="tubos_cruce_calle_anio_2018" data-jstree='<?= $data['tubos_cruce_calle_anio_2018'] ?>'>2018</li>
                                    <li id="tubos_cruce_calle_anio_2019" data-jstree='<?= $data['tubos_cruce_calle_anio_2019'] ?>'>2019</li>
                                    <li id="tubos_cruce_calle_anio_2020" data-jstree='<?= $data['tubos_cruce_calle_anio_2020'] ?>'>2020</li>
                                    <li id="tubos_cruce_calle_anio_2021" data-jstree='<?= $data['tubos_cruce_calle_anio_2021'] ?>'>2021</li>
                                </ul>
                            </li>
                            <!-- <li id="tubos_cruce_calle_fondo">Por fondo
                                <ul>
                                    <li id="tubos_cruce_calle_fondo_muni" data-jstree='{"icon": "images/_fondo_muni.svg", "category":"Obras Lineales"}'>Municipal</li>
                                    <li id="tubos_cruce_calle_fondo_pro" data-jstree='{"icon": "images/_fondo_pro.svg", "category":"Obras Lineales"}'>Provincial</li>
                                    <li id="tubos_cruce_calle_fondo_fog" data-jstree='{"icon": "images/_fondo_fog.svg", "category":"Obras Lineales"}'>Fogop</li>
                                </ul>
                            </li> -->
                        </ul>
                    </li>
                    <li id="veredas" data-jstree='<?=$data['veredas']?>'>
                        Veredas
                        <ul>
                            <li id="veredas_anio">Por año
                                <ul>
                                    <li id="veredas_anio_2018" data-jstree='<?=$data['veredas_anio_2018']?>'>2018</li>
                                    <li id="veredas_anio_2019" data-jstree='<?=$data['veredas_anio_2019']?>'>2019</li>
                                    <li id="veredas_anio_2020" data-jstree='<?=$data['veredas_anio_2020']?>'>2020</li>
                                    <li id="veredas_anio_2021" data-jstree='<?=$data['veredas_anio_2021']?>'>2021</li>
                                </ul>
                            </li>
                            <!-- <li id="veredas_fondo">Por fondo
                                <ul>
                                    <li id="veredas_fondo_muni" data-jstree='{"icon": "images/_fondo_muni.svg", "category":"Obras Lineales"}'>Municipal</li>
                                    <li id="veredas_fondo_pro" data-jstree='{"icon": "images/_fondo_pro.svg", "category":"Obras Lineales"}'>Provincial</li>
                                    <li id="veredas_fondo_fog" data-jstree='{"icon": "images/_fondo_fog.svg", "category":"Obras Lineales"}'>Fogop</li>
                                </ul>
                            </li> -->
                        </ul>
                    </li>
                </ul>
            </li>

            <li id="obras_puntuales" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Obras Puntuales"}'> Obras Puntuales
                <ul>
                    <li id="reparacion_cordones" data-jstree='<?=$data['reparacion_cordones']?>'>Reparación de cordones</li>
                    <li id="intervencion_plazas" data-jstree='<?=$data['intervencion_plazas']?>'>Intervención en plazas</li>
                    <li id="instalacion_leds" data-jstree='<?=$data['instalacion_leds']?>'>Instalacion de leds
                        <ul>
                            <li id="led_proyectado" data-jstree='<?=$data['led_proyectado']?>'>Proyectado</li>
                            <li id="led_ejecucion" data-jstree='<?=$data['led_ejecucion']?>'>Ejecucion</li>
                            <li id="led_finalizado" data-jstree='<?=$data['led_finalizado']?>'>Finalizado</li>
                        </ul>
                    </li>
                    <li id="rehabilitacion_sumideros" data-jstree='<?=$data['rehabilitacion_sumideros']?>'>Rehabilitacion de sumideros</li>
                    <!-- <li id="bacheo" data-jstree='{"icon": "images/bacheo-reference.svg", "category":"Obras Puntuales"}'>Bacheo</li> -->
                    <li id="bacheo" data-jstree='<?= $data['bacheo'] ?>'> Bacheo
                        <ul >
                            <li id="bacheo_proyectado" data-jstree='<?= $data['bacheo_proyectado'] ?>'>Proyectado</li>
                            <li id="bacheo_ejecucion" data-jstree='<?= $data['bacheo_ejecucion'] ?>'>En ejecución</li>
                            <li id="bacheo_finalizado" data-jstree='<?= $data['bacheo_finalizado'] ?>'>Finalizado</li>
                        </ul>
                    </li>
                </ul>
            </li>

            <!-- <li id="obras_viales" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Obras Puntuales"}'>Obras Viales
                <ul>
                    <li id="pavimento2" data-jstree='{"icon": "images/pavimento-reference.svg", "category":"Obras Puntuales"}'>Pavimento</li>
                    <li id="cordon_cuneta2" data-jstree='{"icon": "images/cordon-cuneta-reference.svg", "category":"Obras Puntuales"}'>Cordon cuneta</li>
                    <li id="recapado2" data-jstree='{"icon": "images/recapado-reference.svg", "category":"Obras Puntuales"}'>Recapado</li>
                    <li id="ripio" data-jstree='{"icon": "images/enripiado-reference.svg", "category":"Obras Puntuales"}'>Ripio</li>
                </ul>
            </li> -->

            <!-- PLANEAMIENTO URBANO -->
            <li id="planeamientoUrbano" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Planeamiento Urbano", "class": "folder"}'>Planeamiento urbano
                <ul>
                    <li id="vw_distritos_planeamiento_urbano" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_distritos_planeamiento_urbano&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Distritos C&oacute;digo Planeamiento Urbano</li>
                    <li id="vw_ejido_urbano" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_ejido_urbano_rural&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Ejido urbano</li>
                    <li id="vw_medianas" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_medianas&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Medianas de la ciudad</li>
                    <li id="vw_edificios_historicos" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_edificios_historicos&WS=planeamiento_urbano'; ?>", "category":"Planeamiento Urbano"}'>Inmuebles de valor patrimonial</li>
                    <!-- agregado por carlos 13/11/2020  -->
                    <li id="vw_parcelas_por_distrito" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_parcelas_por_distrito&WS=app'; ?>", "category":"Planeamiento Urbano"}'>Parcelas por Distrito</li>
                </ul>
            </li>

            <li id="informacion_complementaria" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Informacion Complementaria"}'> Informacion complementaria
                <ul>
                    <li id="vw_barrios" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_barrios_de_la_ciudad&WS=informacion_catastral'; ?>", "category":"Informacion catastral"}'>Barrios</li>
                    <li id="vw_asentamiento_renabap" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_asentamiento_renabap&WS=informacion_catastral'; ?>", "category":"Informacion catastral"}'>Asentamientos informales (Re.Na.Ba.P.)</li>
                    <li id="vw_zonas_municipales" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_zonas_municipales&WS=desarrollo_comunitario'; ?>", "category":"Desarrollo social comunitario"}'>Zonas municipales</li>
                    <li id="zonas_ele" data-jstree='{"icon": "images/zonas_ele_reference.png", "category":"Zonas Ele"}'>Circuitos Electorales</li>
                    <li id="poligonos_aux" data-jstree='{"icon": ""}'>Poligonos Auxiliares</li>
                    <li id="lyr_red_agua_potable" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=red_agua_potable&WS=infraestructura'; ?>"}'>Red de agua potable</li>
                    <li id="vw_desagues_pluviales" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_desagues_pluviales&WS=infraestructura'; ?>"}'>Red de desague pluvial</li>
                    <li id="vw_red_desague_cloaca" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_red_de_cloaca&WS=infraestructura'; ?>"}'>Red de desague cloacal</li>
                    <li id="vw_ide_calle_por_tipo_calzada" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_ide_calle_por_tipo_calzada&WS=red_vial'; ?>", "category":"Red vial"}'>Calles por tipo de calzada</li>
                    <li id="vw_parcelas" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_parcelas&WS=informacion_catastral'; ?>", "category":"Red vial"}'>Parcelario Catastral</li>
                    <li id="parcelas_muni" data-jstree='{"icon": "images/municipales.jpg", "category":"Red vial"}'>Parcelas Municipales</li>
                    
                    <?php if(in_array($_SESSION['usuario'], ['bertolod', 'rosperoni', 'wichmanna', 'nahuels'])): ?>
                        <li id="parcelas_muni_baldias" data-jstree='{"icon": "images/muni_baldias.jpg", "category":"Red vial"}'>Parcelas Municipales Baldias</li>
                    <?php endif; ?>
                </ul>
            </li>

            <!-- <li id="desasocialComunit" data-jstree='{"icon": "images/icon/folder-1-16.png", "category":"Desarrollo social comunitario"}'> Desarrollo social comunitario
                <ul>
                    <li id="vw_zonas_municipales" data-jstree='{"icon": "<?php echo 'backend/glg.php?LAYER=vw_zonas_municipales&WS=desarrollo_comunitario'; ?>", "category":"Desarrollo social comunitario"}'>Zonas municipales</li>
                </ul>
            </li> -->

        </ul>

        

        

        
    </li>
</ul>
