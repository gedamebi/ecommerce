import { BsCart } from '../../../node_modules/react-icons/bs'
import './CartWidget.css'
import { useCart } from '../../context/cartContext'

const CartWidget = () => {

    const { cart } = useCart()

    return(
        <div>
            <button className='buttonCartWidget'>
                <BsCart />
                <span className='counterCartWidget'>{cart.length}</span>
            </button>
        </div>
    )
}

export default CartWidget