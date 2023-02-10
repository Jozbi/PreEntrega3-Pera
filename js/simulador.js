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
}, 3000)

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
            mostrarResultado(jsonResponse);
        }
    } catch (error) {
        console.log(error);
    }
};

const mostrarResultado = (servicios) => {
    const servicioSelecionado = servicios.find(servicio => servicio._nombre === selected.textContent);
    if (serviciosSelecionados.some( nombreServicio=> nombreServicio._nombre === servicioSelecionado._nombre)){
        alert('Ya lo seleccionaste gil, no se')
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
        tabla.appendChild(row);
    }

}

const addButton = document.getElementById("add__button");
addButton.addEventListener('click', recibeInfo);

function deleteItem(e) {
    serviciosSelecionados = serviciosSelecionados.filter(elemento => elemento._id != e.id);
    e.parentElement.parentElement.remove()
}