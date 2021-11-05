const { resolve } = require('path');

require('colors');


const mostrarMensaje = ()=>{

    return new Promise( resolve => {
        
            console.log('========================='.green);
            console.log('  Selecione una opcion'.green);
            console.log('=========================\n'.green);
        
            console.log(`\n${'1'.green}  Crear tarea`)
            console.log(`${'2'.green}  Listar tarea`)
            console.log(`${'3'.green}  Listar tarea completadas`)
            console.log(`${'4'.green}  Listar tareas pendientes`)
            console.log(`${'5'.green}  Completar tarea(s)`)
            console.log(`${'6'.green}  Borrar tarea`)
            console.log(`${'0'.green}  Salir\n`)
        
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
                readline.question('Selecion un opcion:' , (opt)=>{
                    // console.log({opt})
                    readline.close()
                    resolve(opt)
                });
    });
};
const pausa  = () =>{
    return new Promise( resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`\nSelecione ${'ENTER'.green} para continuar\n`, (opt)=>{
            // console.log({opt})
            readline.close()
            resolve(opt)
        });
    })
}



module.exports ={
    mostrarMensaje,
    pausa
}