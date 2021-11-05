require('colors');
const {guardarDB, leerDB }= require('./helpers/crearArchivo');
const { menuInquirer,
        pausa,
        leerInput,
        listadoTareaBorrar, 
        confirmar,
        mostrarListadoChecks,
        toggleCompletadas} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main = async()=>{

    let opt= '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
         if (tareasDB) {
             //establecer las tareas
             tareas.cargarTareaFromArray(tareasDB)
         }

    do {
        // imprimir el mnenu
        opt = await menuInquirer();

        switch (opt) {
            case '1':
                //crear opcion
        const desc = await leerInput('Descripción:');
                    tareas.crearTarea( desc );
                break;
            case '2':// mostrar listado
              tareas.listadoCompleto();
                break;   
            case '3':// listar completadas
                tareas.listarPendientesCompletadas(true);
                    break;   
            case '4':// listar pendientes
            tareas.listarPendientesCompletadas(false);
                break;  
            case '5':// listar pendientes
              const ids= await mostrarListadoChecks(tareas.listadoArray);
              tareas.toggleCompletadas(ids)
            break;
            case '6': // borrar
              const id = await listadoTareaBorrar(tareas.listadoArray);
              if (!id === '0') {
                  
                  const ok = await confirmar('¿Estas Seguro?')
                  //preguntar si estas seguro
                  if (ok) {
                      tareas.borrarTarea(id)
                      console.log('\ntarea borrada')
                  }
              }
            break;   
        }



        guardarDB(tareas.listadoArray)

            await pausa();

    } while (opt !== '0');
    
};

main();