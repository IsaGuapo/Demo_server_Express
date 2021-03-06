//***********creamos este MODULO AUXILIAR para crear productos con un fetch**********

const fetch = require('node-fetch')

//Funcion para hacer peticion a la api UN SOLO PRODUCTO POR ID  de fakestore
const getProductById = async (id) => {
    const data = await fetch('https://fakestoreapi.com/products/'+id)
    const product = await data.json()
    console.log(product)
    return product
}

//Funcion para hacer peticion a la api TODOS LOS PRODUCTOS de fakestore
const getAllProducts = async () => {

   const data = await fetch('https://fakestoreapi.com/products')
   const products = await data.json()
   console.log(products)
   return products
}


//Funcion para crear un producto
const createProduct = async (product) => {
    const data = await fetch('https://fakestoreapi.com/products',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(product)
        })
        const res = await data.json()
        return res
}

const product = {
    getProductById,
    getAllProducts,
    createProduct
}
module.exports = product;


// PRUEBAS PARA VER QUE SI FUNCIONAN
//opcion para imprimir en pantalla todos los productos.
/*getAllProducts()
.then(data=>console.log(data))
*/

// para imprimir un solo producto
/*
getProductById(2)
.then(data=>console.log(data))
*/
/*
const newProduct = {

        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
}

createProduct(newProduct).then(data=>console.log(data)) */