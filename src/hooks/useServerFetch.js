import axios from 'axios';

const useServerFetch = (method, endpoint, body, controller) =>
  new Promise((resolve, reject) => {
    axios
      .request({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/${endpoint}`,
        headers: {
          Authorization: process.env.AUTH_TOKEN,
        },
        signal: controller ? controller.signal : undefined,
        method,
        body,
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

export default useServerFetch;
