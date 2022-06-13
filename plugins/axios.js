export default function({ $axios, store, app, redirect }) {
    // console.log('axios');
    $axios.onRequest(config => {
      // console.log(store.state.accessToken);
      config.headers.common["X-Auth-Token"] = store.state.accessToken;
    });
  
    $axios.onError(async error => {
      const code = parseInt(error.response && error.response.status);
      if (error.response?.data?.code === 40000 || code === 400) {
        console.error("axios", error.response);
        return error.response;
      }
      if (
        error.response?.data?.code === 401 ||
        error.response?.data?.code === 40100
      ) {
      
      }
    
    });

  }
  