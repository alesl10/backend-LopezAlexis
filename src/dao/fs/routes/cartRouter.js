import { Router } from "express"
import CartManager from "../manager/cartManager.js"


const router = Router()
const cartManager = new CartManager("./data/carts.json")



//Consultar carritos
router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts()
    res.send(carts)
})

//Consultar carrito por id
router.get("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const carritoEncontrado = await cartManager.getCartById(cid)
    if (carritoEncontrado) {
        res.send(carritoEncontrado)
    } else {
        res.send({ error: `No se encontro el carrito` })
    }
})

//Crear carrito
router.post("/", async (req, res) => {
    const carts = await cartManager.createCart()
    res.send({ status: "Ok", message: "Carrito creado" })
})

//Agregar producto a carrito
router.post("/:cid/products/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid)
    const pid = parseInt(req.params.pid)
    const products = await cartManager.addProductToCart(cid, pid)
    res.send({ status: "Ok", message: `producto agregado` })
})

export default router