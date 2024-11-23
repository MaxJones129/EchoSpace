'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getGenres } from '../../api/genreData';
import { createSong, updateSong } from '../../api/songData';

const initialState = {
  image: '',
  liked: true,
  title: '',
  // artistId: '',
};

function SongForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const [genres, setGenres] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGenres().then(setGenres);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateSong(formInput).then(() => router.push(`/account`));
    } else {
      const payload = { ...formInput, artistId: user.uid };
      createSong(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateSong(patchPayload).then(() => {
          router.push('/account');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Song</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Song Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Song Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an Image Url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* GENRE SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Genre">
        <Form.Select aria-label="Genre" name="genreId" onChange={handleChange} className="mb-3" value={formInput.genreId || ''} required>
          <option value="">Select a Genre</option>
          {genres.map((genre) => (
            <option key={genre.firebaseKey} value={genre.firebaseKey}>
              {genre.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      {/* <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control as="textarea" placeholder="Description" style={{ height: '100px' }} name="description" value={formInput.description} onChange={handleChange} required />
        </FloatingLabel> */}

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="liked"
        name="liked"
        label="Liked"
        checked={formInput.liked}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            liked: e.target.checked,
          }));
        }}
      />
      <h2 className="text-white mt-5">Artist: {user.displayName}</h2>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Song</Button>
    </Form>
  );
}

SongForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    genreId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default SongForm;
