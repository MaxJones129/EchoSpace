'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';
import ArtistSongCard from '../../../components/ArtistSongCard';
import { getSongsByArtist } from '../../../api/songData';
import { getGenres } from '../../../api/genreData';
import { getSingleArtist } from '../../../api/artistData';

function Home({ params }) {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState([]);
  const { firebaseKey } = params;
  // const { user } = useAuth();

  const getArtistSongs = () => {
    getSongsByArtist(firebaseKey).then(setSongs);
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.firebaseKey === genreId);
    return genre ? genre.name : 'Unknown';
  };

  useEffect(() => {
    getSingleArtist(firebaseKey).then(setArtist);
    getArtistSongs();
    getGenres().then(setGenres);
  }, []);

  return (
    <div className="text-center justify-content-center">
      <h1>
        <Image className="artistImg" style={{ width: '5.4rem' }} src={artist.image} />
      </h1>
      <h1>{artist.name}</h1>
      <div className="d-flex flex-wrap justify-content-center">
        {/* TODO: map over books here using BookCard component */}
        {songs.map((song) => (
          <ArtistSongCard key={song.firebaseKey} songObj={song} genreObj={getGenreName(song.genreId)} onUpdate={getArtistSongs} artistId={song.artistId} />
        ))}
      </div>
    </div>
  );
}

export default Home;

Home.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
