
import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../context/cartContext'
import { useNotification } from '../../notification/NotificationService'
import {Link} from 'react-router-dom'

const ItemDetail = ({ producto }) => {

    const { addToCart, isInCart } = useCart()
    const { setNotification } = useNotification()

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            producto, quantity
        }
        addToCart(productToAdd)
        setNotification('success',`Se agrego ${producto.name} al carrito!`,'bottom-right' , 2000)
    }

    return (
        <>
            <h2 className='nameProduct'>{producto.name}</h2>
            <img alt={producto.name} src={producto.img} className='imgProduct' />
            <br />
            <p className='priceProduct'>Precio: $ {producto.price}</p>
            {(!isInCart(producto.id) &&(producto.stock !== 0))&&
                <ItemCount onAdd={handleOnAdd} stock={producto.stock}  />
            }
            {
                (isInCart(producto.id) &&( producto.stock !== 0))&&
                (
                    <Link className='StyleButton m-1 ' to='/cart'>Terminar compra</Link>
                ) 
            }
            {
                (producto.stock === 0)&&
                    <span className='p-2 mb-2 bg-danger text-white'>Sin Stock</span>
            }
            <p className='detailProduct'>{producto.detalle}</p>
        </>
    )
}

export default ItemDetail

