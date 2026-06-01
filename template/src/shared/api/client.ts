import ky from 'ky';

const prefixUrl = `${process.env.API_URL ?? ''}/`;

export const apiClient = ky.extend({
  headers: {
    Accept: 'application/json',
  },
  prefixUrl,
});
