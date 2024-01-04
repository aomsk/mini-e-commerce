import React from "react";
import "../styles/Home.css";
import CarouselImage from "../components/CarouselImage";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  slug: string;
  image: null;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProductsData();
  }, []);

  const getProductsData = async () => {
    await axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        console.log(response.data.products);
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container">
        <div className="home_container">
          <CarouselImage />
          <h2>All Products we have!!!</h2>
          {products.map((product) => {
            return (
              <div key={product.product_id}>
                <h1>{product.name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
