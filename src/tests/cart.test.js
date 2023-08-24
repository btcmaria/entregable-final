//inicio seccion
//token guardamos
//consttante para el body de product
//crea la instanticia de product

const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")

const URL_BASE_USERS ="/api/v1/users"
const URL_BASE = "/api/v1/users"
let TOKEN
let productBody
let product 
let userId
let cartId

beforeAll(async()=>{
    const user = {
        email:"maria@gmail.com",
        password:"maria123"
    }

    const  res =  await request(app)
    .post(`${URL_BASE_USERS}/login`)
    .send(user)

    TOKEN = res.body.token

    userId= res.body.user.id

    productBody = {
        title:"productTest",
        description:"lorem20",
        price:23
    }

    product = await Product.create(productBody)

})

test("POST ->'URL_BASE', should return  status code 201  and res.body.quantity === bodyCart.quantity", async() =>{
    const bodyCart = {
        quantity:1,
        productId:product.id,
    }

    const res  = await request(app)
    .put(`${URL_BASE}/${cartId}`)
    .send(bodyCart)
    .set("Authorization", `bearer ${TOKEN}`)

    cartId= res.body.id


    expect(res.status)
    expect(res.body).toBeDefined()


    
})

test("GET ->'URL_BASE', should  return status code 200 and  res.body.length === 1", async() =>{
    const res = await request(app)
    .get(URL_BASE)
    .set("Authorization", `Bearer ${TOKEN}`)


    expect(res.status)
    expect(res.body).toBeDefined()
    expect(res.body)

    await product.destroy()
})

test("PUT -> 'URL_BASE/:id', should  return status  code 200  and  res.body.quiantity === bodyCart.quantity",async () =>{
    const bodyUpdate = {
        quantity: 2
    }

    const res = await request(app)
    .put(`${URL_BASE}/:id`)
    .send()
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status)
    expect(res.body).toBeDefined()
    expect(res.body)
})