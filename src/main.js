import './assets/css/tailwind.css'
import './assets/css/index.css'

const titleEl = document.querySelector('#title')

if (titleEl) {
  titleEl.innerHTML = 'Value'
}

// * Crear funciones para actualizar DOM, podría crear un DOM virtual...
// * Amo crear vanilla, pero es más cómodo trabajar con React.
