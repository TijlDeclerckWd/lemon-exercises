import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

import useAsync from "services/hooks/useAsync";
import { Search, Song } from "components";

const Container = styled.div`
  padding-left: 2vw;
`;

const MusicSearcher = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const debouncedAction = useRef();

  const fetchSongs = () => {
    const url = new URL("https://itunes.apple.com/search");
    const params = { limit: 10, term: searchText };

    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return fetch(url);
  };

  const { execute, value, status } = useAsync(fetchSongs, false);
  
  useEffect(() => {
    if (searchText) {
      if (debouncedAction !== undefined) {
        clearTimeout(debouncedAction.current);
      }

      debouncedAction.current = setTimeout(() => {
        execute();
      },300);
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
        path={`/music-searcher`}
        render={() => (
          <Search
            exact
            loading={status === 'pending'}
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

export default MusicSearcher;
