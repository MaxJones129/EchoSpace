import { getSongGenre } from './songData';
import { getSingleGenre } from './genreData';

const getSongDetails = (artistId) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleGenre(artistId), getSongGenre(artistId)])
      .then(([genreObject, genreSongsArray]) => {
        resolve({ ...genreObject, songs: genreSongsArray });
      })
      .catch((error) => reject(error));
  });

export default getSongDetails;
