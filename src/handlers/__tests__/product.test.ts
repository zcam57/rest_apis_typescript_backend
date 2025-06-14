import { body } from 'express-validator';
import request from "supertest";
import server from "../../server";
import { response } from "express";

describe("POST /api/products", () => {

    test('should display validation errors', async () => {

        const response = await request(server).post('/api/products').send({})
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toEqual(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    test('should display that the price is greater than 0', async () => {

        const response = await request(server).post('/api/products').send({
            name: 'producto de prueba',
            price: 0
        })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toEqual(404)
        expect(response.body.errors).not.toHaveLength(2)

    })

    test('should validate thate the price  is a number and  greater than 0', async () => {

        const response = await request(server).post('/api/products').send({
            name: 'producto de prueba',
            price: 0
        })
        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toEqual(404)
        expect(response.body.errors).not.toHaveLength(2)

    })



    test('should created a new product', async  () => {
        const response = await request(server).post('/api/products').send({
            name: 'test product',
            price: 100
        })
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.status).not.toHaveProperty('error')
    })

    

})

describe("GET /api/products", ()  => {

    test('Should check if the URL exists', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404)
    })




    test('GET a JSON response wiht products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.body).not.toHaveProperty('errors')
    })
})

describe("GET /ap/products/:id", () => {
    test('should return a 404 response for a non-exstent product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    test('shoul check a valid ID in the URL', async () => {
        const  response = await request(server).get('/api/products/not-valid-ID')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

    test('Get a JSON response for a single product', async () =>{
        const response = await request(server).get('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe("PUT /api/products/:id", () => {

    test('should check a valid ID in the URL', async () => {
        
        const response = await request(server).put('/api/products/not-valid-url').send({
            name: "prueba",
            availability: true,
            price: 300
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')
        
    })
    
    test('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should validate that the price is correct', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Prueba',
            availability: true,
            price: -300
        })

        expect(response.status).toEqual(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should return a 404 response for a non-existent product', async () => {
        
        const response = await request(server).put('/api/products/2000').send({
            name: "prueba",
            availability: true,
            price: 300
        })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('El producto a editar no existe')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
        
    })
    
   
    test('should update an existing product with valid data', async () => {
        
        const response = await request(server).put('/api/products/1').send({
            name: "prueba - actualizada",
            availability: true,
            price: 300
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
        
    })
    


})

describe('PATCH /api/products/:ID', () =>{

    test('shold return a 404 response for a non-existent product', async() =>{
        const productID= 2000
        const response = await request(server).patch(`/api/products/${productID}`)    
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('El producto a editar no existe')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should updated the product availability', async () => {
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
    
})

describe('Delete /api/products/:id', () => {
    test('should check a valid ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-i')
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')

        expect(response.status).not.toBe(200)

    })

    test('should return a 404 response for a non-existent product', async () => {
        const response = await request(server).delete('/api/products/100')

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('El producto que desea eliminar no existe')
    })

    test('should deleted and existing product', async () => {
        const response = await request(server).delete('/api/products/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
})

