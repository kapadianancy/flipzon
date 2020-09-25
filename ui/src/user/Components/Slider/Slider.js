import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../../images/slide-1.jpg';
import slide2 from '../../../images/slide-2.jpg';
import slide3 from '../../../images/slide-3.jpg';
 
const Slider = () => {
    const style={
        height:"350px"
    }
    return (
        <div>
            <Carousel style={{margin:"auto",width:"100%"}}>
            <Carousel.Item>
                <img style={style}
                className="d-block w-100"
                src={slide2}
                alt="First slide"
                />
                {/* <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img style={style}
                className="d-block w-100"
                src={slide3}
                alt="Third slide"
                />

                
            </Carousel.Item>
            <Carousel.Item>
                <img style={style}
                className="d-block w-100"
                src={slide1}
                alt="Third slide"
                />

                
            </Carousel.Item>
        </Carousel>
        </div>
    );
}
 

 
export default Slider;