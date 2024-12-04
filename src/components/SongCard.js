'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import { deleteSong } from '../api/songData';
import { useAuth } from '../utils/context/authContext';

function SongCard({ songObj, onUpdate, artistId, genreObj, artistObj }) {
  const { user } = useAuth();
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisSong = () => {
    if (window.confirm(`Delete ${songObj.title}?`)) {
      deleteSong(songObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '23rem', margin: '10px' }}>
      <div className="cardMain">
        <div className="cardImage">
          <Image className="nav-img" style={{ width: '8rem' }} alt={songObj.title} src={songObj.image} />
        </div>
        <div className="cardBody">
          <Card.Title>{songObj.title}</Card.Title>
          <Card.Title>Genre: {genreObj}</Card.Title>
          <Link href={`/artist/${songObj.artistId}`} passHref>
            <Button variant="info">{artistObj}</Button>
          </Link>
        </div>
      </div>
      {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
      <div className="songBtns">
        {user.uid === artistId && (
          <>
            <Link href={`/song/edit/${songObj.artistId}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisSong}>
              DELETE
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

SongCard.propTypes = {
  songObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    liked: PropTypes.bool,
    firebaseKey: PropTypes.string,
    artistId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  artistId: PropTypes.number.isRequired,
  artistObj: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  genreObj: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default SongCard;
