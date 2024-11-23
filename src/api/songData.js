import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSongs = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getUserSongs = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs.json?orderBy="artistId"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });
// TODO: DELETE BOOK
const deleteSong = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const likedSongs = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const liked = Object.values(data).filter((item) => item.liked);
        resolve(liked);
      })
      .catch(reject);
  });

// TODO: CREATE BOOK
const createSong = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs.json`, {
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
const updateSong = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs/${payload.firebaseKey}.json`, {
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

const getSingleSong = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getSongsByArtist = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/songs.json?orderBy="artistId"&equalTo="${firebaseKey}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSongGenre = (artistId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/genres.json/?orderBy="firebaseKey"&equalTo="${artistId}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getSongs, getSongsByArtist, getUserSongs, updateSong, deleteSong, createSong, likedSongs, getSingleSong, getSongGenre };
