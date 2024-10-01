const config = {
    development: {
      BASE_URL: "http://localhost:8080",
    },
    production: {
      BASE_URL: "https://your-production-backend-url.com",
    },
  };
  
  const isDevelopment = window.location.hostname === "localhost";
  const BASE_URL = isDevelopment ? config.development.BASE_URL : config.production.BASE_URL;
  
  export default BASE_URL;
  