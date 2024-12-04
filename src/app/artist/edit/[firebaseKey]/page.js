'use client';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { getSingleArtist } from '../../../../api/artistData';
import ArtistForm from '../../../../components/forms/ArtistForm';

export default function EditArtist({ params }) {
  const [editItem, setEditItem] = useState({});
  // TODO: grab the firebasekey
  const { firebaseKey } = params;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleArtist(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  useEffect(() => {
    if (editItem) {
      console.warn(editItem);
    }
  }, [editItem]);
  // TODO: pass object to form
  return <ArtistForm obj={editItem} />;
}

EditArtist.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
