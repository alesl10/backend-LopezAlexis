import fs from "fs"
import ProductManager from "../manager/productsManager.js"

const productManager = new ProductManager("./data/products.json")

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    //Consultar carrito
    getCarts = async () => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const carrito = JSON.parse(data)
        return carrito
    }

    //consultar por id
    getCartById = async (id) => {
        const data = await fs.promises.readFile(this.path, "utf-8")
        const carrito = JSON.parse(data)
        const encontrado = carrito.find(p => p.id === id)
        return encontrado
    }

    //Crear carrito
    createCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const carritos = JSON.parse(data)
                let nuevoCarrito = {
                    id: carritos.length + 1,
                    products: []
                }
                carritos.push(nuevoCarrito)
                fs.promises.writeFile(this.path, JSON.stringify(carritos), null, "\t")
            } else {
                let nuevosCarritos = []
                let nuevoCarrito = {
                    id: nuevosCarritos.length + 1,
                    products: []
                }
                nuevosCarritos.push(nuevoCarrito)
                fs.promises.writeFile(this.path, JSON.stringify(nuevosCarritos), null, "\t")
            }
        } catch (error) { "no se pudo crear carrito" }
    }

    //Agregar producto a carrito
    addProductToCart = async (cartId, productId) => {

        const cartData = await fs.promises.readFile(this.path, "utf-8")
        const cartsArray = JSON.parse(cartData)
        const foundCart = await this.getCartById(cartId)
        const foundProductInDb = await productManager.getProductById(productId)

        try {
            if (foundCart && foundProductInDb) {
                const productExistsInsideCart = await foundCart.products.find(x => x.id == productId)
                if (!productExistsInsideCart) {
                    foundCart.products.push({ id: productId, quantity: 1 })
                } else {
                    productExistsInsideCart.quantity += 1
                }
                const modifiedCartIndex = cartsArray.findIndex(x => x.id === cartId)
                cartsArray[modifiedCartIndex] = foundCart
                fs.promises.writeFile(this.path, JSON.stringify(cartsArray), null, "\t")
            } else {
                console.log("addProductToCart failed, cart or product not found.")
            }
        } catch (error) { return error.message }
    }
}