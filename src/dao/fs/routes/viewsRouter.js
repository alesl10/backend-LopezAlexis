import { Router } from "express";
import ProductManager from "../manager/productsManager.js"


const routerViews = Router();
const manager = new ProductManager("./data/products.json")
let productos = await manager.getProducts()

routerViews.get("/", async (req, res) => {
    res.render("index", { productos });
});

// socket
routerViews.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})


export default routerViews;