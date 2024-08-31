import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className="carousel-content">
            <div className="carousel-image-wrapper">
              <Image
                src={product.image}
                alt={product.name}
                className="carousel-image"
              />
            </div>
            <div className="carousel-text-wrapper">
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none"
              >
                <Carousel.Caption className="carousel-caption">
                  <h2 className="text-white text-right">
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
