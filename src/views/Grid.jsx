import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: hidden;
`;

const SquareContainer = styled.div`
  border: 1px solid #888;
  width: 1vw;
  height: 1vw;
  background-color: ${({ color, active }) => active ? 'pink' : '#fff'};
`;

const Square = () => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(() => !active);
    }

    return (
        <SquareContainer onMouseDown={() => console.log('mousedown')} onDragLeave={() => console.log("we're leaving")} onDragOver={() => console.log('onDragOver')} onClick={handleClick} active={active}/>
    )
}


const Grid = (props) => {
    const [dragging, setDragging] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    totalSquares:
      Math.floor(100 * (window.innerWidth / window.innerHeight)) * 100,
  });

  useEffect(() => {
    calculateTotalSquares();
    window.addEventListener("resize", calculateTotalSquares);

    return () => window.removeEventListener("resize", calculateTotalSquares);
  }, []);

  const calculateTotalSquares = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (newWidth !== dimensions.width && newHeight === dimensions.height) {
      const newRatio = newHeight / newWidth;
      const newTotalRows = Math.floor(100 * newRatio);
      const newTotalSquares = newTotalRows * 100;
      setDimensions({
        width: newWidth,
        height: newHeight,
        totalSquares: newTotalSquares,
      });
    }
  };

  return (
    <Container>
      {[...Array(dimensions.totalSquares)].map((item, i) => (
        <Square key={i} />
      ))}
    </Container>
  );
};

Grid.propTypes = {};

export default Grid;
