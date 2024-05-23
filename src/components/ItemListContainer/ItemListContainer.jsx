import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ItemList from '../ItemList/ItemList'
import FadeLoader  from "react-spinners/FadeLoader";

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getItems } from '../../firebase/db'

import './ItemListContainer.css'

function ItemListContainer () {


    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()

    useEffect(() => {

      const getItemsDB = async () => {
        let data = await getItems()
        // Filtro en el array de productos solo los que estan en la categoria seleccionada
        // Use el ID 0 como codigo para mostrar todos los productos sin filtrar 
        if (categoryId != 'eRtFyECNlLxg6VsYTMYm'){
          data = data.filter(item => item.categoryId == categoryId);
        }
        setProductos(data)
        setLoading(false)
      }

      getItemsDB()
    }, [ categoryId ])

    return(
        <Container fluid>
          {loading ? (
             <div className="sweet-loading">
              <FadeLoader
                color="#0d6efd"
                height={30}
                margin={10}
                radius={100}
                width={6}
                className="spinner"
                speedMultiplier={2}
              />
            </div>
           
          ) : (
            <Row style={{marginTop: "20px"}}>
                <ItemList productos={productos} />
            </Row>
          )}
            
        </Container>
    )
}

export default ItemListContainer