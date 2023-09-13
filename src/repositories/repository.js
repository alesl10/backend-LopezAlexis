import productsDAO from "../dao/products.factory.js"
import ProductsRepository from "./products.repository.js"
export const productsRepository = new ProductsRepository(productsDAO);

import cartsDAO from "../dao/carts.factory.js"
import CartsRepository from "./carts.repository.js"
export const cartsRepository = new CartsRepository(cartsDAO);

import viewsDAO from "../dao/views.factory.js"
import ViewsRepository from "./views.repository.js"
export const viewsRepository = new ViewsRepository(viewsDAO);

import sessionsDAO from "../dao/sessions.factory.js"
import SessionsRepository from "./sessions.repository.js"
export const sessionsRepository = new SessionsRepository(sessionsDAO);