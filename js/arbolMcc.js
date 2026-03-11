import map from './map.js';

const arbolMcc = (function(){
    var capas=[];
    var arbol = $('#arbolMCC');

    function init(){
        arbol.jstree({
            "checkbox": {
                cascade: "",
                three_state: false
            },
            'plugins': ["wholerow", "checkbox"]
        }).on('changed.jstree', async function(e, data){
            switch (data.action) {
                case 'select_node':
                    switch (data.node.id) {
                        case 'vw_distritos_planeamiento_urbano':
                            map.addLayer(vw_distritos_planeamiento_urbano);
                            break;
                        case 'vw_ejido_urbano': 
                            map.addLayer(vw_ejido_urbano);
                            break;
                        case 'vw_medianas': 
                            map.addLayer(vw_medianas);
                            break;
                        case 'vw_edificios_historicos': 
                            map.addLayer(vw_edificios_historicos);
                            break;
                        case 'vw_parcelas_por_distrito':
                            map.addLayer(vw_parcelas_por_distrito);
                            break;
                        case 'vw_barrios':
                            map.addLayer(vw_barrios);
                            break;
                        case 'vw_zonas_municipales':
                            map.addLayer(vw_zonas_municipales);
                            break;
                        case 'lyr_red_agua_potable':
                            map.addLayer(lyr_red_agua_potable);
                            break;

                        case 'vw_desagues_pluviales':
                            map.addLayer(vw_desagues_pluviales);
                            break;

                        case 'vw_red_desague_cloaca':
                            map.addLayer(vw_red_desague_cloaca);
                            break;

                        case 'vw_ide_calle_por_tipo_calzada':
                            map.addLayer(vw_ide_calle_por_tipo_calzada);
                            break;
                        case 'vw_parcelas':
                            map.addLayer(vw_parcelas);
                            break;
                        case 'parcelas_muni':
                            if(!parcelas_muni){
                                parcelas_muni = await getParcelasMuni();
                                if(parcelas_muni) map.addLayer(parcelas_muni);
                            }else map.addLayer(parcelas_muni)
                            break;
                        case 'parcelas_muni_baldias':
                            map.addLayer(parcelas_muni_baldias);
                            break;
                        case 'zonas_ele':
                            if(!zonas_ele) {
                                zonas_ele = await getZonasEle();
                                if(zonas_ele) capas['zonas_ele'] = zonas_ele.addTo(map);
                            }else zonas_ele.addTo(map);
                            break;
                        case 'poligonos_aux':
                            if(!poligonos_aux) {
                                poligonos_aux = await getPoligonosAux();
                                if(poligonos_aux) capas['poligonos_aux'] = poligonos_aux.addTo(map);
                            }else poligonos_aux.addTo(map);
                            break;
                            
                            //CLOACA SOCIAL ###########################
                        case 'cloacas_social':
                            map.addLayer(cloacas_social);
                            break;
                        case 'cloacas_social_anio_2018':
                            map.addLayer(cloacas_social_anio_2018);
                            break;
                        case 'cloacas_social_anio_2019':
                            map.addLayer(cloacas_social_anio_2019);
                            break;
                        case 'cloacas_social_anio_2020':
                            map.addLayer(cloacas_social_anio_2020);
                            break;
                        case 'cloacas_social_anio_2021':
                            map.addLayer(cloacas_social_anio_2021);
                            break;

                            //CORDON CUNETA #############################################
                        case 'cordon_cuneta':
                            map.addLayer(cordon_cuneta);
                            break;
                        case 'cordon_cuneta_anio_2018':
                            map.addLayer(cordon_cuneta_anio_2018);
                            break;
                        case 'cordon_cuneta_anio_2019':
                            map.addLayer(cordon_cuneta_anio_2019);
                            break;
                        case 'cordon_cuneta_anio_2020':
                            map.addLayer(cordon_cuneta_anio_2020);
                            break;
                        case 'cordon_cuneta_anio_2021':
                            map.addLayer(cordon_cuneta_anio_2021);
                            break;
                        case 'cordon_cuneta_fondo_muni':
                            map.addLayer(cordon_cuneta_fondo_muni);
                            break;
                        case 'cordon_cuneta_fondo_fog':
                            map.addLayer(cordon_cuneta_fondo_fog);
                            break;
                        case 'cordon_cuneta_fondo_pro':
                            map.addLayer(cordon_cuneta_fondo_pro);
                            break;
                        case 'cordon_cuneta_proyectado':
                            map.addLayer(cordon_cuneta_proyectado);
                            break;
                        case 'cordon_cuneta_ejecucion':
                            map.addLayer(cordon_cuneta_ejecucion);
                            break;
                        case 'cordon_cuneta_existente':
                            map.addLayer(cordon_cuneta_existente);
                            break;

                            //OBRAS ENRIPIADO #########################
                        case 'obras_enripiado':
                            map.addLayer(obras_enripiado);
                            break;
                        case 'obras_enripiado_anio_2018':
                            map.addLayer(obras_enripiado_anio_2018);
                            break;
                        case 'obras_enripiado_anio_2019':
                            map.addLayer(obras_enripiado_anio_2019);
                            break;
                        case 'obras_enripiado_anio_2020':
                            map.addLayer(obras_enripiado_anio_2020);
                            break;
                        case 'obras_enripiado_anio_2021':
                            map.addLayer(obras_enripiado_anio_2021);
                            break;

                        case 'obras_enripiado_fondo_muni':
                            map.addLayer(obras_enripiado_fondo_muni);
                            break;
                        case 'obras_enripiado_fondo_pro':
                            map.addLayer(obras_enripiado_fondo_pro);
                            break;
                        case 'obras_enripiado_fondo_fog':
                            map.addLayer(obras_enripiado_fondo_fog);
                            break;
                        case 'obras_enripiado_proyectado':
                            map.addLayer(obras_enripiado_proyectado);
                            break;
                        case 'obras_enripiado_ejecucion':
                            map.addLayer(obras_enripiado_ejecucion);
                            break;
                        case 'obras_enripiado_finalizado':
                            console.log('activado enripiado finalizado');
                            map.addLayer(obras_enripiado_finalizado);
                            break;

                            //PAVIMENTO ######################################

                        case 'pavimento':
                            map.addLayer(pavimento);
                            break;
                        case 'pavimento_anio_2018':
                            map.addLayer(pavimento_anio_2018);
                            break;
                        case 'pavimento_anio_2019':
                            map.addLayer(pavimento_anio_2019);
                            break;
                        case 'pavimento_anio_2020':
                            map.addLayer(pavimento_anio_2020);
                            break;
                        case 'pavimento_anio_2021':
                            map.addLayer(pavimento_anio_2021);
                            break;
                        case 'pavimento_fondo_muni':
                            map.addLayer(pavimento_fondo_muni);
                            break;
                        case 'pavimento_fondo_fog':
                            map.addLayer(pavimento_fondo_fog);
                            break;
                        case 'pavimento_fondo_pro':
                            map.addLayer(pavimento_fondo_pro);
                            break;

                            //RECAPADO ###################################################

                        case 'recapado':
                            map.addLayer(recapado);
                            break;
                        case 'recapado_anio_2018':
                            map.addLayer(recapado_anio_2018);
                            break;
                        case 'recapado_anio_2019':
                            map.addLayer(recapado_anio_2019);
                            break;
                        case 'recapado_anio_2020':
                            map.addLayer(recapado_anio_2020);
                            break;
                        case 'recapado_anio_2021':
                            map.addLayer(recapado_anio_2021);
                            break;

                            //PLUVIALES ##############################################
                        case 'rehabilitacion_pluviales':
                            map.addLayer(rehabilitacion_pluviales);
                            break;
                        case 'rehabilitacion_pluviales_anio_2018':
                            map.addLayer(rehabilitacion_pluviales_anio_2018);
                            break;
                        case 'rehabilitacion_pluviales_anio_2019':
                            map.addLayer(rehabilitacion_pluviales_anio_2019);
                            break;
                        case 'rehabilitacion_pluviales_anio_2020':
                            map.addLayer(rehabilitacion_pluviales_anio_2020);
                            break;
                        case 'rehabilitacion_pluviales_anio_2021':
                            map.addLayer(rehabilitacion_pluviales_anio_2021);
                            break;

                            //TUBOS ACCESO DOMICILIARIO ###############################
                        case 'tubos_acceso_dom':
                            map.addLayer(tubos_acceso_dom);
                            break;
                        case 'tubos_acceso_dom_anio_2018':
                            map.addLayer(tubos_acceso_dom_anio_2018);
                            break;
                        case 'tubos_acceso_dom_anio_2019':
                            map.addLayer(tubos_acceso_dom_anio_2019);
                            break;
                        case 'tubos_acceso_dom_anio_2020':
                            map.addLayer(tubos_acceso_dom_anio_2020);
                            break;
                        case 'tubos_acceso_dom_anio_2021':
                            map.addLayer(tubos_acceso_dom_anio_2021);
                            break;

                            //TUBOS CRUCE CALLE ###############################
                        case 'tubos_cruce_calle':
                            map.addLayer(tubos_cruce_calle);
                            break;
                        case 'tubos_cruce_calle_anio_2018':
                            map.addLayer(tubos_cruce_calle_anio_2018);
                            break;
                        case 'tubos_cruce_calle_anio_2019':
                            map.addLayer(tubos_cruce_calle_anio_2019);
                            break;
                        case 'tubos_cruce_calle_anio_2020':
                            map.addLayer(tubos_cruce_calle_anio_2020);
                            break;
                        case 'tubos_cruce_calle_anio_2021':
                            map.addLayer(tubos_cruce_calle_anio_2021);
                            break;

                            //VEREDAS #############################################
                        case 'veredas':
                            map.addLayer(veredas);
                            break;
                        case 'veredas_anio_2018':
                            map.addLayer(veredas_anio_2018);
                            break;
                        case 'veredas_anio_2019':
                            map.addLayer(veredas_anio_2019);
                            break;
                        case 'veredas_anio_2020':
                            map.addLayer(veredas_anio_2020);
                            break;
                        case 'veredas_anio_2021':
                            map.addLayer(veredas_anio_2021);
                            break;

                            //REPARACION CORDONES ###########################
                        case 'reparacion_cordones':
                            map.addLayer(reparacion_cordones);
                            break;

                        //LEDS #######################################
                        case 'instalacion_leds':
                            map.addLayer(instalacion_leds);
                            break;
                        case 'led_proyectado':
                            if(!led_proyectado){
                                led_proyectado = await getObras(_proyectado_point_style, 'backend/api.php?obra=LED&estado=proyect');
                                if(led_proyectado) map.addLayer(led_proyectado);
                            }else map.addLayer(led_proyectado)
                            break;
                        case 'led_finalizado':
                            map.addLayer(led_finalizado);
                            break;
                        case 'led_ejecucion':
                            map.addLayer(led_ejecucion);
                            break;

                            //INTERVENCION PLAZAS ###########################
                        case 'intervencion_plazas':
                            map.addLayer(intervencion_plazas);
                            break;

                            //SUMIDEROS ###########################
                        case 'rehabilitacion_sumideros':
                            map.addLayer(rehabilitacion_sumideros);
                            break;
                            
                            //BACHEO ########################################
                        case 'bacheo':
                            map.addLayer(bacheo);
                            break;
                        case 'bacheo_proyectado':
                            map.addLayer(bacheo_proyectado);
                            break;
                        case 'bacheo_finalizado':
                            map.addLayer(bacheo_finalizado);
                            break;
                        case 'bacheo_ejecucion':
                            map.addLayer(bacheo_ejecucion);
                            break;
                        default:
                            if(!data.node.data.jstree.url) return false;
                            
                            if(!capas[data.node.id]){
                                console.log('click')
                                let geojson = await getObras(data.node.data.jstree.estilos, data.node.data.jstree.url);
                                if(geojson) capas[data.node.id] = geojson.addTo(map);
                            }else capas[data.node.id].addTo(map);
                            break;
                    }
                    break;
                
                case 'deselect_node':
                    switch (data.node.id) {
                        case 'vw_distritos_planeamiento_urbano':
                            map.removeLayer(vw_distritos_planeamiento_urbano);
                            break;
                        case 'vw_ejido_urbano': 
                            map.removeLayer(vw_ejido_urbano);
                            break;
                        case 'vw_medianas': 
                            map.removeLayer(vw_medianas);
                            break;
                        case 'vw_edificios_historicos': 
                            map.removeLayer(vw_edificios_historicos);
                            break;
                        case 'vw_parcelas_por_distrito':
                            map.removeLayer(vw_parcelas_por_distrito);
                            break;

                        case 'vw_barrios':
                            map.removeLayer(vw_barrios);
                            break;
                        case 'vw_zonas_municipales':
                            map.removeLayer(vw_zonas_municipales);
                            break;
                        case 'lyr_red_agua_potable':
                            map.removeLayer(lyr_red_agua_potable);
                            break;

                        case 'vw_desagues_pluviales':
                            map.removeLayer(vw_desagues_pluviales);
                            break;

                        case 'vw_red_desague_cloaca':
                            map.removeLayer(vw_red_desague_cloaca);
                            break;

                        case 'vw_ide_calle_por_tipo_calzada':
                            map.removeLayer(vw_ide_calle_por_tipo_calzada);
                            break;
                        
                        case 'zonas_ele':
                            capas['zonas_ele'].remove();
                            break;

                        case 'poligonos_aux':
                            capas['poligonos_aux'].remove();
                            break;
                        
                        case 'vw_parcelas':
                            map.removeLayer(vw_parcelas);
                            break;
                        case 'parcelas_muni':
                            map.removeLayer(parcelas_muni);
                            break;
                        case 'parcelas_muni_baldias':
                            map.removeLayer(parcelas_muni_baldias);
                            break;
                        
                            //CLOACA SOCIAL ##########################
                        case 'cloacas_social':
                            map.removeLayer(cloacas_social);
                            break;
                        case 'cloacas_social_anio_2018':
                            map.removeLayer(cloacas_social_anio_2018);
                            break;
                        case 'cloacas_social_anio_2019':
                            map.removeLayer(cloacas_social_anio_2019);
                            break;
                        case 'cloacas_social_anio_2020':
                            map.removeLayer(cloacas_social_anio_2020);
                            break;
                        case 'cloacas_social_anio_2021':
                            map.removeLayer(cloacas_social_anio_2021);
                            break;

                            //CORDON CUNETA #########################
                        case 'cordon_cuneta':
                            map.removeLayer(cordon_cuneta);
                            break;
                        case 'cordon_cuneta_anio_2018':
                            map.removeLayer(cordon_cuneta_anio_2018);
                            break;
                        case 'cordon_cuneta_anio_2019':
                            map.removeLayer(cordon_cuneta_anio_2019);
                            break;
                        case 'cordon_cuneta_anio_2020':
                            map.removeLayer(cordon_cuneta_anio_2020);
                            break;
                        case 'cordon_cuneta_anio_2021':
                            map.removeLayer(cordon_cuneta_anio_2021);
                            break;
                        case 'cordon_cuneta_fondo_muni':
                            map.removeLayer(cordon_cuneta_fondo_muni);
                            break;
                        case 'cordon_cuneta_fondo_fog':
                            map.removeLayer(cordon_cuneta_fondo_fog);
                            break;
                        case 'cordon_cuneta_fondo_pro':
                            map.removeLayer(cordon_cuneta_fondo_pro);
                            break;
                        case 'cordon_cuneta_proyectado':
                            map.removeLayer(cordon_cuneta_proyectado);
                            break;
                        case 'cordon_cuneta_ejecucion':
                            map.removeLayer(cordon_cuneta_ejecucion);
                            break;
                        case 'cordon_cuneta_existente':
                            map.removeLayer(cordon_cuneta_existente);
                            break;

                            //OBRAS ENRIPIADO #########################
                        case 'obras_enripiado':
                            map.removeLayer(obras_enripiado);
                            break;
                        case 'obras_enripiado_anio_2018':
                            map.removeLayer(obras_enripiado_anio_2018);
                            break;
                        case 'obras_enripiado_anio_2019':
                            map.removeLayer(obras_enripiado_anio_2019);
                            break;
                        case 'obras_enripiado_anio_2020':
                            map.removeLayer(obras_enripiado_anio_2020);
                            break;
                        case 'obras_enripiado_anio_2021':
                            map.removeLayer(obras_enripiado_anio_2021);
                            break;

                        case 'obras_enripiado_fondo_muni':
                            map.removeLayer(obras_enripiado_fondo_muni);
                            break;
                        case 'obras_enripiado_fondo_pro':
                            map.removeLayer(obras_enripiado_fondo_pro);
                            break;
                        case 'obras_enripiado_fondo_fog':
                            map.removeLayer(obras_enripiado_fondo_fog);
                            break;
                        case 'obras_enripiado_proyectado':
                            map.removeLayer(obras_enripiado_proyectado);
                            break;
                        case 'obras_enripiado_ejecucion':
                            map.removeLayer(obras_enripiado_ejecucion);
                            break;
                        case 'obras_enripiado_finalizado':
                            map.removeLayer(obras_enripiado_finalizado);
                            break;

                        //PAVIMENTO ######################################

                        case 'pavimento':
                            map.removeLayer(pavimento);
                            break;
                        case 'pavimento_anio_2018':
                            map.removeLayer(pavimento_anio_2018);
                            break;
                        case 'pavimento_anio_2019':
                            map.removeLayer(pavimento_anio_2019);
                            break;
                        case 'pavimento_anio_2020':
                            map.removeLayer(pavimento_anio_2020);
                            break;
                        case 'pavimento_anio_2021':
                            map.removeLayer(pavimento_anio_2021);
                            break;
                        case 'pavimento_fondo_muni':
                            map.removeLayer(pavimento_fondo_muni);
                            break;
                        case 'pavimento_fondo_fog':
                            map.removeLayer(pavimento_fondo_fog);
                            break;
                        case 'pavimento_fondo_pro':
                            map.removeLayer(pavimento_fondo_pro);
                            break;

                            //RECAPADO ####################################
                        case 'recapado':
                            map.removeLayer(recapado);
                            break;
                        case 'recapado_anio_2018':
                            map.removeLayer(recapado_anio_2018);
                            break;
                        case 'recapado_anio_2019':
                            map.removeLayer(recapado_anio_2019);
                            break;
                        case 'recapado_anio_2020':
                            map.removeLayer(recapado_anio_2020);
                            break;
                        case 'recapado_anio_2021':
                            map.removeLayer(recapado_anio_2021);
                            break;

                            //PLUVIALES ##############################################
                        case 'rehabilitacion_pluviales':
                            map.removeLayer(rehabilitacion_pluviales);
                            break;
                        case 'rehabilitacion_pluviales_anio_2018':
                            map.removeLayer(rehabilitacion_pluviales_anio_2018);
                            break;
                        case 'rehabilitacion_pluviales_anio_2019':
                            map.removeLayer(rehabilitacion_pluviales_anio_2019);
                            break;
                        case 'rehabilitacion_pluviales_anio_2020':
                            map.removeLayer(rehabilitacion_pluviales_anio_2020);
                            break;
                        case 'rehabilitacion_pluviales_anio_2021':
                            map.removeLayer(rehabilitacion_pluviales_anio_2021);
                            break;

                            //TUBOS ACCESO DOMICILIARIO ###############################
                        case 'tubos_acceso_dom':
                            map.removeLayer(tubos_acceso_dom);
                            break;
                        case 'tubos_acceso_dom_anio_2018':
                            map.removeLayer(tubos_acceso_dom_anio_2018);
                            break;
                        case 'tubos_acceso_dom_anio_2019':
                            map.removeLayer(tubos_acceso_dom_anio_2019);
                            break;
                        case 'tubos_acceso_dom_anio_2020':
                            map.removeLayer(tubos_acceso_dom_anio_2020);
                            break;
                        case 'tubos_acceso_dom_anio_2021':
                            map.removeLayer(tubos_acceso_dom_anio_2021);
                            break;

                            //TUBOS CRUCE CALLE ###############################
                        case 'tubos_cruce_calle':
                            map.removeLayer(tubos_cruce_calle);
                            break;
                        case 'tubos_cruce_calle_anio_2018':
                            map.removeLayer(tubos_cruce_calle_anio_2018);
                            break;
                        case 'tubos_cruce_calle_anio_2019':
                            map.removeLayer(tubos_cruce_calle_anio_2019);
                            break;
                        case 'tubos_cruce_calle_anio_2020':
                            map.removeLayer(tubos_cruce_calle_anio_2020);
                            break;
                        case 'tubos_cruce_calle_anio_2021':
                            map.removeLayer(tubos_cruce_calle_anio_2021);
                            break;

                            //VEREDAS ############################################
                        case 'veredas':
                            map.removeLayer(veredas);
                            break;
                        case 'veredas_anio_2018':
                            map.removeLayer(veredas_anio_2018);
                            break;
                        case 'veredas_anio_2019':
                            map.removeLayer(veredas_anio_2019);
                            break;
                        case 'veredas_anio_2020':
                            map.removeLayer(veredas_anio_2020);
                            break;
                        case 'veredas_anio_2021':
                            map.removeLayer(veredas_anio_2021);
                            break;

                            //REPARACION CORDONES ###########################
                        case 'reparacion_cordones':
                            map.removeLayer(reparacion_cordones);
                            break;

                            //INTERVENCION PLAZAS ###########################
                        case 'intervencion_plazas':
                            map.removeLayer(intervencion_plazas);
                            break;

                            //SUMIDEROS ###########################
                        case 'rehabilitacion_sumideros':
                            map.removeLayer(rehabilitacion_sumideros);
                            break;

                        //BACHEO ########################################
                        case 'bacheo':
                            map.removeLayer(bacheo);
                            break;

                        case 'bacheo_proyectado':
                            map.removeLayer(bacheo_proyectado);
                            break;
                        case 'bacheo_finalizado':
                            map.removeLayer(bacheo_finalizado);
                            break;
                        case 'bacheo_ejecucion':
                            map.removeLayer(bacheo_ejecucion);
                            break;

                        //LEDS #######################################
                        case 'instalacion_leds':
                            map.removeLayer(instalacion_leds);
                            break;
                        case 'led_proyectado':
                            if(led_proyectado){
                                map.removeLayer(led_proyectado);
                            }
                            break;
                        case 'led_finalizado':
                            map.removeLayer(led_finalizado);
                            break;
                        case 'led_ejecucion':
                            map.removeLayer(led_ejecucion);
                            break;
                        default:
                            if(capas[data.node.id]) capas[data.node.id].remove();
                            break;
                    }
                    break;
                default:
                    break;
            }
        }).on('ready.jstree',function(e,data){
            $(this).jstree('select_node','vw_parcelas');
        });
    }

    return { init }
})(map);

export default arbolMcc;