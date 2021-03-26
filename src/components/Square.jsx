import React, { useState } from "react";
import styled from "styled-components";

const SquareContainer = styled.div`
  border: 1px solid #888;
  width: 1vw;
  height: 1vw;
  background-color: ${({ color, active }) => (active ? color : "#fff")};
`;

const Square = ({ mainColor, dragging }) => {
  const [state, setState] = useState({
    active: false,
    color: "pink",
  });

  return (
    <SquareContainer
      onDragStart={(e) => e.preventDefault}
      onMouseEnter={() => dragging && setState({ active: true, color: mainColor })}
      onMouseDown={(e) => e.button === 0 && setState({ active: !state.active, color: mainColor })}
      active={state.active}
      color={state.color}
    />
  );
};

export default Square;
