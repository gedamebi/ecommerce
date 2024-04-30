
import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount';

function ItemDetail ({ producto }) {

    return (
        <>
            <h2 className='nameProduct'>{producto.name}</h2>
            <img alt={producto.name} src={producto.img} className='imgProduct' />
            <br />
            <p className='priceProduct'>Precio: $ {producto.price}</p>
            <ItemCount stock={producto.stock}  />
            <p className='detailProduct'>{producto.detalle}</p>
        </>
    )
}

export default ItemDetail

