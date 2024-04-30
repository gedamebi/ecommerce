import { BsCart } from '../../../node_modules/react-icons/bs'; 
import './CartWidget.css';


const CartWidget = () => {

    let contadorCarrito = 0
    
    return(
        <div>
            <button className='buttonCartWidget'>
                <BsCart />
                <span className='counterCartWidget'>{contadorCarrito}</span>
            </button>
        </div>
    )
}

export default CartWidget