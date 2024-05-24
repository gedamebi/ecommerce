import { useState } from 'react'
import { useCart } from '../../context/Cart/cartContext'
import { useNotification } from '../../context/Notification/notificationContext'
import { createOrder } from '../../firebase/db'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import FadeLoader  from 'react-spinners/FadeLoader'
import { Timestamp } from 'firebase/firestore'

const CheckoutForm = () => {
    const { cart, getTotal, clearCart } = useCart()
    const navigate = useNavigate()
    const {setNotification} = useNotification()
    const [loading, setLoading] = useState(false)

    const userData = {
        nombre: '',
        apellido:'',
        celular:'',
        mail:'',
        direccion:'',
        codigoPostal:''
    }
    
    const [ user , setUser] = useState(userData)

    const crearOrden = async() => {
        try {
            setLoading(true)
            const objOrder = {
                buyer: user,
                items: cart,
                total: getTotal(),
                createdAt: Timestamp.now()
            }
    
            const {orderAdded , outOfStock } = await createOrder(objOrder)  
            if(orderAdded){

                let resumenHtml = '';
                objOrder.items.forEach(item => {
                    const producto = item.producto;
                    resumenHtml += `
                        <div style='border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;'>
                        <p>Producto: ${producto.name}</p>
                        <p>Precio unitario: $${producto.price}</p>
                        <p><img src='${producto.img}' alt='${producto.name}' style='width: 100px; height: auto;'></p>
                        <p>Detalle: ${producto.detalle}</p>
                        <p>Cantidad: ${item.quantity}</p>
                        </div>
                    `
                })

                const dataMail ={
                    message: resumenHtml, 
                    user_nombre: objOrder.buyer.nombre, 
                    user_order: orderAdded.id,
                    user_email: objOrder.buyer.mail,
                    user_getTotal: objOrder.total
                }

                emailjs.send(
                    import.meta.env.VITE_EMAIL_SERVICE_ID, 
                    import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                    dataMail, 
                    import.meta.env.VITE_EMAIL_USER_ID)
                .then((result) => {
                    setNotification('success',`Se envio correo con su ID de compra ${orderAdded.id}`,'bottom-right',4000)
                })
                .catch( (error) => {
                      setNotification('error',`No se pudo enviar el mail debido a un error ${error.text}`,'bottom-right',3000)
                  })

                clearCart()
                setTimeout(()=>{
                    setLoading(false)
                    navigate('/')
                },6000)
            }else{
                setNotification('error',`No hay stock de productos ${outOfStock.map(prod => prod.name)}`,'bottom-right',3000)
            }
        } catch (error) {
            setNotification('error',`Error sistema ${error}`,'bottom-right',3000)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        crearOrden()
    }


    return (
        <>
            {loading ? (
                <div className='sweet-loading'>
                    <FadeLoader
                    color='#0d6efd'
                    height={30}
                    margin={10}
                    radius={100}
                    width={6}
                    className='spinner'
                    speedMultiplier={2}
                    />
                </div>
            ) : (
                <form className='d-flex p-2 flex-column align-items-center align-content-center g-3' onSubmit={handleSubmit}>
                    <div className='col-md-3'>
                        <label htmlFor='validationCustom01' className='form-label'>Nombre</label>
                        <input type='text' className='form-control' id='validationCustom01' value={user.nombre} onChange={(e)=>setUser({...user,nombre: e.target.value})} required></input>
                        <div className='valid-feedback'>
                        ¡Se ve bien!
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='validationCustom02' className='form-label'>Apellido</label>
                        <input type='text' className='form-control' id='validationCustom02' value={user.apellido} onChange={(e)=>setUser({...user, apellido: e.target.value})} required></input>
                        <div className='valid-feedback'>
                        ¡Se ve bien!
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='validationCustom02' className='form-label'>Celular</label>
                        <input type='number'  className='form-control' id='validationCustom02' value={user.celular} onChange={(e)=>setUser({...user, celular: e.target.value})} required></input>
                        <div className='valid-feedback'>
                        ¡Se ve bien!
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='exampleInputEmail1' className='form-label'>Mail</label>
                        <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' value={user.mail} onChange={(e)=>setUser({...user, mail: e.target.value})} required></input>
                        <div id='emailHelp' className='form-text'>Nunca compartiremos su correo electrónico con nadie más.</div>
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='validationCustom03' className='form-label'>Direccion</label>
                        <input type='text' className='form-control' id='validationCustom03' value={user.direccion} onChange={(e)=>setUser({...user, direccion: e.target.value})} required></input>
                        <div className='invalid-feedback'>
                        Proporciona una ciudad válida.
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <label htmlFor='validationCustom05' className='form-label'>Código postal</label>
                        <input type='text' className='form-control' id='validationCustom05' value={user.codigoPostal} onChange={(e)=>setUser({...user, codigoPostal: e.target.value})} required></input>
                        <div className='invalid-feedback'>
                        Proporciona un código postal válido.
                        </div>
                    </div>
                    <div className='col-12 p-4'>
                        <button type='submit' className='btn btn-primary'>Generar Orden</button>
                    </div> 
                </form>
            )}
        </>
    )
}

export default CheckoutForm