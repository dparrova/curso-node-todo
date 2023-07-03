const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr(){
    const listado = [];

    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea)
    });

    return listado;
  }

  constructor(){
    this._listado={}
  }

  borrarTarea(id=''){

    if (this._listado[id]) {
      delete this._listado[id];
    }

  }

  cargarTareasFromArray(tareas=[])
{
  tareas.forEach( tarea => {
    this._listado[tarea.id]=tarea;

  })
}
  crearTarea(desc= ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id]=tarea;
  }

  listadoCompleto(){
      let listado = ``;

      Object.keys(this._listado).forEach((key,i) => {
        const tarea = this._listado[key];
        const index = `${i+1}`.green;
        let estado = (tarea.completadoEn)?'Completada'.green:'Pendiente'.red;

        listado += `${index}. ${tarea.desc} :: ${estado}\n`

      });

      return listado;

  }

  listadoCompletados(completado = true){
    let listado = ``;
    let index = 0;
    Object.keys(this._listado).forEach((key,i) => {
      const tarea = this._listado[key];
      if (completado) {
        if (tarea.completadoEn) {
          index += 1 ;
          listado += `${(index + '.').green} ${tarea.desc} :: ${tarea.completadoEn.green}\n`
        }
      }
      else{
        if (!tarea.completadoEn) {
        index +=  1 ;
        listado += `${(index + '.').green} ${tarea.desc} :: ${'Pendiente'.red}\n`
        }
      }
    });
    return listado;
  }

  toogleCompletadas(ids=[]){
    ids.forEach(id =>{
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    })
    this.listadoArr.forEach(tarea =>{
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null
      }
    })
  }
}

module.exports = Tareas