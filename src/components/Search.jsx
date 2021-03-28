import React, { Fragment } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";

import { ListItem } from 'components';

const Input = styled.input`
  padding: 1rem;
  width: 60vw;
  border-radius: 5px;
  transition: border .5s;

  &:focus {
    outline: none;
    border: 2px solid blue;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const List = styled.ul`
  padding-left: 0;
  width: 60vw;

  @media (max-width: 768px) {
    width: 90vw;
  }
`

const Search = ({ searchText = '', loading, searchResults = [], onChange }) => {
  return (
    <Fragment>
      <Input value={searchText} type="text" onChange={(e) => onChange(e.target.value)} />
      {searchText === '' && <p>Please type in a filter</p>}
      {loading && <p>Loading...</p>}
      <List>
        {searchResults.map((song) => (
          <ListItem song={song} />
        ))}
      </List>
    </Fragment>
  );
};

Search.propTypes = {
    searchText: PropTypes.string,
    loading: PropTypes.bool,
    searchResult: PropTypes.array,
    onChange: PropTypes.func
};

export default Search;
