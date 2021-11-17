
const dataProduct = require('../utils/product')

/*const data = require('../models/product') // Leer los datos del array con todos los productos.
console.log(data); // lee el array de datos*/

const getProduct = async (req,res) => {
    console.log("*******************");
    console.log(req.params);

    // Consulta 
    // Los datos
    // del producto correspondiente
    // ...
    // ...
    let data;
    if(req.params.id){
        data = await dataProduct.getProductById(req.params.id)
        res.render('product', {products:[data]}) 
    } else{
        data = await dataProduct.getAllProducts()
        res.render('product',{products:data}) 
    }
}

const createProduct = async (req,res) => {
    console.log("***************");
    // Se guardaran cosas en la BBDD
    console.log(req.body); // En req.body esta el objeto a guardar
    const result = await dataProduct.createProduct(req.body)
    console.log("Producto creado!! ***")
    console.log(result)
    res.status(201).json(result);
}

const product = {
    getProduct,
    createProduct
}
module.exports = product;