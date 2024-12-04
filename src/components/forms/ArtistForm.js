'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createArtist, updateArtist } from '../../api/artistData';

const initialState = {
  image: '',
  name: '',
};

function ArtistForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    // onUpdate();
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
      updateArtist(formInput).then(() => router.push(`/`));
    } else {
      const payload = { ...formInput, userId: user.uid };
      createArtist(payload).then(({ name }) => {
        // onUpdate();
        const patchPayload = { firebaseKey: name };
        updateArtist(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Artist</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Artist Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter a title" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Artist Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an Image Url" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Artist</Button>
    </Form>
  );
}

ArtistForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default ArtistForm;
