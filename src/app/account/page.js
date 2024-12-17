'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'react-bootstrap/Image';
import { useAuth } from '@/utils/context/authContext';
import SongCard from '../../components/SongCard';
import { getUserSongs } from '../../api/songData';
import { getGenres } from '../../api/genreData';

function Home() {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);

  const { user } = useAuth();

  const getMySongs = () => {
    getUserSongs(user.uid).then(setSongs);
  };

  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.firebaseKey === genreId);
    return genre ? genre.name : 'Unknown';
  };

  useEffect(() => {
    getMySongs();
    getGenres().then(setGenres);
  }, []);

  return (
    <div className="text-center justify-content-center">
      <div className="uploadSongBtn">
        <Link href="/song/new" passHref>
          <Button>Add Song</Button>
        </Link>
      </div>
      <h1>
        <Image className="userImg" style={{ width: '5.4rem' }} src={user.photoURL} />
      </h1>
      <h1>{user.displayName}</h1>

      <div className="d-flex flex-wrap justify-content-center">
        {/* TODO: map over books here using BookCard component */}
        {songs.map((song) => (
          <SongCard key={song.firebaseKey} songObj={song} artistObj={user.displayName} genreObj={getGenreName(song.genreId)} onUpdate={getMySongs} artistId={song.artistId} />
        ))}
      </div>
    </div>
  );
}

export default Home;
