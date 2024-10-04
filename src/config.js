const config = {
    development: {
      BASE_URL: "http://localhost:8080",
    },
    production: {
      BASE_URL: "https://memetembackend.onrender.com",
    },
  };
  
  const isDevelopment = window.location.hostname === "localhost";
  const BASE_URL = isDevelopment ? config.development.BASE_URL : config.production.BASE_URL;
  
  export default BASE_URL;
  