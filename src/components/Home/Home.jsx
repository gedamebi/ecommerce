import Carousel from '../Carousel/Carousel';
import './Home.css';

const Home = () => {
    return(
        <div>
            <Carousel />
            <h1>Bienvenido a Macrum S.R.L</h1>
            <p className='primerParrafo'>Gracias por visitar nuestro nuevo sitio web, aqu&iacute; podr&aacute;n enterarse sobre novedades vinculadas a nuestra tarea.</p>
            <p>Sabr&aacute;n sobre nuestros trabajos, los servicios que brindamos y productos por los que trabajamos habitualmente.</p>
            <p>De a poco iremos actualizando nuestro sitio, publicando informaci&oacute;n actualizadas de interes, catalogos y hojas tecnicas sobre productos que trabajamos y consultas frecuentes que recibamos.</p>
        </div>
    )
}

export default Home