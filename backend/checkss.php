<?php
session_name('privado_v2');
session_start();
$status = "true";

if (!isset($_SESSION['usuario'])) {
  $status = "false";
}

echo $status;
?>