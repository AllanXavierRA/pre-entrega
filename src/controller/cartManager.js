const fs = require('fs');

class CartManager{

    ruta;

    constructor(ruta){
        this.ruta = ruta;
    }

    async getCart(){
        try{
            const cart = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(cart)
        }catch(error){
            return error
        }
    }

    async idIncrement(){
        let cart = await this.getCart(); 
        
        try{
            return cart.length + 1;
        } catch (error) {
            console.log(error);
        }
    }

    async validadorID(id){
        const cart = await this.getCart();
        try {
            const filteredCart = cart.filter( carrito => {
                return carrito.id === id
            })
            
            if(filteredCart.length !== 0){
                return true
            }else{
                return false
            }
        } catch (error) {
            return error
        }
    }

    async addCart(productos){
        const cart = await this.getCart();
        const increment = await this.idIncrement();
        const validador = await this.validadorID(1); 

        const ultimoCarrito = cart.length;
        const ultimoIdCarrito = cart[ultimoCarrito -1].id; 

        if(validador){
            try {
                cart.push({id: increment, productos});
                await fs.promises.writeFile(this.ruta, JSON.stringify(cart))
            } catch (error) {
                console.log(error);
                return error
            }
        }else{
            
            try {
                cart.push({id: ultimoIdCarrito + 1, productos});
                await fs.promises.writeFile(this.ruta, JSON.stringify(cart))
            } catch (error) {
                console.log(error);
                return error
            }
        }

    }

    async getProductsByCart(idCart){
        const cart = await this.getCart();
        const cartById = cart.find(cart => {
            return cart.id === idCart
        })


        console.log
        if(cartById){
            return cartById.products;
        }else{
            console.log('Not Found Cart');
            return 'Not Found Cart'
        }
    }

    async addProductToCart(idCart, idProduct){
        const cart = await this.getCart();
        const cartById = cart.find(cart => {
            return cart.id === idCart
        }) 


        if(cartById){
            cartById.products.push(idProduct);
            const position = cart.findIndex( carrito => carrito.id === idCart);
            if(position >= 0){
                cart.splice(position, 1, cartById)
                await fs.promises.writeFile(this.ruta, JSON.stringify(cart))
            }else{
                console.log(`error en la posicion del carrito`);
            }
        }else{
            console.log(`Not found Cart`);
            return 'Not found Cart'
        }

        
        
    }

    
}


// const carrito = new CartManager('../../cart.json');

// let productos = [1, 2, 3, 4 ,5]

// carrito.getCart();
// carrito.addCart(productos);
// carrito.getProductsByCart(2);

// carrito.addProductToCart(1312312, 2);


module.exports = CartManager;
