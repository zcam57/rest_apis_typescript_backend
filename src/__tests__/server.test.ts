import  request  from 'supertest'
import server, { connectDB } from '../server'
import db from '../config/db'

jest.mock('../config/db')

describe('connectDB', () => {

    test('should handle database connection errors', async () =>{
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Hubo un error al conectar la DB'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error al conectarse a la base de datos'))
    })
})