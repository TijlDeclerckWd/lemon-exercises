import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  height: 5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 60%;
  margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  width: 60%;
  padding: 1rem;
`;

const Title = styled.h3`
  margin: 0;
`;

const PlayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
`;

const ListItem = ({ song }) => {
  return (
    <Container>
      <ImageContainer>
        <Image src={song.artworkUrl100} />
      </ImageContainer>
      <InfoContainer>
        <Title>{song.artistName}</Title>
        <Title>{song.trackName}</Title>
      </InfoContainer>
      <PlayContainer>
        <Link
          to={{
            pathname: `music-searcher/song/${song.trackId}`,
            song,
          }}
        >
          <FaPlay />
        </Link>
      </PlayContainer>
    </Container>
  );
};

export default ListItem;
