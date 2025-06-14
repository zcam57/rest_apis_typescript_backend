import swaggerJSDoc from "swagger-jsdoc";

const option : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.JS / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for products management'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(option)
export default swaggerSpec
