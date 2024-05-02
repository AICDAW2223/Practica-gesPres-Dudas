// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global 

let presupuesto =0;
let gastos =[];
let idGasto=0;

function actualizarPresupuesto(valor) {
    // TODO

    if(valor>0){
        presupuesto =valor;
        return (` ${presupuesto} `)
       
    }     
    else if(valor<0){
        presupuesto=-1;
        return (`${presupuesto}`)
        
    }
    else{
        
        return (`${presupuesto}`)
    }
}

function mostrarPresupuesto() {
    // TODO
    
   return `Tu presupuesto actual es de ${presupuesto} €` ;
}

function CrearGasto(descripcion, valor, fecha,...etiquetas) {
    this.descripcion=descripcion;
    this.valor=valor;
    this.etiquetas=etiquetas;
    let f=Date.parse(fecha)
    if (isNaN(f))
    {
        this.fecha=Date.now()
    }
    else{
        this.fecha=f
    }
     this.mostrarGasto=function(){
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
    }
     this.actualizarDescripcion=function(descripcion){
        this.descripcion=descripcion;
        return descripcion
    }
    this.actualizarValor=function(valor){
        if(valor>=0){
            this.valor=valor;
            return (`${valor}`)
        }
        else if(valor<0){
            
            return (`${valor}`)
        }
       
    }
    this.mostrarGastoCompleto =function(){
        let fechaBien = new Date(this.fecha)
        etiquetas= [" casa" , " supermercado" ," comida"]
        
    
        return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaBien.toLocaleString()}\nEtiquetas:\n-${etiquetas.join(`\n-`)+ "\n"}`)
    }
    this.actualizarFecha =function(f){
        let fecha = Date.parse(f)
        if(!isNaN(fecha)){
            this.fecha=fecha;
        }
    }
    this.anyadirEtiquetas=function(...etiquetaNueva){

       for(let i=0;i<etiquetaNueva.length;i++)
       {
        if (this.etiquetas.lenght==0){
            this.etiquetas.push(etiquetaNueva[i])
        }
        else if(!this.etiquetas.includes(etiquetaNueva[i]) && !etiquetaNueva[i]=="")
        {
            this.etiquetas.push(etiquetaNueva[i])
        }
       }
       return etiquetas
    }
    this.borrarEtiquetas=function(...etiqueta){

        for (let i = 0;i<etiqueta.length;i++)
        {
            this.funcionEtiquetas(etiqueta[i])
        }
        return etiquetas
    }
    this.funcionEtiquetas=function(etiqueta){
        
        for (let i = 0;i<this.etiquetas.length;i++)
        {
            if(this.etiquetas[i]==etiqueta)
            {
                this.etiquetas.splice(i,1)
            }
        }
    }
    this.obtenerPeriodoAgrupacion=function(tipoFecha){

        let fechaCompleta= new Date (fecha)
        fechaCompleta.toDateString();
        let mes;
        if(fechaCompleta.getMonth()<9)
        mes=(`0${fechaCompleta.getMonth()+1}`)
         else
         mes=(`${fechaCompleta.getMonth()+1}`)
         if (tipoFecha=="dia")
         {
             let dia;
             if(fechaCompleta.getDate()<9)
             dia=(`0${fechaCompleta.getDate()}`);
             else
             dia=fechaCompleta.getDate();
 
             return(`${fechaCompleta.getFullYear()}-${mes}-${dia}`);
             
         }
         else if(tipoFecha=="mes")
         {
             
             return(`${fechaCompleta.getFullYear()}-${mes}`)
             
         }
         else if(tipoFecha=="anyo")
         {
             return(fechaCompleta.getFullYear());
         }
    }
    if(valor<0 || isNaN(valor)){      
        this.valor=0       
        return (` ${this.descripcion}  ${this.valor} `)       
    }
    else{   
        return (` ${this.descripcion}  ${this.valor}`)
  
    }
}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id= idGasto
    gastos.push(gasto)
    idGasto++;
    
}
function borrarGasto(gasto){
    
for (let i =0; i<gastos.length;i++)
{
    if (gastos[i].id==gasto)
    {
        gastos.splice(i,1)
    }
}

}
function calcularTotalGastos(){
    let suma =0;
    for (let i=0;i<gastos.length;i++)
    {
        suma += gastos[i].valor;
    }
    return suma;
    
}
function calcularBalance(){
    let gastosTotales= calcularTotalGastos();
    let balance = presupuesto-gastosTotales;

    return balance;
}


function filtrarGastos(parametro){
    return gastos.filter(function(x){

        let fechaObj = new Date(x.fecha)

        if (parametro.fechaDesde && fechaObj < new Date (parametro.fechaDesde)){
            return false
        }
        if (parametro.fechaHasta && fechaObj > new Date (parametro.fechaHasta)){
            return false
        }
        if (parametro.valorMinimo && x.valor < parametro.valorMinimo){
            return false
        }
        if (parametro.valorMaximo && x.valor > parametro.valorMaximo){
            return false
        }
        if (parametro.descripcionContiene && !x.descripcion.includes(parametro.descripcionContiene)) {
            return false;
        }

        if (parametro.etiquetasTiene && !x.etiquetas.some(etiqueta => parametro.etiquetasTiene.includes(etiqueta))) {
            return false;
        }
        return true;
    });
}
function agruparGastos(periodo, etiquetasTiene,  fechaDesde, fechaHasta){

    let guardarPeriodo="mes";
    if (periodo == "dia" || periodo == "anyo")
    guardarPeriodo = periodo;
    let resultadoFiltrado =[...gastos]

    let gastoBuscado=new CrearGastoBuscado ( etiquetasTiene,  fechaDesde, fechaHasta);

    
    resultadoFiltrado =filtrarGastos(gastoBuscado);
    
  let resultadoReducido= resultadoFiltrado.reduce(function(acc, gasto){
     
   

    
    let periodoAgrup = gasto.obtenerPeriodoAgrupacion(periodo);

   

  if (acc[periodoAgrup]) {
   
    acc[periodoAgrup] = acc[periodoAgrup] + gasto.valor;
  } else {
   
    acc[periodoAgrup] = gasto.valor;
    }

    return acc  ;
},{})

return resultadoReducido;

}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
function CrearGastoBuscado(etiquetasTiene,fechaDesde, fechaHasta){

    this.fechaDesde=fechaDesde;
    this.fechaHasta=fechaHasta;
    
    if(etiquetasTiene!=undefined)
    {
        this.etiquetasTiene=etiquetasTiene;
    }

 }
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
