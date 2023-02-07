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

    async addCart(productos){
        const cart = await this.getCart();
        let increment = await this.idIncrement();

        try {
            cart.push({id: increment, productos});
            await fs.promises.writeFile(this.ruta, JSON.stringify(cart))
        } catch (error) {
            console.log(error);
            return error
        }

    }

    async getProductsByCart(idCart){
        const cart = await this.getCart();
        const cartById = cart.find(cart => {
            return cart.id === id
        })
    }

    
}


const carrito = new CartManager('../../cart.json');

// let productos = [1, 2, 3, 4 ,5]

// carrito.getCart();
// carrito.addCart(productos);
carrito.getProductsByCart(1);


module.exports = CartManager;
