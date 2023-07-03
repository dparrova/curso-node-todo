const inquirer = require('inquirer');
const Tarea = require('../models/tarea');
require('colors');

const preguntas = [{
  type: 'list',
  name: 'opcion',
  message: '¿qué desea hacer?',
  choices: [{
    value: '1',
    name: `${'1.'.green} Crear tarea`
  },
  {
    value: '2',
    name: `${'2.'.green} Listar tareas`
  },
  {
    value: '3',
    name: `${'3.'.green} Listar tareas completadas`
  },
  {
    value: '4',
    name: `${'4.'.green} Listar tareas pendientes`
  },
  {
    value: '5',
    name: `${'5.'.green} Completar tarea(s)`
  },
  {
    value: '6',
    name: `${'6.'.green} Borrar tarea`
  },
  {
    value: '0',
    name: `${'0.'.green} Salir`
  }]
}];



const inquirerMenus =  async() => {

  console.clear();
  console.log('==========================='.green);
  console.log('  Selecciones una opción'.green);
  console.log('===========================\n'.green);

  const {opcion} = await inquirer.prompt(
    preguntas
  )
    return opcion
}

const pausa = async() =>{

  const pausas =[{
    type: 'input',
    name: 'pausa',
    message: `Presione ${'ENTER'.green} para continuar.`
  }];

  await inquirer.prompt(
    pausas
  );
};

const leerInput = async(message)=>{
  const question=[
    {
      type: 'input',
      name: 'desc',
      message,
      validate ( value ){
        if (value.length===0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ]

  const {desc} = await inquirer.prompt(question);
  return desc;
}

const listadoTareasPorBorrar = async(tareas=[]) =>{
const choices = tareas.map((tarea,i) => {
  const idx = `${i+1}.`.green;
  return {
    value: tarea.id,
    name: `${idx} ${tarea.desc}`
  }
});

choices.unshift({
  value: '0',
  name: `${'0.'.green} Salir`
})


const preguntas = {
  type :'list',
  name: 'id',
  message:'Borrar',
  choices
}
const {id} = await inquirer.prompt(preguntas);
return id;

}

const confirmar = async (message) => {

  const question = [{
    type: 'confirm',
    name: 'ok',
    message,

  }]

  const {ok} = await inquirer.prompt(question);
return ok;

}

const mostrarListadoChecklist = async(tareas=[]) =>{
  const choices = tareas.map((tarea,i) => {
    const idx = `${i+1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn)? true : false
    }
  });

  const preguntas = {
    type :'checkbox',
    name: 'ids',
    message:'Seleccione',
    choices
  }
  const {ids} = await inquirer.prompt(preguntas);
  return ids;

  }

module.exports = {
  inquirerMenus,
  pausa,
  leerInput,
  listadoTareasPorBorrar,
  confirmar,
  mostrarListadoChecklist
}