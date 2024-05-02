import * as gesPres from "./gestionPresupuesto.js"
import * as gesPresWeb from "./gestionPresupuestoWeb.js"

gesPres.actualizarPresupuesto(1500);
gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto())


let gasto1 =new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2 =new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3 =new gesPres.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let gasto4 =new gesPres.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 =new gesPres.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6 =new gesPres.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

gesPres.anyadirGasto(gasto1)
gesPres.anyadirGasto(gasto2)
gesPres.anyadirGasto(gasto3)
gesPres.anyadirGasto(gasto4)
gesPres.anyadirGasto(gasto5)
gesPres.anyadirGasto(gasto6)

gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

for(let i =0;i<gesPres.listarGastos().length;i++)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", gesPres.listarGastos()[i])
}

let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde:"2021-09-01", fechaHasta:"2021-09-31"});

for (let i=0;i<gastosFiltrados1.length;i++){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gastosFiltrados1[i])
}

let gastosFiltrados2 = gesPres.filtrarGastos({valorMinimo:50});

for (let i=0;i<gastosFiltrados2.length;i++){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gastosFiltrados2[i])
}

let gastosFiltrados3 = gesPres.filtrarGastos({etiquetasTiene: ["seguros"], valorMinimo:200 });

for (let i=0;i<gastosFiltrados3.length;i++){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gastosFiltrados3[i])
}

let gastosFiltrados4 = gesPres.filtrarGastos({etiquetasTiene: ["comida", "transporte"], valorMaximo:50 });

for (let i=0;i<gastosFiltrados4.length;i++){
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gastosFiltrados4[i])
}
let gastosAgrup1 = gesPres.agruparGastos("dia")
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gastosAgrup1,"día")

let gastosAgrup2 = gesPres.agruparGastos("mes")
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-mes",gastosAgrup2,"mes")

let gastosAgrup3 = gesPres.agruparGastos("anyo")
gesPresWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo",gastosAgrup3,"año")