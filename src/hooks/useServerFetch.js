import axios from 'axios';

const useServerFetch = ((method, endpoint, controller) => new Promise((resolve, reject) => {
  axios.request({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/${endpoint}`,
    method: `${method}`,
    headers: {
      Authorization: process.env.AUTH_TOKEN,
    },
    signal: controller ? controller.signal : undefined,
  })
    .then((res) => resolve(res))
    .catch((err) => reject(err));
}));

export default useServerFetch;
