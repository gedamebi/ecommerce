import { useCart } from '../../context/Cart/cartContext'
import CartItem from '../CartItem/CartItem'
import {Link} from 'react-router-dom'
import './Cart.css'

const Cart = () => {
    const { cart , removeItem, getTotal } = useCart()

    return (
        <div className='container mt-5 mb-5 '>
            {cart.map(product => (
                <div key={product.producto.id} className='d-flex justify-content-center row mt-3'>
                    <CartItem product={product} onRemove={removeItem}/>
                </div> 
            ))}
            {
                cart.length === 0 ?(
                    <h4>No hay productos en el carrito</h4>
                ) : (
                    <div>
                        <p className='total'><b>TOTAL: $ {getTotal()}</b></p>
                        <Link className='btn btn-outline-info w-50 m-3 btnCheckout' to='/CheckoutForm'>Checkout</Link>
                    </div>
                )
            }             
        </div>
    )
}

export default Cart