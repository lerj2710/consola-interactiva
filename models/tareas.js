const Tarea = require('./tarea');

class Tareas{

    _listado={};
    
    get listadoArray(){
        const listado =[];
        Object.keys(this._listado).forEach( llave =>{
            const tarea = this._listado[llave];
            listado.push(tarea);
        });

        return listado;
    };
    constructor(){
        this._listado= {};
    };

    borrarTarea(id=''){
            if (this._listado[id]) {
               delete this._listado[id];
            }
    }

    cargarTareaFromArray( tareas = []){
        
        tareas.forEach( tarea=>{

            this._listado[tarea.id] = tarea;
        });
    };
    crearTarea(desc =''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };
    listadoCompleto(){
      
      this.listadoArray.forEach( (tarea, i)=>{
        const idx = `${i +1}`.green;
        const {desc,complementadoEn}= tarea;
        const estado = (complementadoEn)
                        ?'Completada'.green
                        :'Pendiente'.red
        
        console.log(`${idx}. ${desc}:: ${estado}`)

      })

    
      
    };
    listarPendientesCompletadas( completadas = true){
        console.log()
        let contador= 0;

        this.listadoArray.forEach( tarea =>{
            
            const {desc,complementadoEn}= tarea;
            const estado = (complementadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red
            
            if (completadas) {
                //mostrar completa

                if (complementadoEn) {
                    contador +=1;
                    console.log(`${contador.toString().green}. ${desc}:: ${estado}`)
                }
            }else{
                //mostrar pendientes
                if (!complementadoEn) {
                    contador +=1;
                    console.log(`${contador.toString().green}. ${desc}:: ${estado}`)
                }
            }
        })
    };
    
    toggleCompletadas( ids=[] ){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if (!tarea.complementadoEn) {
                tarea.complementadoEn = new Date().toUTCString()
            }
        })
        this.listadoArray.forEach( tarea =>{
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].complementadoEn = null;
            }
        })
    };
}

module.exports=Tareas;