import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Square, ColorPicker } from '../components';

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: hidden;
`;

const Grid = (props) => {
    const [colorPicker, setColorPicker] = useState({
      color: "pink",
      show: false,
      x: 0,
      y: 0
    });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    totalSquares:
      Math.floor(100 * (window.innerWidth / window.innerHeight)) * 100,
  });

  useEffect(() => {
    calculateTotalSquares();
    window.addEventListener("resize", calculateTotalSquares);

    window.oncontextmenu = (e) => {
      setColorPicker({ show: true, x: e.x, y: e.y });
      return false;
    }

    return () => {
      window.removeEventListener("resize", calculateTotalSquares);
    }
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

  const handleMouseOut = () => {
    setColorPicker({ show: false, x: 0, y:0 });
  }

  const selectMainColor = (color) => {
    setColorPicker({ show: false, color, x: 0, y: 0 });
  }


  return (
    <Container>
      {[...Array(dimensions.totalSquares)].map((item, i) => (
        <Square mainColor={colorPicker.color} key={i} />
      ))}
      {colorPicker.show && <ColorPicker selectMainColor={selectMainColor} onMouseOut={handleMouseOut} x={colorPicker.x} y={colorPicker.y} />}
    </Container>
  );
};

Grid.propTypes = {};

export default Grid;
