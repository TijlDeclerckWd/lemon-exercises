import React, { Fragment } from "react";
import styled from 'styled-components';
import PropTypes from "prop-types";

import { ListItem } from 'components';

const List = styled.ul``;

const Search = ({ searchText, searchResults = [], onChange }) => {
  return (
    <Fragment>
      <input value={searchText} type="text" onChange={(e) => onChange(e.target.value)} />

      <List>
        {searchResults.map((song) => (
          <ListItem song={song} />
        ))}
      </List>
    </Fragment>
  );
};

Search.propTypes = {
    
};

export default Search;
