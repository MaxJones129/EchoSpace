import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSections = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sections.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSingleSection = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sections/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const getUserSections = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sections.json?orderBy="userId"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

const getSectionNumbers = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/sections/sectionNumber.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(Object.values(data)))
      .catch(reject);
  });

export { getSections, getUserSections, getSingleSection, getSectionNumbers };
