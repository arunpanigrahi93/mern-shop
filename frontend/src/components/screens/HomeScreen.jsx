import React, { Suspense } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../Loader";

// Lazy load components
const Product = React.lazy(() => import("../product"));
const Message = React.lazy(() => import("../../components/message"));
const Paginate = React.lazy(() => import("../Paginate"));
const ProductCarousel = React.lazy(() => import("../ProductCarousel"));

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Suspense fallback={<Loader />}>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to="/" className="btn btn-light mb-4">
            Go Back
          </Link>
        )}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <h1>Latest Products</h1>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Suspense>
    </>
  );
};

export default HomeScreen;
