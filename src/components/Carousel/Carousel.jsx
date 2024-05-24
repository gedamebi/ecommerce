import Carousel from 'react-bootstrap/Carousel'

const CarouselHome = () => {
  return (
    <Carousel data-bs-theme='dark'>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='./assets/slider-1.jpg'
          alt='First slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='./assets/slider-2.jpg'
          alt='Second slide'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src='./assets/slider-3.jpg'
          alt='Third slide'
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default CarouselHome