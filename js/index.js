//declaro variables
let nombre = localStorage.getItem("nombre");
let nombreTextoHtml = document.getElementById("txtmarcoAlto");
let contrasenia
let transacciones = [];
let botonEnviarDinero = document.getElementById("enviarDinero");
let intentos = 6;
//informacion del dolar
  fetch("https://dolarapi.com/v1/dolares/oficial")
  .then(response => response.json())
  .then(data => console.log(data));

//se recopila toda la información y se coloca en el cuadro de "Tu Ultima Actividad"
      function registrarTransaccion(tipoTransaccion, nombreTransaccion, cantidadTransaccion) {
        let detalleActividad = document.getElementById("detalleActividad");
        transacciones.push(({
          nombre: nombre,
          contrasenia: contrasenia,
          saldo: saldo,
          destinatario: nombreTransaccion,
          cantidad: cantidadTransaccion,
          tipoTransaccion: tipoTransaccion,
        }));
        let informacionTransaccion = `
        <div class="tarjeta-transaccion">
          Nombre del transferido: ${nombreTransaccion}<br>
          Cantidad: $${cantidadTransaccion}<br>
          Tipo de Transacción: ${tipoTransaccion}<br>
          Fecha: ${new Date().toLocaleString()}
        </div>`;
        detalleActividad.innerHTML += informacionTransaccion;
      };

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

      function inicializarSaldo(){}
      let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
      if (!saldo) {
        saldo = 80000;
        localStorage.setItem("saldo", JSON.stringify(saldo));
      }
      
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
            let fechaActual = new Date().toLocaleString();
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
      recibirDinero.onclick = function () {
       recibirDinero = document.getElementById("recibirDinero");
        let recibirNombre = prompt("Nombre de la cuenta a extraer el dinero");
        let recibirCantidad = parseInt(prompt("Cantidad a recibir"));
        if (recibirNombre !== "" && recibirCantidad > 0 && validarContrasenia(recibirNombre, recibirCantidad)) {
          saldo = saldo + recibirCantidad;
          saldoTexto.textContent = `$${saldo}`;
          localStorage.setItem("saldo", JSON.stringify(saldo));
          let fechaActual = new Date().toLocaleString();
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