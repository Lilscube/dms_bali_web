import { Container, Row, Col, Carousel } from "react-bootstrap";
import imgVilla1 from "../assets/images/villa1.jpg";
import imgVilla2 from "../assets/images/villa2.jpg";
import imgVilla3 from "../assets/images/villa3.jpg";

const cardsData = [
    {
        img: imgVilla1,
        title: "Building the Future with Structural Excellence",
        description: "We deliver innovative solutions in design and construction, ensuring every building reflects reliability, efficiency, and captivating aesthetics.",
        imagePosition: "left"
    },
    {
        img: imgVilla1,
        title: "Strong Foundations for Generations to Come",
        description: "With cutting-edge technology and high-quality materials, we create durable and eco-friendly structures to meet today's and tomorrow's needs.",
        imagePosition: "right"
    },
    {
        img: imgVilla1,
        title: "Bringing Your Architectural Vision to Life",
        description: "Our expert team is dedicated to transforming your ideas into reality, blending creative design with top-notch construction standards.",
        imagePosition: "left"
    },
    {
        img: imgVilla1,
        title: "Connecting Spaces with Life",
        description: "We build more than just structures—we create spaces that enhance activity, productivity, and everyday comfort.",
        imagePosition: "right"
    }
];

const sliderImages = [imgVilla1, imgVilla2, imgVilla3];

const HomePage = () => {
    return (
        <Container className="mt-5">
            {/* Slider Section */}
            <Carousel className="mb-4">
                {sliderImages.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img
                            src={image}
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                            className="d-block w-100 rounded shadow"
                            alt={`Slide ${index + 1}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* About Section */}
            <h2 className="fw-bold text-center mb-4">About DMS Bali</h2>
            {cardsData.map((card, index) => (
                <Row
                    key={index}
                    className={`mb-4 align-items-center ${
                        card.imagePosition === "right" ? "flex-row-reverse" : ""
                    }`}
                >
                    <Col md={5}>
                        <img
                            src={card.img}
                            alt={card.title}
                            className="img-fluid rounded shadow"
                        />
                    </Col>
                    <Col md={7}>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </Col>
                </Row>
            ))}
            <hr className="mt-5 mb-5" />
        </Container>
    );
};

export default HomePage;
