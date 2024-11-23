import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getGenres = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/genres.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSingleGenre = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/genres/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });
export { getGenres, getSingleGenre };
