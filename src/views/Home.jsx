import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Link to="/grid">Grid</Link>
            <Link to="/music-searcher">Music Searcher</Link>
        </div>
    )
}

export default Home;