// import { baseUrl, checkResponse } from './constants';

// const expiryToken = (token: String) => {
//   return (JSON.parse(atob(token.split('.')[1]))).exp
// }

// async function refreshToken() {  
//   const refreshToken = localStorage.getItem('refreshToken');
//   const requestOptions = {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       "token": refreshToken,       
//     })
//   }
//   try {
//     return fetch(baseUrl + '/auth/token', requestOptions)
//     .then(checkResponse) 
//     .then(res => {               
//       localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
//       localStorage.setItem('refreshToken', res.refreshToken)
//     })
//   }
//   catch(error: any) {    
//     console.log(error)
//   }
// }

// export async function fetchWithAuth(url: string, options: {headers: {Authorization?: string}}) {  
//   const loginUrl = '/login';
//   let tokenData;

//   if (localStorage.getItem('accessToken')) {
//       tokenData = localStorage.getItem('accessToken');
//   } 

//   if (!options.headers) {
//       options.headers = {};
//   }
  
//   if (tokenData) {
//       if (Date.now() >= expiryToken(tokenData) * 1000) {
//           try {
//             return refreshToken();
//           } catch (err) {
//             return  window.location.replace(loginUrl);
//           }
//       }

//       options.headers.Authorization = `Bearer ${tokenData}`;
//   }

//   return fetch(url, options);
// }

export {}