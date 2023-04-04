// import axios from "axios";
// import {SHOP_BASE_URL, thekeys} from "./endPoints";

// const Header = {
//   "Content-Type": "application/json",
//   // 'Authorization': 'O5mGIP3VNia0JvPH2IBiwA==',
// };

// export default function api(url, method, data = null, appendHeader, Headers) {
//   return new Promise((resolve, reject) => {
//     const headers = appendHeader ? Headers : Header;
//     var options = {
//       url: SHOP_BASE_URL + url,
//       // url: BASE_URL + url + thekeys,
//       method: method,
//       headers,
//     };

//     if (data) {
//       options.data = data;
//     }

//     // fetch(BASE_URL + url, {
//     //   method: method,
//     //   headers,
//     // })
//     //   .then((res) => res.json())
//     //   .then((res) => {
//     //     resolve(res.data);
//     //   })
//     //   .catch((err) => {
//     //     console.log("err", err);
//     //     if (err.response) {
//     //       switch (err.response.status) {
//     //         case 500:
//     //           throw "Internal Server Error";
//     //           reject(err);
//     //           break;
//     //         case 401:
//     //           throw "Unauthorized";
//     //           break;
//     //         case 400:
//     //           throw "Bad request";
//     //           reject(err.response.data);
//     //           break;
//     //         default:
//     //           throw "Unhandled Error";
//     //           reject(err);
//     //           break;
//     //       }
//     //     } else {
//     //       reject(err);
//     //       throw err;
//     //     }
//     //   });

//     axios(options)
//       .then((res) => {
//         resolve(res.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         throw err;
//         // if (err.response) {
//         //   switch (err.response.status) {
//         //     case 500:
//         //       throw "Internal Server Error";
//         //       reject(err);
//         //       break;
//         //     case 401:
//         //       throw "Unauthorized";
//         //       break;
//         //     case 400:
//         //       throw "Bad request";
//         //       reject(err.response.data);
//         //       break;
//         //     default:
//         //       throw "Unhandled Error";
//         //       reject(err);
//         //       break;
//         //   }
//         // } else {
//         //   reject(err);
//         //   throw err;
//         // }
//       });
//   });
// }
