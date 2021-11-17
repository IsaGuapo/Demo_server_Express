const express = require('express')
const product = require('./controllers/product')

const app = express()
const port = 3000

/*********Funcion para validar si la apikey es valida-- MIDDLEWARE */
//// http://localhost:3000/things/pepe/5?API_KEY=hola123// le estamos diciendo que tiene que ser escrito asi estrictamente.
//Debe haber documentacion para que se sepa como funciona//
function hasApiKey(req,res,next){
  if(req.query.API_KEY && req.query.API_KEY=="hola123"){
    next();
  }
  else {
    const data = {
      message:"API KEY no válida o inexistente",
      error:403
    }
    res.status(403).render("error",{data});
  }
}

// Hace que todas las rutas necesiten apikey. Comprueba la API KEY. Middleware-- Lo dejamos comentado para que no nos interfiera en el desarrollo//
//app.use(hasApiKey) 

// Para habilitar envio de JSON al servidor. Sin esto no podemos hacer POST
app.use(express.json()) 

app.set('view engine', 'pug');
app.set('views','./views');

//*********** RUTAS ***************/
app.get('/', (req, res) => {
  res.send('Mi home de productos')
})

// http://localhost:3000/products/5
// http://localhost:3000/products/3
// http://localhost:3000/products

// Poniendo hasApiKey, le pasamos como parametro que se valide la API KEY solo en este endpoint.
app.get('/products/:id?', product.getProduct);
app.post('/products', hasApiKey, product.createProduct); // solo postea quien tenga apikey

// http://localhost:3000/things/pepe/5
// http://localhost:3000/things/luis/6
// http://localhost:3000/products/3?age=3&location=madrid /**query params los que vienen despues de la ? que son (?age=3&location=madrid) */
app.get('/things/:name/:id', function(req, res) {
  console.log("*******************");
  console.log(req.params);
  console.log(req.query)
  res.send(`He recibido esto: --> id: ${req.params.id} and name:${req.params.name}
            Y de query params: ${req.query.age} ${req.query.location}
  ` );
});

/******************* PRIMERA PLANTILLA ***************** */
app.get('/first_template', function(req, res){
    const number =  Math.floor(Math.random() * (7 - 1) + 1);
    res.render('first_view',{name:"Alex",number});
});

//*********Manejo de errores PAGINA 404*********************//
//Capture All 404 errors
// http://localhost:3000/products=3?API_KEY=hola123
app.use(function (req,res,next){
  const data = {
    message:"Error! 404 not found",
    error: 404
  }
  res.status(404).render('error',{data});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})