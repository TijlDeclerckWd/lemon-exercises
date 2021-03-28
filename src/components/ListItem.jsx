import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 8vw 80% 1fr;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
`;

const Image = styled.img`
  width: 10vw;
  height: 10vw;
`;

const InfoContainer = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h3`
  margin: 0;
`;

const ListItem = ({ song }) => {
  return (
    <Container>
      <Image src={song.artworkUrl100} />

      <InfoContainer>
        <Title>{song.artistName}</Title>
        <Title>{song.trackName}</Title>
      </InfoContainer>
      <Link
        to={{
          pathname: `/music-searcher/song/${song.trackId}`,
          song,
        }}
      >
        <FaPlay />
      </Link>
    </Container>
  );
};

export default ListItem;
