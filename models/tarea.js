const {v4: uuidv4}= require('uuid');
class Tarea{
    id= ''
    desc= '';
    complementadoEn= null;
    constructor(desc, ){
        this.id= uuidv4();
        this.desc= desc;
        this.complementadoEn= null;
    }
}


module.exports= Tarea;