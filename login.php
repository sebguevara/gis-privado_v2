<?php
session_name('privado_v2');
session_start();

if (isset($_SESSION['usuario'])) header('Location: index.php');

//<?= isset($_SESSION['message']) && $_SESSION['message'] == 1 ? 'is-invalid' : '' 

$invalidUser = false;
$invalidPass = false;

if(isset($_SESSION['message']) && $_SESSION['message'] == 1){
  $invalidUser = true;
}

if(isset($_SESSION['message']) && $_SESSION['message'] == 2){
  $invalidPass = true;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LOGIN</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: #32323214;
      min-height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Poppins', sans-serif;
    }

    .title {
      letter-spacing: 12px;
    }

    label {
      letter-spacing: 3px;
      font-weight: 600;
    }

    .login-key {
      height: 100px;
      font-size: 80px;
      line-height: 100px;
      background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>

<body>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <div class="card shadow">
          <div class="card-body">
            <div class="row">
              <div class="col-12 text-center mb-4">
                <div class="login-key">
                  <i class="fas fa-user-shield display-1"></i>
                </div>

                <h1 class="title">PRIVADO</h1>
              </div>
              <div class="col-12">
                <form action="backend/api.php?action=login" method="post">
                  <div class="row">
                    <div class="col-12 mb-2">
                      <label for="usuario" class="text-uppercase">Usuario</label>
                      <input 
                        id="usuario" 
                        name="usuario" 
                        type="text" 
                        class="form-control <?= $invalidUser ? 'is-invalid' : '' ?>" 
                        required 
                        autofocus 
                        autocomplete="off"
                      >
                      <?php if ($invalidUser) : ?>
                        <div class="invalid-feedback d-block">
                          El usuario ingresado no existe.
                        </div>
                      <?php endif; ?>
                    </div>
                    <div class="col-12 mb-3">
                      <label for="password" class="text-uppercase">Contraseña</label>
                      <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        class="form-control <?= $invalidPass ? 'is-invalid' : '' ?>" 
                        required
                      >
                      <?php if ($invalidPass) : ?>
                        <div class="invalid-feedback d-block">
                          Contraseña invalida.
                        </div>
                      <?php endif; ?>
                    </div>
                    <div class="col-12 text-right">
                      <button class="btn btn-dark">Ingresar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  <script>
    let width = window.innerWidth;
    if(width < 396){
      document.querySelector('.title').style.fontSize = "2.0rem"
    }else if(width < 480){
      document.querySelector('.title').classList.add('display-4')
    }else{
      document.querySelector('.title').classList.add('display-3')
    }    
  </script>
</body>

</html>

<?php unset($_SESSION['message']) ?>