let nombre = localStorage.getItem("nombre");
if (nombre) {
  let nombreTextoHtml = document.getElementById("txtmarcoAlto");
  nombreTextoHtml.textContent = `¡¡Bienvenido, ${nombre}!!`;
} else {
  nombre = prompt("Ingrese su Nombre Aqui:");
  localStorage.setItem("nombre", JSON.stringify(nombre));
  let nombreTextoHtml = document.getElementById("txtmarcoAlto");
  nombreTextoHtml.textContent = `¡¡Bienvenido, ${nombre}!!`;
}
let contrasenia = JSON.parse(localStorage.getItem("contrasenia"));
if (contrasenia) {} 
else {
 contrasenia = prompt("Cual desea que sea su contraseña?:");
 localStorage.setItem("contrasenia", JSON.stringify(contrasenia));
}
let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
if(saldo){}
else{
 saldo = 80000;
 localStorage.setItem("saldo", JSON.stringify(saldo));
}
 let saldoTexto = document.getElementById("txtCuadroPrincipal");
if (saldoTexto) {
  saldoTexto.textContent = `$${saldo}`;
}
let transacciones = [];
let botonEnviarDinero = document.getElementById("enviarDinero");
botonEnviarDinero.onclick = function () {
  const transferencia = prompt("A quien le deseas Transferir?:");
  let cantidad = parseInt(prompt("Cuanto deseas Enviar?:"));

  if (cantidad <= saldo) {
    if (validarProceso(transferencia, cantidad)) {

      fechaActual = new Date().toLocaleString();
       let informacionTransferirDinero = `Nombre del transferido: ${nombre}<br>
                                Cantidad: $${cantidad}<br>
                                Fecha: ${fechaActual}`;
      document.getElementById("detalleActividad").innerHTML = informacionTransferirDinero
      saldo = saldo - cantidad;
      localStorage.setItem("saldo", JSON.stringify(saldo));
      saldoTexto.textContent = `$${saldo}`;
      console.log(transacciones);
      alert("Transferencia Exitosa");
      console.log("Transferencia Exitosa");
      let horaExacta = "la transferencia fue realizada el " + new Date();
      console.log(horaExacta);
    } else {
      alert("Transferencia Rechazada");
      console.log("Transferencia Rechazada");
    }
  } else {
    alert("No Posee el dinero suficiente");
  }
};
let intentos = 6;
function validarProceso(transferencia, cantidad) {
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

let recibirDinero = document.getElementById("recibirDinero");
recibirDinero.onclick = function () {
    let recibirNombre = prompt("Nombre de la cuenta a extraer el dinero");
    let recibirCantidad = parseInt(prompt("Cantidad a recibir"));
    if (recibirNombre !== "" && recibirCantidad > 0) {
      saldo = saldo + recibirCantidad;
      saldoTexto.textContent = `$${saldo}`;
      localStorage.setItem("saldo", JSON.stringify(saldo));
       fechaActual = new Date().toLocaleString();
       let informacionRecibirDinero = `
       <div>
       Nombre del extraido: ${recibirNombre}<br>
                                       Cantidad: $${recibirCantidad}<br>
                                       Fecha: ${fechaActual}
       </div>
       <div>
         Nombre del extraido: ${recibirNombre}<br>
                                         Cantidad: $${recibirCantidad}<br>
                                         Fecha: ${fechaActual}
         </div>`
      document.getElementById("detalleActividad").innerHTML = informacionRecibirDinero
      alert("¡¡Extracción exitosa!!");
  } else {
      alert("Por favor, ingrese los valores solicitados");
    }}

