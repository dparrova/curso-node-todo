require('colors');

const { guardarDB,leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenus,pausa,leerInput, listadoTareasPorBorrar,confirmar, mostrarListadoChecklist} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
console.clear();

const tareas = new Tareas();

const main = async()=>{

  let opt ='';
  const tareasDB = leerDB();

  if (tareasDB) {
   tareas.cargarTareasFromArray(tareasDB);
  }

  do{
   opt= await inquirerMenus();

   switch (opt) {
    case '1':
      // Crear opcion
      const desc = await leerInput('Descripcion: ')
      tareas.crearTarea(desc);
      break;
   case '2':
    console.log( tareas.listadoCompleto())
      break;
      case '3':
        console.log( tareas.listadoCompletados())
        break;
        case '4':
          console.log(tareas.listadoCompletados(false));
          break ;
            case '5':
         const ids= await mostrarListadoChecklist(tareas.listadoArr)
          tareas.toogleCompletadas(ids);
         break;
      case '6':
        const id = await listadoTareasPorBorrar(tareas.listadoArr);
        if (id !== '0') {

          const ok = await confirmar('¿Está seguro?');
          if (ok) {
            tareas.borrarTarea(id);

          }
        }
        break
    default:
      break;
   }

   guardarDB(tareas.listadoArr)

   await pausa();

  }while( opt !== '0' )
}

main();