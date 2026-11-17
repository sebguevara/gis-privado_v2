<?php
function isLogged(){
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario'] == '' || $_SESSION['usuario'] == null){
        header('Location: ../login.php');
        exit; // sin esto el endpoint seguía y devolvía los datos sin sesión
    }else{
        return true;
    }
}
?>