import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";

import { Square, ColorPicker } from "components";
import useEventListener from 'services/hooks/useEventListener';

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  overflow: hidden;
`;

const Grid = () => {
  // we pass this state to the squares to let them know whether a mouseenter event will lead to the square being colored
  const [dragging, setDragging] = useState(false);
  const [colorPicker, setColorPicker] = useState({
    color: "red",
    show: false,
    x: 0,
    y: 0,
  });
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    totalSquares:
      Math.floor(100 * (window.innerHeight / window.innerWidth)) * 100,
  });

  const handleDragging = useCallback((e, dragging) => {
    // if we pressed the left mouse button
    if (e.button === 0) {
      setDragging(dragging);
    }
  }, []);

  const calculateTotalSquares = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
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

  // whenever the colorpicker is too close to the border we will display it in the middle of the screen instead of
  // right below where the person clicked
  const tooCloseToBorderCheck = (x, y) => {
    const xRatio =  x / dimensions.width;
    const yRatio = y / dimensions.height;
    
    // is it 10% near the borders? display the colorpicker in the center instead
    const tooClose = xRatio < 0.10 || xRatio > 0.90 || yRatio > 0.90;
    
    return tooClose ? [dimensions.width / 2, dimensions.height / 2] : [x, y];
  }

  const handleDisplayColorPicker = (e) => {
    const [x, y] = tooCloseToBorderCheck(e.x, e.y);
    setColorPicker({ show: true, x, y });
  } 

  // whenever the window resizes we recalculate the amount of squares we need;
  useEventListener('resize', calculateTotalSquares);
  // whenever we press down and move the mouse, a mouseenter event in one of the squares will lead
  // to that square being filled with the current selected color
  useEventListener('mousedown', (e) => handleDragging(e, true));
  useEventListener('mouseup', (e) => handleDragging(e, false));

  // whenever we right click we display the colorpicker and we disable the default display of the contextmenu
  useEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleDisplayColorPicker(e);
  });

  // on initiation we calculate how many squares we need to fill the screen
  useEffect(() => {
    calculateTotalSquares();
  }, []);

  const squaresCollection = useMemo(() => {
    return [...Array(dimensions.totalSquares)];
  }, [dimensions.totalSquares]);

  return (
    <Container onDragStart={(e) => e.preventDefault()}>
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

export default Grid;
