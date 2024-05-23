//import "./Cart.css"
import {Link} from 'react-router-dom'
import { useNotification } from '../../notification/NotificationService'

const CartItem = ({ product, onRemove}) => {

    const { queryNotification, setNotification} = useNotification()
    
    const handRemove = () => {
        queryNotification(`Quieres eliminar ${product.producto.name} del carrito?`, "","warning")
        .then((result) => {
            if(result.isConfirmed){
                onRemove(product.producto.id)
                setNotification("info",`Se elimino ${product.producto.name} del carrito`,"bottom-right",1000)
            }
        })
        .catch(error =>{
            setNotification("error",`Error sistema ${error}`,"bottom-right",3000)
        })  
    }

    return (
        <div className="col-md-10 sombra" >
            <div className="row p-2 bg-white border border-info rounded  ">
                <div className="col-md-3 mt-1">
                    <img className="img-fluid img-responsive rounded product-image w-75" alt="Imagen" src={product.producto.img}></img>
                </div>
                <div className="col-md-6 mt-1">
                    <h5>{product.producto.name}</h5>
                </div>
                <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div className="d-flex flex-column align-items-center mt-4">
                        <h5 className="mr-1">Precio unitario: $ {product.producto.price}</h5>
                        <h5 className="mr-1">Cantidad: {product.quantity}</h5>
                        <h4 className="mr-1">SubTotal: $ {product.quantity*product.producto.price}</h4>
                    </div>
                    <div className="d-flex flex-column mt-4">
                        <Link className='btn btn-primary btn-sm' to={`/item/${product.producto.id}`}>Detalles</Link>
                        <button className="btn btn-outline-danger btn-sm mt-2" onClick={handRemove} type="button">Eliminar producto</button>
                    </div>
                </div>
            </div>  
        </div>
        )
}

export default CartItem