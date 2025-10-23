const form = document.getElementById('form-tarea');

const lista = document.getElementById('lista-tareas');


const mensaje = document.getElementById('mensaje');

function cargarTareas() {


  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  tareas.forEach(t => mostrarTarea(t));
}







function mostrarTarea(tarea) {
  const li = document.createElement('li');


  li.textContent = `${tarea.titulo} - ${tarea.fecha} - ${tarea.prioridad}`;

  if (tarea.completada) li.classList.add('completada');

  li.addEventListener('click', () => {
    li.classList.toggle('completada');


    tarea.completada = !tarea.completada;
    guardarCambios();
  });

  lista.appendChild(li);
}






function guardarCambios() {


  const tareas = [];
  lista.querySelectorAll('li').forEach(li => {
    const partes = li.textContent.split(' - ');


    tareas.push({
      titulo: partes[0],

      fecha: partes[1],
      prioridad: partes[2],

      completada: li.classList.contains('completada')
    });
  });
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const tarea = {
    titulo: document.getElementById('titulo').value,

    fecha: document.getElementById('fecha').value,

    prioridad: document.getElementById('prioridad').value,
    completada: false
  };
  mostrarTarea(tarea);
  guardarCambios();
  mensaje.textContent = "Tarea anadida con exito";
  form.reset();
});

cargarTareas();
