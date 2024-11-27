'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/utils/context/authContext';
// import PropTypes from 'prop-types';
import SongCard from '../components/SongCard';
import { getSongs } from '../api/songData';
import { getGenres } from '../api/genreData';
import { getArtists } from '../api/artistData';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const number = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[number]] = [shuffledArray[number], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

function Home() {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [shuffleSongs1, setShuffleSongs1] = useState([]);
  const [shuffleSongs2, setShuffleSongs2] = useState([]);
  const [shuffleSongs3, setShuffleSongs3] = useState([]);

  const getAllTheData = () => {
    getSongs().then(setSongs);
    getGenres().then(setGenres);
    getArtists().then(setArtists);
  };

  const getGenreName = (genreId) => {
    const setGenre = genres.find((genre) => genre.firebaseKey === genreId);
    return setGenre ? setGenre.name : 'Unknown Genre';
  };

  const getArtistName = (artistId) => {
    const setArtist = artists.find((artist) => artist.firebaseKey === artistId);
    return setArtist ? setArtist.name : 'Unknown Artist';
  };

  useEffect(() => {
    getAllTheData();
  }, []);

  useEffect(() => {
    if (songs) {
      const shuffle = shuffleArray(songs);
      const firstThreeSongs = shuffle.slice(0, 3);
      const shuffle2 = shuffleArray(songs);
      const secondThreeSongs = shuffle2.slice(0, 3);
      const shuffle3 = shuffleArray(songs);
      const thirdThreeSongs = shuffle3.slice(0, 3);
      setShuffleSongs1(firstThreeSongs);
      setShuffleSongs2(secondThreeSongs);
      setShuffleSongs3(thirdThreeSongs);
    }
  }, [songs]);

  return (
    <div className="text-center d-flex flex-column justify-content-center">
      {/* <h1>Hello {user.displayName}! </h1> */}
      <div className="section">
        {/* TODO: map over books here using BookCard component */}
        {shuffleSongs1.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} artistObj={getArtistName(song.artistId)} genreObj={getGenreName(song.genreId)} onUpdate={getAllTheData} artistId={song.artistId} />
        ))}
      </div>
      <div className="section">
        {/* TODO: map over books here using BookCard component */}
        {shuffleSongs2.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} artistObj={getArtistName(song.artistId)} genreObj={getGenreName(song.genreId)} onUpdate={getAllTheData} artistId={song.artistId} />
        ))}
      </div>
      <div className="section">
        {/* TODO: map over books here using BookCard component */}
        {shuffleSongs3.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} artistObj={getArtistName(song.artistId)} genreObj={getGenreName(song.genreId)} onUpdate={getAllTheData} artistId={song.artistId} />
        ))}
      </div>
    </div>
  );
}

export default Home;

// Home.propTypes = {
//   params: PropTypes.objectOf({}).isRequired,
// };
