import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import isTouchDevice from "utils/isTouchDevice";


const SquareContainer = styled.div`
  border: 1px solid #888;
  width: 1vw;
  height: 1vw;
  background-color: ${({ color, active }) => (active ? color : "#fff")};
  box-sizing: border-box;
`;

const Square = ({ mainColor, dragging }) => {
  const [state, setState] = useState({
    active: false,
    color: "blue",
  });

  return (
    <SquareContainer
      onDragStart={(e) => e.preventDefault}
      onPointerDown={(e) => (e.button === 0 || isTouchDevice) && setState({ active: !state.active, color: mainColor })}
      onPointerEnter={() => dragging && setState({ active: true, color: mainColor })}
      active={state.active}
      color={state.color}
    />
  );
};

Square.propTypes = {
  mainColor: PropTypes.string,
  dragging: PropTypes.bool
};

export default Square;
