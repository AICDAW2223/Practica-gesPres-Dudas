import * as gesPres from "./gestionPresupuesto.js" 

function mostrarDatoEnId(idElemento, valor){

    return document.getElementById(idElemento).innerText=valor;
}

function mostrarGastoWeb(idElemento, gasto){

    let fechaGasto= new Date(gasto.fecha);
    fechaGasto.toLocaleString();

    let contenedor =document.getElementById(idElemento)

    let divGasto = document.createElement("div");
    divGasto.className="gasto";
    contenedor.append(divGasto);

    let descripcion= document.createElement("div");
    descripcion.className="gasto-descripcion"
    descripcion.textContent= gasto.descripcion;
    divGasto.append(descripcion);

    let divFecha = document.createElement("div");
    divFecha.className="gasto-fecha";
    divFecha.textContent=fechaGasto;
    divGasto.append(divFecha)

    let valor = document.createElement("div");
    valor.className="gasto-valor";
    valor.textContent=gasto.valor;
    divGasto.append(valor)

    let etiquetas= document.createElement("div")
    etiquetas.className="gasto-etiquetas";
    divGasto.append(etiquetas);
    if(gasto.etiquetas)
    {

    for (let i=0;i<gasto.etiquetas.length;i++)
    {
        let etiqueta =document.createElement("span");
        etiqueta.className="gasto-etiquetas-etiqueta";
        etiqueta.innerHTML=gasto.etiquetas[i];

        let etiquetaN= Object.create(borrarEtiquetasHandle);
        etiquetaN.gasto=gasto
        etiquetaN.etiqueta= gasto.etiquetas[i]
        etiqueta.addEventListener("click", etiquetaN)

        etiquetas.append(etiqueta);
    }
    }
    else{
        let etiqueta =document.createElement("span");
        etiqueta.className="gasto-etiquetas-etiqueta";
        etiqueta.innerHTML=gasto.etiquetas;

        let etiquetaN= Object.create(borrarEtiquetasHandle);
        etiquetaN.gasto=gasto
        etiquetaN.etiquetas= gasto.etiquetas
        etiqueta.addEventListener("click", etiquetaN)
        etiquetas.append(etiqueta);
    }

    let botonEditar = document.createElement("button");
    botonEditar.setAttribute("type", "button");
    botonEditar.className="gasto-editar"
    botonEditar.textContent="Editar"

    let botonEdit = Object.create(EditarHandle)
    botonEdit.gasto=gasto;

    botonEditar.addEventListener("click", botonEdit);
    divGasto.append(botonEditar)


    let botonBorrar= document.createElement("button");
    botonBorrar.setAttribute("type", "button");
    botonBorrar.className= "gasto-borrar";
    botonBorrar.textContent="Borrar";

    let botonBrr= Object.create(borrarHandle);
    botonBrr.gasto=gasto;

    botonBorrar.addEventListener("click",botonBrr);
    divGasto.append(botonBorrar);

    let botonEditForm = document.createElement("button");
    botonEditForm.setAttribute("type", "button");
    botonEditForm.className="gasto-editar-formulario";
    botonEditForm.textContent="Editar (formulario)"
    
    let botonEditForm1 = new EditarHandleFormulario();
    botonEditForm1.gasto=gasto;

    botonEditForm.addEventListener("click", botonEditForm1);
    divGasto.append(botonEditForm);




    let botonBorradoApi = document.createElement("button");
    botonBorradoApi.setAttribute("type","button")
    botonBorradoApi.className="gasto-borrar-api";
    botonBorradoApi.textContent="Borrar (API)"

    let botonBorrarApi= Object.create(borrarApiHandle)
    botonBorrarApi.gasto= gasto;
    botonBorradoApi.addEventListener("click", botonBorrarApi)

    divGasto.append(botonBorradoApi)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let contenedor = document.getElementById(idElemento);
    contenedor.innerHTML = "";

    let divAgrup =document.createElement("div");
    divAgrup.className="agrupacion";
    contenedor.append(divAgrup);

    let h1 =document.createElement("h1");
    
    h1.innerHTML="Gastos agrupados por "+periodo;
    divAgrup.append(h1);
    
    

   

    for (let value of Object.entries(agrup)) {
        

        let agrupDato = document.createElement("div");
        agrupDato.className= "agrupacion-dato";
        divAgrup.append(agrupDato)
        for (let k=0;k<value.length;k++)
        {
            if (k==0){
                let agrupDatoNombre = document.createElement("span")
                agrupDatoNombre.className="agrupacion-dato-clave";
                agrupDatoNombre.innerHTML=value[k]+" ";
                agrupDato.append(agrupDatoNombre);
            }
            else if(k==1){
                let agrupDatoValor = document.createElement("span")
                agrupDatoValor.className="agrupacion-dato-valor";
                agrupDatoValor.innerHTML=" : "+value[k];;
                agrupDato.append(agrupDatoValor);
            }
        }
      }
}

