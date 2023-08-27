import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-10 py-12">
        <h1 className="text-xl">Home</h1>
      </div>
    </>
  );
};

export default Home;
