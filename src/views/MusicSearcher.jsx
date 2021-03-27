import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

import useAsync from "services/hooks/useAsync";
import { Search, Song } from "components";

const Container = styled.div``;

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
  };

  
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
      <Route
        exact
        path={`/music-searcher/search`}
        render={() => (
          <Search
            searchText={searchText}
            searchResults={searchResults}
            onChange={(value) => setSearchText(value)}
          />
        )}
      />
      <Route
        exact
        path={`/music-searcher/song/:trackID`}
        component={Song}
      />
    </Container>
  );
};

MusicSearcher.propTypes = {};

export default MusicSearcher;
