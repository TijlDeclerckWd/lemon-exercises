import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const ColorPickerContainer = styled.div`
    position: absolute;
    left: ${({ left }) => left}px;
    top: ${({ top }) => top}px;
    transform: translate(-50%, 0);
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20vw;
    height: 4vw;
    border-radius: 10px;
    z-index: 5;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 0 0.5rem;
`

const Color = styled.div`
    width: 3vw;
    height: 3vw;
    background-color: ${({ color }) => color};
`

const ColorPicker = ({ x, y, selectMainColor}) => {
    return (
        <ColorPickerContainer left={x} top={y}>
            <Color color="yellow" onClick={() => selectMainColor('yellow')} />
            <Color color="blue" onClick={() => selectMainColor('blue')} />
            <Color color="pink" onClick={() => selectMainColor('pink')} />
            <Color color="green" onClick={() => selectMainColor('green')} />
            <Color color="red" onClick={() => selectMainColor('red')} />
        </ColorPickerContainer>
    )
}

ColorPicker.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    selectMainColor: PropTypes.func
}

export default ColorPicker
