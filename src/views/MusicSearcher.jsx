import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import useAsync from "../services/hooks/useAsync";
import { ListItem } from "../components";

const Container = styled.div``;

const List = styled.ul`
`;

const MusicSearcher = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState([]);

  const fetchSongs = () => {
    const url = new URL("https://itunes.apple.com/search");
    const params = { limit: 10, term: searchText };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return fetch(url);
  }
  
  const { execute, value } = useAsync(fetchSongs, false);

  useEffect(() => {
    if (searchText) {
      execute();
    }
  }, [searchText]);

  useEffect(() => {
    if (value) {
      setSearchResults(value.results);
    }
  }, [value]);

  return (
    <Container>
      <h1>iTunes Music Searcher</h1>
      <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      <List>
        {searchResults.map((song) => (
          <ListItem song={song} />
        ))}
      </List>
    </Container>
  );
};

MusicSearcher.propTypes = {};

export default MusicSearcher;