function repintar(){
    

    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML="";

    for (let i = 0; i< gesPres.listarGastos().length;i++){
        mostrarGastoWeb("listado-gastos-completo", gesPres.listarGastos()[i])
    }
}

function actualizarPresupuestoWeb(){

    let presupuesto = prompt("Introduzca el presupuesto")
    parseInt(presupuesto)
    gesPres.actualizarPresupuesto(presupuesto)
    repintar();
    
}


function nuevoGastoWeb(){

    let descripcion= prompt("Introduzca la descripción del gasto");

    let valorPreguntar = prompt("Introduzca el valor del gasto");
    let valor=parseFloat(valorPreguntar);

    let preguntarFecha = prompt("Introduzca la fecha del gasto (dia/mes/año)");
   let fecha =new Date(preguntarFecha);
   let dia= fecha.getDate();
   let mes= fecha.getMonth();
   let anyo= fecha.getFullYear();
   let fechaCompleta =`${dia + " "+ (mes +1 )+ " "+ anyo}`;

    let etiquetasJuntas= prompt("Introduzca las etiquetas del gasto (etiqueta1,etiqueta2,etiqueta3)");
    let etiquetas = etiquetasJuntas.split (',');

   let gasto=new gesPres.CrearGasto(descripcion, valor, fechaCompleta, ...etiquetas);

    gesPres.anyadirGasto(gasto)

    repintar()
}
let botonNuevoGasto= document.getElementById("anyadirgasto");
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

