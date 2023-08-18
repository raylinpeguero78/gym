// Obtén una referencia al botón de envío
const enviarBtn = document.getElementById("Enviar");

// Agrega un evento de clic al botón de envío
enviarBtn.addEventListener("click", function(event) {
  event.preventDefault(); // Previene la recarga de la página

  // Verifica si los campos obligatorios están llenos
  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("apellido").value;
  const telefono = document.getElementById("tel").value;
  const email = document.getElementById("email").value;

  if (nombre === "" || apellido === "" || telefono === "" || email === "") {
    // Mostrar una alerta indicando campos obligatorios incompletos
    swal({
      title: "Error",
      text: "Por favor, completa todos los campos obligatorios",
      icon: "error",
      button: "Aceptar"
    });
    return; // Detener el flujo si hay campos incompletos
  }

  // Realiza una solicitud asíncrona usando Fetch
  fetch("hey.php", {
    method: "POST",
    body: new FormData(document.getElementById("myForm")) // Envía los datos del formulario
  })
    .then(response => response.text()) // Lee la respuesta del servidor
    .then(data => {
      // Muestra una alerta de SweetAlert con el ícono de éxito
      swal({
        title: "Maldita sea",
        text: "Datos enviados exitosamente",
        icon: "success", // Ícono de éxito
        button: "Aceptar"
      }).then(() => {
        // Restablecer los valores de los campos del formulario
        document.getElementById("name").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("tel").value = "";
        document.getElementById("email").value = "";
        document.getElementById("tiempo-meses").value = "";
        document.getElementById("Dinero").value = "";
        document.getElementById("Libras").value = "";
        document.getElementById("Semanas").value = "";

        // También puedes agregar otras acciones o lógica aquí
      });
    })
    .catch(error => {
      // Muestra una alerta de SweetAlert con el ícono de error
      swal({
        title: "Error",
        text: "Hubo un error al enviar los datos",
        icon: "error", // Ícono de error
        button: "Aceptar"
      }).then(() => {
        // Restablecer los valores de los campos del formulario
        document.getElementById("name").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("tel").value = "";
        document.getElementById("email").value = "";
        document.getElementById("tiempo-meses").value = "";
        document.getElementById("Dinero").value = "";
        document.getElementById("Libras").value = "";
        document.getElementById("Semanas").value = "";
      });
    });
});
