/**=========CREAR LISTA DE SERVICIOS DISPONIBLES============== */
let contenedorServicios = document.getElementById("options--container");
function cargarServicios() { 
    fetch('./js/servicios.json')
        .then(respuesta => respuesta.json())
        .then(servicios => {
            servicios.forEach(servicio => {
                let div = document.createElement("div");
                div.className = "option";
                contenedorServicios.appendChild(div);
                div.innerHTML = `<input type="radio" class="radio" id=${servicio._idProducto} name="service"> <label for=${servicio._idProducto}>${servicio._nombre}</label>`;
            });
        })
}
cargarServicios();
/**=====================LISTA SERVICIOS======================== */
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options--container");
let optionsList = document.querySelectorAll(".option");

setTimeout(function(){
    optionsList = document.querySelectorAll(".option");
}, 2000);

setTimeout(function(){
    optionsList.forEach(service => {
        service.addEventListener("click", () => {
            selected.innerHTML = service.querySelector("label").innerHTML;
            service.querySelector("input").checked = true; 
            optionsContainer.classList.remove("active");
        });
    });
}, 2000)

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

/**=====================AGREGAR SERVICIO======================== */
const tabla = document.querySelector('#listaServicios tbody');
let serviciosSelecionados = [];
const recibeInfo = async () => {
    try {
        const response = await fetch('./js/servicios.json', {cache: 'no-cache'});
        if(response.ok){
            const jsonResponse = await response.json();
            if (selected.innerText === 'Selecciona un Servicio'){
                Swal.fire({
                    icon: 'error',
                    title: 'Primero seleccione un servicio.',
                  })
            } else {
                mostrarResultado(jsonResponse);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const mostrarResultado = (servicios) => {
    const servicioSelecionado = servicios.find(servicio => servicio._nombre === selected.textContent);
    if (serviciosSelecionados.some( nombreServicio=> nombreServicio._nombre === servicioSelecionado._nombre)){
        Swal.fire({
            icon: 'error',
            title: 'Solo se permite una unidad por servicio.',
          })
    } else {
        serviciosSelecionados.push(servicioSelecionado);
        const row = document.createElement('tr');
        row.innerHTML += `
        <td>${servicioSelecionado._nombre}</td>
        <td>$${servicioSelecionado._precio}</td>
        <td>${servicioSelecionado._tipo}</td>
        <td>
            <button class="button button__small button__gray delete--btn" id="${servicioSelecionado._id}" onclick='deleteItem(this)'">                                    
                <i class="ri-close-circle-line"></i>                                        
            </button> 
        </td>
        `;
        tabla.insertBefore(row, tabla.children[0]);
        costoTotal();
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Servicio Agregado',
            showConfirmButton: false,
            timer: 1500
          })
    }

}

const addButton = document.getElementById("add__button");
addButton.addEventListener('click', recibeInfo);

function deleteItem(td) {
    Swal.fire({
        title: 'Estas seguro?',
        text: "No podras volver atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            serviciosSelecionados = serviciosSelecionados.filter(elemento => elemento._id != td.id);
            td.parentElement.parentElement.remove()
            costoTotal();
            Swal.fire(
                'Eliminado!',
                'Servicio quitado de la lista.',
                'Exito'
            )
        }
      })
}

/**=====================TOTAL======================== */
const totalFinal = (servicios) => {
    let total = 0;
    for (precios of servicios) {
        console.log(precios);
        total += precios._precio;
    }
    return total;
}
const costoTotal = () => {
    let totalTd = document.getElementById('totalBudget');
    let precioFinal = totalFinal(serviciosSelecionados);
    if (totalTd === null) {
        const row = document.createElement('tr');
        row.id = 'totalBudget';
        row.innerHTML += `
        <td>Costo Total</td>
        <td id="totalPrice">$${precioFinal}</td>
        `;
        tabla.appendChild(row);
    } else if (serviciosSelecionados.length === 0){
        totalTd.remove();
    } else {
        let totalPrice = document.getElementById('totalPrice');
        totalPrice.innerHTML = `$${precioFinal}`;
    }
};