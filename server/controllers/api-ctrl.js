const axios = require("axios");

/**
 * Proxy all calls to our /api to the CMC API, adding the API key in the process.
 */
exports.handleAPICall = async (req, res) => {
  let url = `${process.env.API_URL}${req.path}`;

  // Add query params
  const { query } = req;
  const queryKeys = Object.keys(query);
  if (queryKeys && queryKeys.length) {
    url = url + "?";
    queryKeys.forEach((key, index) => {
      url += `${key}=${query[key]}`;
      if (index < queryKeys.length - 1) {
        url += "&";
      }
    });
  }
  const headers = { "X-CMC_PRO_API_KEY": process.env.API_KEY };

  res.send((await axios.get(url, { headers })).data);
};
