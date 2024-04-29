import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

import { useNavigate } from "react-router-dom"

function Item ({ producto }) {

    const navigate = useNavigate()

    const handleLink = (id)=>{
        navigate(`/item/${id}`)
    }

    return (
        <Col lg={3} style={{ marginBottom: '25px' }} >
            <Card className="h-100" style={{ width: '18 rem' }}>
                <Card.Img variant='top' src={producto.img} />
                <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>Precio: ${producto.price}</Card.Text>
                    <Button variant='primary' onClick={()=> handleLink(producto.id)}>Ver detalle</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item