const {v4:uuidv4} = require('uuid');

class Tarea {
  id = '';
  desc = '';
  completadoEn = null;

  constructor(descripcion){
    this.id= uuidv4();
    this.desc = descripcion;
  }

}

module.exports = Tarea