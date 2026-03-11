<?php

$conexion = new PDO('pgsql:host=192.168.10.51;port=5432;dbname=gis', 'appGis', '5T9DVqKEwQ');
$conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
