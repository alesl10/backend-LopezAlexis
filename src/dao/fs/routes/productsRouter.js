import { Router } from "express"
import ProductManager from "../manager/productsManager.js"


const router = Router()
const manager = new ProductManager("./data/products.json")


//obtener productos con limite
router.get("/", async (req, res) => {

    let products = await manager.getProducts()
    let limit = req.query.limit

    try {
        if (limit) {
            res.send(products.slice(limit))
        } else {
            res.send(products)
        }
    } catch (error) { console.log(`fallo al obtener productos`) }
})

//Obtener productos por parametro
router.get("/:pid", async (req, res) => {
    let idProduct = parseInt(req.params.pid)
    let products = await manager.getProducts()
    let product = products.find(x => x.id === idProduct)
    if (product) {
        res.send(product)
    } else {
        res.send({ error: `fallo al obtener producto` })
    }
})

//agregar producto
router.post(`/`, async (req, res) => {
    const producto = req.body
    try {
        const estado = await manager.addProduct(producto)

        if (estado.status === "Ok") {
            res.send({ status: "Ok", message: `Producto (${producto.title}) agregado` })
        } else {
            console.log("error al agregar producto")
            res.send(estado)
        }
    } catch (error) {
        console.log(`error al agregar producto`)
    }
})


//Borrar producto
router.delete(`/delete/:pid`, async (req, res) => {
    let idProduct = parseInt(req.params.pid)
    console.log(idProduct)
    let products = await manager.getProducts()
    let product = products.find(x => x.id === idProduct)
    if (product) {
        manager.deleteProduct(idProduct)
        res.send({ status: "Ok", message: `producto borrado` })
    } else {
        res.send({ error: `no se encontro el producto` })
    }
})


export default router