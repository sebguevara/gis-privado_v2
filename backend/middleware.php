<?php
function isLogged(){
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario'] == '' || $_SESSION['usuario'] == null){
        header('Location: ../login.php');
    }else{
        return true;
    }
}
?>