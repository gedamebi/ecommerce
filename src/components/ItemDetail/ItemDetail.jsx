
import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';
import { useCart } from '../../context/cartContext'
import { useNotification } from '../../notification/NotificationService'

function ItemDetail ({ producto }) {

    const { addToCart } = useCart()
    const { setNotification } = useNotification()

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            producto, quantity
        }
        addToCart(productToAdd)
        setNotification('success',`Se agrego ${producto.name} al carrito!`,"bottom-right" , 2000)
    }

    return (
        <>
            <h2 className='nameProduct'>{producto.name}</h2>
            <img alt={producto.name} src={producto.img} className='imgProduct' />
            <br />
            <p className='priceProduct'>Precio: $ {producto.price}</p>
            <ItemCount onAdd={handleOnAdd} stock={producto.stock}  />
            <p className='detailProduct'>{producto.detalle}</p>
        </>
    )
}

export default ItemDetail

