import { BsCart } from '../../../node_modules/react-icons/bs'; 


const CartWidget = () => {

    let contadorCarrito = 0
    
    return(
        <div>
            <button style={{
                        backgroundColor: 'grey', 
                        marginLeft: '6px'
                    }}
            >
                <BsCart />
                <span style={{marginLeft: '6px'}}>{contadorCarrito}</span>
            </button>
        </div>
    )
}

export default CartWidget