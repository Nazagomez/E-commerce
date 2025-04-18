const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBton = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEvenListeners();
function cargarEvenListeners() {
    //agregar cursor presionando egregar a carrito
    listaCursos.addEventListener('click', agregarCurso);

//eliminar
carrito.addEventListener('click', eliminarCurso);

//Vaciar 
vaciarCarritoBton.addEventListener('click', () => {
articulosCarrito = [];//limpia

limpiarHTML();

});
}


//funciones 
function agregarCurso(e) {
    e.preventDefault();



    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCursos(cursoSeleccionado);

    }

}
//Elimina curso
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) 
        {
const cursoId=  e.target.getAttribute('data-id');
articulosCarrito= articulosCarrito.filter( curso => curso.id !== cursoId);
carritoHTML(); //iterar y mostrar

}
}

// lee contenido html 
function leerDatosCursos(curso) {
    //console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }
    //verificar si un objeto ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if (existe) {
//acutaliza
const cursos = articulosCarrito.map(curso => {
    if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna objeto actualizado
    } else {
        return  curso; // no duplicados
    }
});
articulosCarrito = [...cursos];
} else {
 //agrega al carrito 
 articulosCarrito = [...articulosCarrito, infoCurso]
}
   
    console.log(articulosCarrito)

    carritoHTML();
}

//muestra el carrito en el HTML
function carritoHTML() {

    //limpiar 
    limpiarHTML();

    //recorre
    articulosCarrito.forEach(curso => {
       const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"> </td>
        <td>${titulo} </td>
        <td>${precio} </td>
        <td>${cantidad} </td>
        <td> 
        <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>

        `;
    

        contenedorCarrito.appendChild(row);

    });
}

function limpiarHTML() {
//forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild)

 }

}
