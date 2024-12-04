import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getArtists = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSingleArtist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getYourArtist = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists.json?orderBy="userId"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

// TODO: CREATE BOOK
const createArtist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// TODO: UPDATE BOOK
const updateArtist = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSpecificArtist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists.json?orderBy="userId"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getArtists, getYourArtist, updateArtist, createArtist, getSingleArtist, getSpecificArtist };
