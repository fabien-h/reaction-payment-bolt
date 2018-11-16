const getCDN_URL = (isProduction) => (isProduction ? "https://connect.bolt.com" : "https://connect-sandbox.bolt.com");
const getAPI_URL = (isProduction) => (isProduction ? "https://api.bolt.com" : "https://api-sandbox.bolt.com");

export { getCDN_URL, getAPI_URL };
