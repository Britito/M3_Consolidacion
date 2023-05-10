/*
1.[x]Obtener Elementos del DOM- getElementbyId-inputs -botones
1.1.[x]Array dinámico -lista vacía-push
2.[x] Función constructora Gasto
3.[x]Función agregarGasto -Agregar gasto al array 
4.[x]Función balanceSaldo donde está la operación artimética
5.[x]Función que muestre la tabla
6.[]btnCalcular
9.[]Función actualizarSaldo
10.[x]Funcion mostrarSaldo
11.[x]Función eliminar con .map
*/

// 1. Obtener elementos del DOM

let inputPresupuesto = document.getElementById('inputPresupuesto');
let btnCalcular = document.getElementById('btnCalcular');
let inputNombreGasto = document.getElementById('inputNombreGasto');
let inputMontoGasto = document.getElementById('inputMontoGasto');
let btnAnadir = document.getElementById('btnAnadir');
let presupuestoTabla = document.getElementById('presupuestoTabla');
let totalGastosTabla = document.getElementById('totalGastosTabla');
let saldoTabla = document.getElementById('saldoTabla');
let bodyTabla = document.getElementById('bodyTabla');

//1.1 Variables globales
let presupuesto = 0;
let listaGastos = [];

//2.Función constructora Gasto
function Gasto(nombre, monto){
    this.nombre= nombre;
    this.monto =monto; 
}

//3. Función agregarGasto -Agregar gasto al array 
function agregarGasto(nombre, monto) {
    let gasto = new Gasto(nombre, monto);
    listaGastos.push(gasto);
    let saldo = balanceSaldo();
    if (saldo < 0) {
        listaGastos.pop();
        alert("No puedes gastar más de tu presupuesto");
    } else {
        actualizarTabla();
        mostrarGastoTabla();
    }
}

//4. Mostrar el gasto en la tabla 
function mostrarGastoTabla() {
    let gastoActualizado = listaGastos.reduce((acumulador, item) => acumulador + parseInt(item.monto), 0);
    totalGastosTabla.innerHTML = String(gastoActualizado).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g,".");
}

//5. Traer la tabla para ser actulizada con cada iteración

function actualizarTabla() {
    let html = "";
    listaGastos.forEach((gasto, index) => {
        html += `
        <tr>
            <td>${gasto.nombre}</td>
            <td>${gasto.monto}</td>
            <td style="cursor: pointer;"><i class="fa-solid fa-trash" onclick="eliminar(${index})"></i></td>
        </tr>
        `;
    });
    bodyTabla.innerHTML = html;
    balanceSaldo();
}

//6.Boton Calcular
btnCalcular.addEventListener('click', function() {
    presupuestoTabla.innerHTML= inputPresupuesto.value.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    balanceSaldo();
    /*if (parseInt(presupuestoTabla.innerHTML) > 0) {
        btnAnadir.removeAttribute('disabled');
    } else {
        btnAnadir.setAttribute('disabled', true);
    }*/
    presupuestoTabla.innerHTML> 0? btnAnadir.removeAttribute('disabled') : btnAnadir.setAttribute('disable', true);
});

//8.Función para actualizar el saldo - balanceSaldo

function balanceSaldo(){
    let presupuestoResumen = presupuestoTabla.innerHTML.replaceAll(".","");
    //let gastosResumen = totalGastos.innerHTML.replaceAll(".","");
    let gastosResumen = listaGastos.reduce((acumulador, item) => acumulador +item.monto, 0);
    let nuevoSaldo = String(presupuestoResumen - gastosResumen);
    saldoTabla.innerText = nuevoSaldo.replace(/\D/g,"").replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return nuevoSaldo;
}
//10. Boton Anadir

btnAnadir.addEventListener('click', function() {
    let nombre = inputNombreGasto.value;
    let monto = parseInt(inputMontoGasto.value);
    agregarGasto(nombre, monto);
    inputNombreGasto.value = "";
    inputMontoGasto.value = "";
});

//9. Función para eliminar gasto de la de gastoTotal

function eliminar(index) {
    listaGastos = listaGastos.filter((gasto, indice) => indice != index);
    let gastoActualizado = listaGastos.reduce((acumulador, item) => acumulador + parseInt(item.monto), 0);
    totalGastosTabla.innerHTML = String(gastoActualizado).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    actualizarTabla();
}
