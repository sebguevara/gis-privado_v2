async function checkss(){
  const response = await fetch('backend/checkss.php');
  const data = await response.text()
  if(data === "false"){
      if(location.host == "gis.ciudaddecorrientes.gov.ar"){
          location.href = location.origin;
      }else{
          location.href = location.origin + "/privado_v2/login.php"
      }
  }
}

setInterval(() => { checkss() }, 20000)