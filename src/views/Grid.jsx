import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Square, ColorPicker } from "../components";

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: hidden;
`;

const Grid = (props) => {
  console.log('render');
  const [dragging, setDragging] = useState(false);
  const [colorPicker, setColorPicker] = useState({
    color: "pink",
    show: false,
    x: 0,
    y: 0,
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
      console.log("entered context menu");
      setColorPicker({ show: true, x: e.x, y: e.y });
      return false;
    };

    return () => {
      window.removeEventListener("resize", calculateTotalSquares);
    };
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

  const handleDragging = (e, dragging) => {
    // if we pressed the left mouse button
    if (e.button === 0) {
      setDragging(dragging);
    }
  };

  const squaresCollection = useMemo(() => {
    return [...Array(dimensions.totalSquares)];
  }, [dimensions.totalSquares]);

  return (
    <Container
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={(e) => handleDragging(e, true)}
      onMouseUp={(e) => handleDragging(e, false)}
    >
      {squaresCollection.map((item, i) => (
        <Square dragging={dragging} mainColor={colorPicker.color} key={i} />
      ))}
      {colorPicker.show && (
        <ColorPicker
          selectMainColor={(color) =>
            setColorPicker({ show: false, color, x: 0, y: 0 })
          }
          x={colorPicker.x}
          y={colorPicker.y}
        />
      )}
    </Container>
  );
};

Grid.propTypes = {};

export default Grid;
