const express = require('express');
const app = express();
const productRoute = require('./routes/product');
const cartRoute = require('./routes/carts')


app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute)


app.listen(8080, () => {
    console.log(`Server runing in port 8080`);
})