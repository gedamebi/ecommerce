import Carousel from '../Carousel/Carousel';

const Home = () => {
    return(
        <div style={{marginTop:'25px'}}>
            <Carousel />
            <h1 style={{ marginTop: '25px'}}>Bienvenido a Macrum S.R.L</h1>
            <p style={{marginTop: '30px', textAlign: 'left'}}>Gracias por visitar nuestro nuevo sitio web, aqu&iacute; podr&aacute;n enterarse sobre novedades vinculadas a nuestra tarea.</p>
            <p style={{textAlign: 'left'}}>Sabr&aacute;n sobre nuestros trabajos, los servicios que brindamos y productos por los que trabajamos habitualmente.</p>
            <p style={{textAlign: 'left'}}>De a poco iremos actualizando nuestro sitio, publicando informaci&oacute;n actualizadas de interes, catalogos y hojas tecnicas sobre productos que trabajamos y consultas frecuentes que recibamos.</p>
        </div>
    )
}

export default Home