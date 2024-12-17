'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.
import React, { useEffect, useState } from 'react';
// import { useAuth } from '@/utils/context/authContext';
// import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import { Reorder, useDragControls } from 'framer-motion';
import SongCard from '../components/SongCard';
import { getSongs } from '../api/songData';
import { getGenres } from '../api/genreData';
import { getArtists, getYourArtist } from '../api/artistData';
import ArtistForm from '../components/forms/ArtistForm';
import { getSections } from '../api/sectionData';

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
  const [yourArtist, setYourArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [sections, setSections] = useState([]);
  const [shuffleSongs, setShuffleSongs] = useState([]);
  // const [shuffleSongs2, setShuffleSongs2] = useState([]);
  // const [shuffleSongs3, setShuffleSongs3] = useState([]);

  const controls = useDragControls();
  console.warn(controls);

  const { user } = useAuth();

  const getAllTheData = () => {
    getSongs().then(setSongs);
    getGenres().then(setGenres);
    getArtists().then(setArtists);
    getYourArtist(user.uid).then(setYourArtist);
    getSections().then(setSections);
  };

  const getGenreName = (genreId) => {
    const setGenre = genres.find((genre) => genre.firebaseKey === genreId);
    return setGenre ? setGenre.name : 'Unknown Genre';
  };

  const getArtistName = (artistId) => {
    const setArtist = artists.find((artist) => artist.userId === artistId);
    return setArtist ? setArtist.name : 'Unknown Artist';
  };

  useEffect(() => {
    getAllTheData();
  }, []);

  const shuffleTime = () => {
    const shuffle = shuffleArray(songs);
    const threeSongs = shuffle.slice(0, 3);
    setShuffleSongs(threeSongs);
  };

  useEffect(() => {
    shuffleTime();
    // const shuffle2 = shuffleArray(songs);
    // const secondThreeSongs = shuffle2.slice(0, 3);
    // setShuffleSongs2(secondThreeSongs);
    // const shuffle3 = shuffleArray(songs);
    // const thirdThreeSongs = shuffle3.slice(0, 3);
    // setShuffleSongs3(thirdThreeSongs);
  }, [songs]);

  useEffect(() => {
    getAllTheData();
  }, []);

  return (
    <div className="text-center d-flex flex-column justify-content-center">
      {/* <h1>Hello {user.displayName}! </h1> */}
      {yourArtist[0]?.name ? (
        <div className="homeSections">
          <Reorder.Group values={sections} onReorder={setSections}>
            {sections.map((item, index) => (
              <Reorder.Item value={item} key={item}>
                <h1>Section {index + 1}</h1>
                <div className="section">
                  {shuffleSongs.map((song) => (
                    <SongCard key={song.firebaseKey} songObj={song} artistObj={getArtistName(song.artistId)} genreObj={getGenreName(song.genreId)} onUpdate={getAllTheData} artistId={song.artistId} />
                  ))}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      ) : (
        <ArtistForm onUpdate={getAllTheData} />
      )}
    </div>
  );
}

export default Home;
