// Declaración de variables
let nombre = localStorage.getItem("nombre");
let nombreTextoHtml = document.getElementById("txtmarcoAlto");
let contrasenia;
let transacciones = JSON.parse(localStorage.getItem("historialTransferencias")) || [];
let botonEnviarDinero = document.getElementById("enviarDinero");
let botonRecibirDinero = document.getElementById("botonRecibirDinero");
let intentos = 6;
let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
let detalleActividad = document.getElementById("detalleActividad");

// Mostrar historial inicial si es que existe
transacciones.forEach((transaccion) => {
  detalleActividad.innerHTML += generarTarjetaHTML(transaccion);
});

// Función para registrar una transacción
function registrarTransaccion(tipoTransaccion, nombreTransaccion, cantidadTransaccion) {
  const nuevaTransaccion = {
    destinatario: nombreTransaccion,
    cantidad: cantidadTransaccion,
    tipoTransaccion: tipoTransaccion,
    fecha: new Date().toLocaleString(),
  };

  // Guardar la transacción en el historial
  transacciones.push(nuevaTransaccion);
  localStorage.setItem("historialTransferencias", JSON.stringify(transacciones));

  // Mostrar la transacción en la interfaz
  detalleActividad.innerHTML += generarTarjetaHTML(nuevaTransaccion);
}

// Función para generar el HTML de una tarjeta de transacción
function generarTarjetaHTML(transaccion) {
  return `
    <div class="tarjeta-transaccion">
      Nombre del transferido: ${transaccion.destinatario}<br>
      Cantidad: $${transaccion.cantidad}<br>
      Tipo de Transacción: ${transaccion.tipoTransaccion}<br>
      Fecha: ${transaccion.fecha}
    </div>`;
}

      //Almaceno información en el LocalStorage y texto visual
      function mostrarMensajeBienvenida(){
      if (nombre) {
        nombreTextoHtml.textContent = `¡¡Bienvenido, ${nombre}!!`;
      } else {
        nombre = prompt("Ingrese su Nombre Aqui:");
        localStorage.setItem("nombre", JSON.stringify(nombre));
        nombreTextoHtml.textContent = `¡¡Bienvenido, ${nombre}!!`;
      }}
      
      function almacenarContrasenia(){
      contrasenia = JSON.parse(localStorage.getItem("contrasenia"));
      if (!contrasenia) {
        contrasenia = prompt("Cual desea que sea su contraseña?:");
        localStorage.setItem("contrasenia", JSON.stringify(contrasenia));
      }}

      function inicializarSaldo(){
      if (!saldo) {
        localStorage.setItem("saldo", JSON.stringify(saldo));
      }}
      
      let saldoTexto = document.getElementById("txtCuadroPrincipal");
      if (saldoTexto) {
        saldoTexto.textContent = `$${saldo}`;
      }

      //Función para Enviar Dinero
      botonEnviarDinero.onclick = function () {
        const transferencia = prompt("A quien le deseas Transferir?:");
        let cantidad = parseInt(prompt("Cuanto deseas Enviar?:"));
      
        if (cantidad <= saldo) {
          if (validarContrasenia(transferencia, cantidad)) {
            saldo = saldo - cantidad;
            localStorage.setItem("saldo", JSON.stringify(saldo));
            saldoTexto.textContent = `$${saldo}`;
            registrarTransaccion("Egreso", transferencia, cantidad);
            console.log(transacciones);
            alert("Transferencia Exitosa");
            console.log("Transferencia Exitosa");
          } else {
            alert("Transferencia Rechazada");
            console.log("Transferencia Rechazada");
          }
        } else {
          alert("No Posee el dinero suficiente");
        }
      };
      
      //función para verificar en caso que la contraseña sea Correcta o Incorrecta
      function validarContrasenia(transferencia, cantidad) {
        while (intentos > 1) {
          let contraseniaIngresada = prompt("Ingrese su contraseña:");
          if (contraseniaIngresada === contrasenia) {
            alert(
              "En caso que los siguientes datos sean correctos, escribe 'aceptar', de lo contrario escribe 'rechazar'."
            );
            const verificacion_de_datos = prompt(
              "Transferir a: " + transferencia + " " + "Cantidad: " + cantidad
            );
            return verificacion_de_datos === "aceptar";
          } else {
            intentos--;
            alert("contraseña Incorrecta. Te quedan: " + intentos + " intentos.");
          }
        }
        alert("Superaste el limite de Intentos");
        intentos = 6;
        return false;
      }

      //función para recibir Dinero
      botonRecibirDinero.onclick = function () {
       botonRecibirDinero = document.getElementById("botonRecibirDinero");
        let recibirNombre = prompt("Nombre de la cuenta a extraer el dinero");
        let recibirCantidad = parseInt(prompt("Cantidad a recibir"));
        if (recibirNombre !== "" && recibirCantidad > 0 && validarContrasenia(recibirNombre, recibirCantidad)) {
          saldo = saldo + recibirCantidad;
          saldoTexto.textContent = `$${saldo}`;
          localStorage.setItem("saldo", JSON.stringify(saldo));
          registrarTransaccion("Ingreso", recibirNombre, recibirCantidad);
          alert("¡¡Extracción exitosa!!");
        } else {
          alert("Por favor, ingrese los valores solicitados");
        }
      };
      //invoco a las funciones
      mostrarMensajeBienvenida()
      almacenarContrasenia()
      inicializarSaldo()