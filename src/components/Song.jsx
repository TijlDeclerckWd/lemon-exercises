import React, { Fragment } from "react";
import styled from "styled-components";

import { useLocation, Redirect, useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Container = styled.div`
  position: relative;
`;

const GoBack = styled(FaArrowLeft)`
  position: absolute;
  left: 0;
  top: 2vh;
  cursor: pointer;
`;

const Image = styled.img`
  width: 15vw;
  height: 15vw;
  margin: 4rem 0 0 0;
`;

const Song = () => {
  const { song } = useLocation();
  const { goBack } = useHistory();

  return (
    <Fragment>
      {!song ? (
        <Redirect to={"/music-searcher"} />
      ) : (
        <Container>
          <GoBack onClick={goBack} />
          <Image src={song.artworkUrl100} />
          <h3>
            {song.artistName} - {song.trackName}
          </h3>
          <audio controls>
            <source src={song.previewUrl} />
            Your browser does not support the audio element.
          </audio>
        </Container>
      )}
    </Fragment>
  );
};

export default Song;
