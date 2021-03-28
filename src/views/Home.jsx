import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100vw;

  @media only screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Button = styled.button`
  height: 50vh;
  width: 100vw;
  background-color: #000;
  color: #fff;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("${({ bgi }) => bgi}");
  background-position: center center;
  background-size: cover;
  font-size: 2.5rem;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    width: 30vw;
  }

`;

const Home = () => {
  return (
    <Container>
      <Link to="/grid">
        <Button
          bgi={
            "https://images.pexels.com/photos/6858611/pexels-photo-6858611.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        >
          Grid
        </Button>
      </Link>
      <Link to="/music-searcher">
        <Button
          bgi={
            "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        >
          Music Searcher
        </Button>
      </Link>
    </Container>
  );
};

export default Home;
