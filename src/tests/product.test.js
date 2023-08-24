const request = require("supertest")
const app = require("../app")
const Category = require("../models/Category")
require("../models")

const URL_BASE ='/api/v1/products'
const URL_BASE_USER= '/api/v1/users/login'
let TOKEN
let product
let category
let productId

beforeAll(async() =>{
    const user = {
        lastName:"Lizarraga",
        email:"maria@gmail.com"
    }
    const res = await request(app)
    .post(URL_BASE_USER)
    .send(user)

    TOKEN = res.body.token

    const categoryBody = {
        name:"smart Tv"
    }

    category = await Category.create(categoryBody)

    product = {
        title:"lg oled 55",
        description:"lroem10",
        price:"20.30",
        categoryId:category.id
    }
})

test("POST -> 'URL_BASE', should resturn status code 201 and res.body.title = product.title", async () =>{
    const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set("Authorization", `bearer ${TOKEN}`)
    productId = res.body.id

    expect(res.status)
    expect(res.body).toBeDefined()
    expect(res.body.title)

    await category.destroy()
})

test("GET -> 'URL_BASE', should  resturn status  code 200 aand res.body.length = 1", async() => {
    const res= await request(app)
    .get(URL_BASE)

    console.log(res.body);

    expect(res.status)
    expect(res.body).toBeDefined()
    expect(res.body)
    expect(res.body)
    expect(res.body)

    await category.destroy()
})

test("GET -> 'URL_BASE?category=id', should  resturn status  code 200 and res.body.length = 1, res.body[0].category to  be  defined and res.body[0].category = category.id", async() => {
    const res= await request(app)
    .get(`${URL_BASE}?category=${category.id}`)

    console.log(res.body);

    expect(res.status)
    expect(res.body).toBeDefined()
    expect(res.body)
    expect(res.body)
    expect(res.body)

    await category.destroy()
})

test("GET ONE -> 'URL_BASE/:id', should  resturn status  code 200 aand res.body.title = product.title", async() => {
    
    const productUpdate = {
        title: "Samsung oled 55",
    }

    const res= await request(app)
    .put(`${URL_BASE}/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status)
    expect(res.body).toBeDefined()
    expect(res.body)

    await category.destroy()
})

