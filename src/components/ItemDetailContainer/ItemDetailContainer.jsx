
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


import ItemDetail from '../ItemDetail/ItemDetail'

function ItemDetailContainer () {

    const [producto, setProducto] = useState([])

    const { itemId } = useParams()


    useEffect(() => {
        fetch(`https://www.macrum.com.uy/api/producto.php?id=${itemId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          return response.json();
        })
        .then(data => {
            setProducto(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    }, [ itemId ])

    return (
        <>
          <ItemDetail producto={producto} />
        </>
    )
}

export default ItemDetailContainer