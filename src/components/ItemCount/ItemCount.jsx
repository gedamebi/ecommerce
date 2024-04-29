import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1})=> {
   const [quantity, setQuantity] = useState(initial)

   const increment = () => {
       if(quantity < stock) {
           setQuantity(quantity+1)
       }
   }

   const decrement = () => {
       if(quantity > 1) {
           setQuantity(quantity - 1)
       }     
   }

   return(
       <div className='Counter'>          
            <div className='Controls'>
                <button className="StyleButton" onClick={decrement}>-</button>
                <p className='Number'>{quantity}</p>
                <button className="StyleButton" onClick={increment}>+</button>
            </div>
            <div>
                <br></br>
                <button className="buy--btn" onClick={() => onAdd(quantity)}>Agregar al carrito</button>
                <br></br>
            </div>
       </div>
   )

}
export default ItemCount