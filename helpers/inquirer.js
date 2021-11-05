const inquirer = require('inquirer');
require('colors');



//=================================================
        // menu de opciones
//=================================================
const menuOpt =[
    {
        type: 'list',
        name: 'opciones',
        choices: [
            {
                value: '1' ,
                name: `${'1'.green}  Crear tarea`
            },
            {
                value: '2' ,
                name: `${'2'.green}  Listar tarea`
            },
            {
                value: '3' ,
                name: `${'3'.green}  Listar tarea completadas`
            },
            {
                value: '4' ,
                name: `${'4'.green}  Listar tareas pendientes`
            },
            {
                value: '5' ,
                name: `${'5'.green}  Completar tarea(s)`
            },
            {
                value: '6' ,
                name: `${'6'.green}  Borrar tarea`
            },
            {
                value: '0' ,
                name:`${'0'.green}  Salir`
            },
        ]
    }
];
//=================================================
        // formato de seleccion
//=================================================
const menuInquirer = async()=>{
    // console.clear();
    console.log('========================='.green);
    console.log('  Selecione una opcion');
    console.log('=========================\n'.green);

    const {opciones} =await inquirer.prompt(menuOpt)
    return opciones;
};
//=================================================
        // menu de pausar y verificar
//=================================================
const pausa = async()=>{
    const menuPausa =[
        {
            type: 'input',
            name:'enter',
            message: `Selecione ${'ENTER'.green} para continuar`
        }
    ]

    // console.log()
    const pausa =await inquirer.prompt(menuPausa)
        return pausa;
};
//=================================================
        // leer las opciones
//=================================================

const leerInput = async( message)=>{
    const question =[
        {
            type: 'input',
            name:'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese valor '
                }
                return true;
            }
        }
    ];
        const { desc } = await inquirer.prompt(question);
        return desc;
};

const listadoTareaBorrar = async( tareas =[])=>{
    const choices = tareas.map( (tarea, i )=>{
        const idx = `${i+1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })
    const preguntas =[
        {
            type:'list',
            name:'id',
            message:'borrar',
            choices

        }
    ]
    const {id} =await inquirer.prompt(preguntas)
    return id
}

const confirmar = async (message)=>{
   
    const question =[
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} =await inquirer.prompt(question)
    return ok;

}

const mostrarListadoChecks = async( tareas =[])=>{
   
    const choices = tareas.map( (tarea, i )=>{
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc }`,
            checked: (tarea.complementadoEn)? true : false
        }
    });
   
    const pregunta =[
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices

        }
    ]
    const {ids} =await inquirer.prompt(pregunta)
    return ids
}


module.exports={
    menuInquirer,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoChecks
}