import fs from "fs"

export default class ProductManager {

    constructor(path) {
        this.path = path
    }

    //Agregar productos
    async addProduct(producto) {

        const productos = await this.getProducts()

        try {
            if (fs.existsSync(this.path)) {

                let chequearCodigo = productos.some(x => x.code === producto.code)
                if (chequearCodigo == true) {
                    return { status: "Failed", message: `El producto ya existe` }

                } else {
                    producto.id = productos.length + 1
                    productos.push(producto)
                    await fs.promises.writeFile(this.path, JSON.stringify(productos), null, "\t")
                    return { status: `Ok`, message: `Producto agregado correctamente` }
                }

            } else {
                return { status: "Failed", message: `Fallo al agregar el producto` }
            }
        } catch (error) {
            console.log(`Fallo al agregar el producto `)
            return { status: `Failed`, message: `Fallo al agregar el producto.` }
        }
    }

    // Consultar productos
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                let data = await fs.promises.readFile(this.path, "utf-8")
                const productos = JSON.parse(data)
                return productos
            }
        } catch (error) { console.log(`Error al obtener los productos`) }

    }

    
    //Modificar producto
    async updateProduct(producto) {
        try {
            const productos = await this.getProducts()
            let productoEncontrado = productos.find(p => p.id === producto.id)

            if (productoEncontrado) {
                const IndexEncontrado = productos.findIndex(p => p.id === producto.id)
                productos[IndexEncontrado] = producto

                await fs.promises.writeFile(this.path, JSON.stringify(productos), null, "\t")
                return { status: "Ok", message: "Producto modificado" }
            }
            else {
                return { status: "Failed", message: "El producto no se encontro para poder modificar." }
            }
        } catch (error) { console.log(`error al modificar el producto`) }
    }

    //Borrar producto
    async deleteProduct(id) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(data)
            const IndexEncontrado = productos.findIndex(x => x.id === id)

            if (IndexEncontrado >= 0) {
                productos.splice(IndexEncontrado, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productos), null, "\t")
                return { status: "ok", message: "producto borrado" }
            } else {
                console.log(`producto no encontrado`)
            }
        } catch (error) { console.log(`No se pudo borrar el producto`) }
    }


    //Obtener producto por ID
    async getProductById(id) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productos = JSON.parse(data)
            let idEncontrado = productos.find(p => p.id === id)
            if (idEncontrado) {
                return idEncontrado
            } else {
                return "No se encontro el producto"
            }
        } catch (error) { console.log("producto no encontrado") }
    }

}

