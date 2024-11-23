'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/utils/context/authContext';
// import PropTypes from 'prop-types';
import SongCard from '../components/SongCard';
import { getSongs } from '../api/songData';
import { getGenres } from '../api/genreData';

function Home() {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);

  const getAllTheSongData = () => {
    getSongs().then(setSongs);
    getGenres().then(setGenres);
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.firebaseKey === genreId);
    return genre ? genre.name : 'Unknown';
  };

  useEffect(() => {
    getAllTheSongData();
  }, []);

  return (
    <div className="text-center d-flex flex-row justify-content-center">
      {/* <h1>Hello {user.displayName}! </h1> */}
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {songs.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} genreObj={getGenreName(song.genreId)} onUpdate={getAllTheSongData} artistId={song.artistId} />
        ))}
      </div>
    </div>
  );
}

export default Home;

// Home.propTypes = {
//   params: PropTypes.objectOf({}).isRequired,
// };
