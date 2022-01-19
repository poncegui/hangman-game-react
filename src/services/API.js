const getApi = () => {
    
    return fetch('https://palabras-aleatorias-public-api.herokuapp.com/random') 
     .then(response => response.json())
     .then(responseData => {
      return responseData
     });
 }
 
 
 export default getApi