let EditarHandle={
    handleEvent: function(evento){


        let descripcion= prompt("Introduzca la descripción del gasto", this.gasto.descripcion);

        let valorPreguntar = prompt("Introduzca el valor del gasto", this.gasto.valor);
        let valor= parseFloat(valorPreguntar);

        let fechaParam = new Date(this.gasto.fecha)
    let dia1= fechaParam.getDate();
    let mes1= fechaParam.getMonth();
    let anyo1= fechaParam.getFullYear();
    let fechaCompletaParam =`${dia1 + " "+ (mes1 +1 )+ " "+ anyo1}`

        let preguntarFecha = prompt("Introduzca la fecha del gasto (dia/mes/año)", fechaCompletaParam);
        let fecha= new Date(preguntarFecha);
        let dia= fecha.getDate();
        let mes= fecha.getMonth();
        let año = fecha.getFullYear();
        let fechaCompleta = `${dia + " "+ (mes +1 )+ " "+ año}`

        let etiquetasPreguntar = prompt("Introduzca las etiquetas del gasto (etiqueta1,etiqueta2,etiqueta3)", this.gasto.etiquetas);
       let etiquetas=etiquetasPreguntar.split(',')

        this.gasto.actualizarDescripcion(descripcion)
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fechaCompleta)
        this.gasto.etiquetas= [];
        this.gasto.anyadirEtiquetas(...etiquetas);
        repintar();

    }
}
let borrarHandle={
    handleEvent:function(event){
        gesPres.borrarGasto(this.gasto.id)
        repintar();
    }
}
let borrarEtiquetasHandle={
    handleEvent:function(event){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar();
    }
}
function  EditarHandleFormulario(){
    this.handleEvent=function(event){
        event.target.disabled=true;
        event.preventDefault();
        
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);;
    var formulario = plantillaFormulario.querySelector("form");

    formulario.elements.descripcion.value=this.gasto.descripcion;
    formulario.elements.valor.value=this.gasto.valor;
    formulario.elements.fecha.value=new Date(this.gasto.fecha);
    formulario.elements.etiquetas.value=this.gasto.etiquetas;

    event.target.parentElement.append(plantillaFormulario)


    let manejadorEnviar= new editarEnviarFormHandle()
    manejadorEnviar.gasto=this.gasto;
    formulario.addEventListener("submit", manejadorEnviar);

    let botonCancelar = formulario.querySelector(".cancelar");
    let manejadorCerrar1 = new cerrarGastoEnviarForm()
    manejadorCerrar1.botonEditarFormulario=event.target;
    botonCancelar.addEventListener("click", manejadorCerrar1);
    }
}
function cerrarGastoEnviarForm(){
    this.handleEvent=function(event){
         
    event.target.form.remove()
    this.botonEditarFormulario.disabled=false;
}
}
function editarEnviarFormHandle(){
   this.handleEvent=function(event){
    event.preventDefault();
    let descripcionGastoForm =event.target.elements.descripcion.value
    let valorGasto=event.target.elements.valor.value
    let valorGastoForm=parseFloat(valorGasto)
    let fechaGastoForm=event.target.elements.fecha.value
    
    let etiquetasGastoForm= event.target.elements.etiquetas.value

    let etiquetasArrForm= etiquetasGastoForm.split(',');

    this.gasto.actualizarDescripcion(descripcionGastoForm);
    this.gasto.actualizarValor(valorGastoForm);
    this.gasto.actualizarFecha(fechaGastoForm);
    this.gasto.etiquetas = [];
    this.gasto.anyadirEtiquetas(...etiquetasArrForm);
    repintar()
    }
}
function nuevoGastoWebFormulario(event){
    event.target.disabled=true;
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form")

    let controlesPrincipales = document.getElementById("controlesprincipales")
    controlesPrincipales.append(plantillaFormulario)
    
    formulario.addEventListener("submit", manejadorSubmit)

    let botonCancelar = formulario.querySelector(".cancelar")
    botonCancelar.addEventListener("click", manejadorCancelar)

    let botonEnviarApi= formulario.querySelector(".gasto-enviar-api")
    botonEnviarApi.addEventListener("click", enviarGastoApiWeb )
  

    let contenedor = document.getElementById("controlesprincipales")
    contenedor.append(plantillaFormulario);

}
function enviarGastoApiWeb(event){
event.preventDefault();

let descripcion1=document.getElementById("descripcion").value;
let valor1=document.getElementById("valor").value;
let fecha1=document.getElementById("fecha");
let etiquetas1=document.getElementById("etiquetas").value;

let arrayEtq= etiquetas1.split(`,`)

let gastoEnviar={
    
    descripcion:descripcion1,
    valor:valor1,
    fecha:fecha1,
    etiquetas:arrayEtq
}
}
function manejadorSubmit(event){
    event.preventDefault()

    let form= event.currentTarget ;
    let descripcion= form.elements.descripcion.value;
    let valor1 = form.elements.valor.value;
    let valor =parseFloat(valor1)
    let fecha = form.elements.fecha.value
    let etiquetas = form.elements.etiquetas.value;

    let etiquetasArrForm= etiquetas.split(',');

    let gastoForm = new gesPres.CrearGasto(descripcion,valor,fecha,...etiquetasArrForm)

    gesPres.anyadirGasto(gastoForm);
    repintar();
    event.target.remove();
    document.getElementById("anyadirgasto-formulario").disabled=false;
}
function manejadorCancelar(event){
   
         
        event.target.form.remove()
        document.getElementById("anyadirgasto-formulario").disabled=false;
    
}
let borrarApiHandle={
    handleEvent:function(event){
        event.preventDefault()
        let name= document.getElementById("nombre_usuario").value
        let url=`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${name}/${this.gasto.gastoId}`
        console.log(url+" url")
        fetch(url,{
            method:`DELETE`
        })
        .then(function(respuesta){
            if(respuesta.ok){

              console.log("Borrado con exito")


            }
            else{
                thow("Ha habido un error")
            }
        })
        cargarGastosApi();
    }
}
function cargarGastosApi(){

    let input= document.getElementById("nombre_usuario").value
    
     fetch(`https://suhhtqjccd.execute-api.eu-west-1.amazonaws.com/latest/${input}`)
    .then(function (respuesta){
        if (respuesta.ok){

            return respuesta.json()
        }
        else{
            throw("Ha habido un error")
        }
    })
    .then(function (data){
        gesPres.cargarGastos(data);
    })
    
    repintar()

}

let botonActualizar= document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click",actualizarPresupuestoWeb)

let botonAnyadirGasto= document.getElementById("anyadirgasto")
botonAnyadirGasto.addEventListener("click",nuevoGastoWeb);

let botonAnyadirGastoFormulario= document.getElementById("anyadirgasto-formulario")
       botonAnyadirGastoFormulario.addEventListener("click", nuevoGastoWebFormulario)

let botonCargarApi = document.getElementById("cargar-gastos-api")
botonCargarApi.addEventListener("click", cargarGastosApi)
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}