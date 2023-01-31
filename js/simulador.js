/**=========CREAR LISTA DE SERVICIOS DISPONIBLES============== */
let listaServicios = document.getElementById("options--container");

for (let i = 0; i < serviciosDisponibles.length; i++){
    let option= serviciosDisponibles[i];
    let div = document.createElement("div");
    div.className = "option";
    listaServicios.appendChild(div);
    div.innerHTML = `<input type="radio" class="radio" id=${option._id} name="service"> <label for=${option._id}>${option._nombre}</label>`;
}

/**=====================CUSTOM OPTIONS======================== */
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options--container");
let servicioElegido;
const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
})

optionsList.forEach(o => {
    o.addEventListener("click", () =>{
        selected.innerHTML = o.querySelector("label").innerHTML;
        o.querySelector("input").checked = true;
        optionsContainer.classList.remove("active");
        servicioElegido = serviciosDisponibles.find(servicio => servicio._nombre === selected.textContent);
        document.getElementById("service--price").innerText = `$${servicioElegido._precio}`;
    })
})

/**=============ARRAY DE INGRESOS=========== */
const ingresos = [];

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of ingresos){
        totalIngreso += ingreso._precio;
    }
    return totalIngreso;
}

let cargarTotal = () =>{
    let presupuesto = totalIngresos();
    document.getElementById('total__budget').innerText = `Total: $${presupuesto}`;
}

cargarTotal();

/**====================================MOSTRAR LISTA============================================= */
const mostrarLista = () => {
    [].forEach.call(document.querySelectorAll(".list--element"), function(elemento){
        elemento.parentNode.removeChild(elemento);
    });

    for (producto of ingresos){
        let listaTotales = document.getElementById("data__list");
        let div = document.createElement("div");
        div.className = "list--element";
        listaTotales.insertBefore(div, listaTotales.children[0]);
        div.innerHTML = `
            <div class="element__name">${producto._nombre}</div>
            <div class="right">
                <div class="element__price"><span>+${producto._precio}</span></div>
                <div class="element__delete">                            
                    <button class="button button__small button__gray element__delete--btn" id="element__delete--btn"  onclick="deleteElement('${producto._id}')">                                    
                        <i class="ri-close-circle-line"></i>                                        
                    </button>                                    
                </div>                               
            </div>                                                        
            `;
    }
}

/**========================= AGREGAR AL ARRAY DE INGRESO =========================== */
const button = document.getElementById("budget__button");

button.addEventListener("click", () => {
    if (servicioElegido !== undefined) {
        ingresos.push(servicioElegido);
        cargarTotal();
        mostrarLista();
    }
})

/**========================= ELIMINAR DEL ARRAY =========================== */
const deleteElement = (id) =>{
    let element = ingresos.findIndex(ingreso => ingreso._id === id);
    console.log(element);
    ingresos.splice(element, 1);
    cargarTotal();
    mostrarLista();
}