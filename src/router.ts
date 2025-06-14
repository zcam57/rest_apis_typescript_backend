import { handleInputErrors } from './middleware/index';
import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, updateAvailability } from "./handlers/product"
import { body, param } from "express-validator"

const router = Router()

/**
* @swagger
* components:
*   schemas:
*       Product:
*           type: object
*           properties:
*               id:
*                   type: integer
*                   description: The Product ID
*                   example: 1
*               name:
*                   type: string
*                   description: The Product Name
*                   example: Teclado
*               price:
*                   type: number
*                   description: The Product price
*                   example: 200
*               availability:
*                   type: boolean
*                   description: The Product availability
*                   example: true
* 
*/


/**
* @swagger
*  /api/products:
*   get:
*       summary: Get a list of products
*       tags:
*           - Products
*       description: Returns a list of products
*       responses:
*           200:
*               description: success response
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Product'
*/
router.get("/", getProducts)





/**
* @swagger
* /api/products/{id}:
*   get:
*       summary: Get a Product by ID
*       tags:
*           - Products
*       description: Returns a Product based on the ID
*       parameters:
*         - in: path
*           name: id
*           description: The ID of the Product to retrieve
*           required: true
*           schema:
*               type: integer
*       responses:
*           200:
*               description: successful Response
*               content:
*                   application/json:
*                       schema:
*                            $ref: '#/components/schemas/Product'
*           404: 
*               description: Product not found
*           400:
*               description: Bad Request - Invalid ID
*/
router.get("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductById
)

/**
* @swagger
* /api/products/:
*   post:
*       summary: Create a new Product
*       tags:
*           - Products
*       description: Create a new record in the database
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           name:
*                               type: string 
*                               example: Teclado
*                           price:
*                               type: number
*                               example: 300
*       responses:
*           201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
*           404:
*               description: Bad Request - Invalid input
*/

router.post("/",
    body("name").notEmpty().withMessage("el nombre del producto es obligatorio"),
    body("price")
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("el precio del producto es obligatorio")
        .custom(value => value > 0).withMessage("Precio Invalido"),
    handleInputErrors, 
    createProduct 
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *     summary: Updted a product by ID
 *     tags:
 *         - Products
 *     description: Returns the Upadted Product
 *     parameters:
 *        - in: path
 *          name: id
 *          description: TheID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           name:
 *                               type: string
 *                               example: Teclado
 *                           price:
 *                               type: number
 *                               example: 300
 *                           availability:
 *                               type: boolean   
 *                               example: true
 *     responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product not found
 */

router.put("/:id", 
    param('id').isInt().withMessage('ID no valido'),
    body("name").notEmpty().withMessage("el nombre del producto es obligatorio"),
    body("price")
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("el precio del producto es obligatorio")
        .custom(value => value > 0).withMessage("Precio Invalido"),
    body("availability").isBoolean().withMessage("Valor invalido para la disponibilidad"),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Updated product availability
 *      tags:
 *          - Products 
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *           200:
 *               description: Succesful response
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schemas/Product'
 *           400:
 *              description: Bad Request - Invalid ID
 *           404:
 *              description: Product Not Found
 */

router.patch("/:id", 
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateAvailability)


/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *       summary: Delete a Product by ID
 *       tags:
 *           - Products
 *       description: Remove a Product from the database
 *       parameters:
 *         - in: path
 *           name: id
 *           description: The ID of the product to delete
 *           schema:
 *               type: integer
 *       responses:
 *            200:
 *                description: Succesful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: string
 *                            value: 'Producto eliminado correctamente'
 *            400:
 *               description: Bad Request - Invalid ID
 *            404:
 *               description: Product Not Found
 * 
 * 
 */
router.delete("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct
)

export default router