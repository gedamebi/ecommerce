
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ItemDetail from '../ItemDetail/ItemDetail'
import FadeLoader  from "react-spinners/FadeLoader";
import { getItem } from '../../firebase/db'

function ItemDetailContainer () {

    const [producto, setProducto] = useState([])
    const [loading, setLoading] = useState(true)
    const { itemId } = useParams()

    useEffect(() => {
      const getItemDB = async () => {
        let data = await getItem(itemId)
        data.id = itemId
        setProducto(data)
        setLoading(false)
      }
      getItemDB()
    }, [ itemId ])

    return (
        <>
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
          <ItemDetail producto={producto} />
        )}
        </>
    )
}

export default ItemDetailContainer