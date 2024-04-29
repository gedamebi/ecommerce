
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ItemCount from '../ItemCount/ItemCount'

function ItemDetailContainer () {

    const [producto, setProducto] = useState([])

    const { itemId } = useParams()


    useEffect(() => {
        fetch(`http://localhost/api/producto.php?id=${itemId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          return response.json();
        })
        .then(data => {
            console.log(data);
            setProducto(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    }, [ itemId ])

    return (
        <>
            <h2 style={{ marginTop: "25px"}}>{producto.name}</h2>
            <img alt={producto.name} src={producto.img} style={{ marginTop: "25px"}} />
            <br />
            <p style={{ fontFamily : "sans-serif 18px", fontWeight : 'bold', color : "red", marginTop : '30px'}}>Precio: $ {producto.price}</p>
            <ItemCount stock={producto.stock}  />
            <p style={{ textAlign : 'left', marginTop : '30px'}}>{producto.detalle}</p>
        </>
    )
}

export default ItemDetailContainer