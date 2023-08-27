import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import CarouselImage from "../components/CarouselImage";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="home_container">
          <CarouselImage />
          <h2>All Products we have!!!</h2>
        </div>
      </div>
    </>
  );
};

export default Home;
