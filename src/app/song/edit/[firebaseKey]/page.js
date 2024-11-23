'use client';

import React, { useEffect, useState } from 'react';
import { getSingleSong } from '@/api/songData';
import SongForm from '@/components/forms/SongForm';
import PropTypes from 'prop-types';

export default function EditSong({ params }) {
  const [editItem, setEditItem] = useState({});
  // TODO: grab the firebasekey
  const { firebaseKey } = params;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSingleSong(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return <SongForm obj={editItem} />;
}

EditSong.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
