class Producto {
    static contadorProductos = 0;
    
    constructor(nombre, precio, tipo, id) {
        this._nombre = nombre;
        this._precio = precio;
        this._idProducto = ++Producto.contadorProductos;
        this._tipo = tipo;
        this._id = id;
    }

    get idProducto() {
        return this._idProducto;
    }

    toString() {
        return `Codigo-Producto: ${this.idProducto}; Nombre: ${this._nombre}; Precio: $${this._precio}\n `
    }
}