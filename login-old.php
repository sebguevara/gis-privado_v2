<?php
session_name('privado_v2');
session_start();

if (isset($_SESSION['usuario'])) header('Location: index.php');

?>

<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privado v2 | Login</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  <style>
    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    #logincontainer {
      opacity: 0;
      width: 30%;
    }

    @media (max-width: 576px) {
      #logincontainer {
        width: 100vw;
      }

      .display-1 {
        font-size: 3rem !important;
      }
    }
  </style>
</head>

<body>
  <h1 id="title" class="display-1 text-center mb-5 animate__animated animate__fadeInUp animate__faster" style="color: #21252947;font-weight: 700 !important;">PRIVADO</h1>
  <div class="shadow-lg" id="logincontainer">
    <div class="card p-3">
      <div class="card-body">
        <form action="backend/api.php?action=login" method="post">
          <div class="form-group">
            <label for="usuario">Usuario</label>
            <input 
              type="text" 
              class="form-control  <?= isset($_SESSION['message']) && $_SESSION['message'] == 1 ? 'is-invalid' : '' ?> " 
              id="usuario" 
              name="usuario" 
              required 
              autofocus 
              autocomplete="off"
            >
            <?php if (isset($_SESSION['message']) && $_SESSION['message'] == 1) : ?>
              <div class="invalid-feedback d-block">
                El usuario ingresado no existe.
              </div>
            <?php endif; ?>

          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              type="password" 
              class="form-control <?= isset($_SESSION['message']) && $_SESSION['message'] == 2 ? 'is-invalid' : '' ?>" 
              id="password" 
              name="password" 
              required
            >
            <?php if (isset($_SESSION['message']) && $_SESSION['message'] == 2) : ?>
              <div class="invalid-feedback d-block">
                Contraseña invalida.
              </div>
            <?php endif; ?>
          </div>
          <button type="submit" class="btn btn-primary">Ingresar</button>
        </form>
      </div>
    </div>
  </div>
  <script>
    document.getElementById('title').addEventListener('animationend', () => {
      document.getElementById('logincontainer').classList.add('animate__animated', 'animate__fadeIn', 'animate__faster')
    });
  </script>
</body>

</html>

<?php unset($_SESSION['message']) ?>