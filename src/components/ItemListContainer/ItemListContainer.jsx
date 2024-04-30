import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ItemList from '../ItemList/ItemList'

import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

function ItemListContainer () {

    const [productos, setProductos] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {
        fetch('https://www.macrum.com.uy/api/producto.php')
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al cargar los datos');
          }
          return response.json();
        })
        .then(data => {
          // Filtro en el array de productos solo los que estan en la categoria seleccionada
          // Use el ID 0 como codigo para mostrar todos los productos sin filtrar 
          if (categoryId != 0){
            data = data.filter(item => item.categoryId == categoryId);
          }
          setProductos(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  
    }, [ categoryId ])

    return(
        <Container fluid>
            <Row style={{marginTop: "20px"}}>
                <ItemList productos={productos} />
            </Row>
        </Container>
    )
}

export default ItemListContainer