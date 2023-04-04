import log from "@log";
import {create} from "apisauce";
import {SHOP_BASE_URL, thekeys} from "./endPoints";
import axios from "axios";
const Header = {
  "Content-Type": "application/json",
  // 'Authorization': 'O5mGIP3VNia0JvPH2IBiwA==',
};

// const api = create({
//   baseURL: `${SHOP_BASE_URL}`,
//   headers: {Accept: "application/json", "Content-Type": "application/json"},
// });

// const api = axios;

export default function shopAPi(url, queries, method, data = null, appendHeader, Headers) {
  return new Promise((resolve, reject) => {
    const headers = appendHeader ? Headers : Header;

    let theurl = SHOP_BASE_URL + url + (queries === null || queries === undefined ? "" : queries);
    // var options = {
    //   url: SHOP_BASE_URL + url + (queries === null || queries === undefined ? "" : queries),
    //   method: method,
    //   headers,
    // };
    var options = {
      // url: SHOP_BASE_URL + url + (queries === null || queries === undefined ? "" : queries),
      method: method,
      headers: headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    fetch(theurl, options)
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("err", err);
        reject(err);
        // if (err.response) {
        //   switch (err.response.status) {
        //     case 500:
        //       throw "Internal Server Error";
        //       reject(err);
        //       break;
        //     case 401:
        //       throw "Unauthorized";
        //       break;
        //     case 400:
        //       throw "Bad request";
        //       reject(err.response.data);
        //       break;
        //     default:
        //       throw "Unhandled Error";
        //       reject(err);
        //       break;
        //   }
        // } else {
        //   throw err;
        // }
      });

    // axios({
    //   ...options,
    // })
    //   .then((res) => {
    //     resolve(res.data);
    //   })
    //   .catch((err) => {
    //     reject(err.response.data);
    //     // throw err.response.data;
    //   });
  });
}

// class shopAPi {}
// shopAPi.call = (url, params, header) => {
//   return new Promise((resolve, reject) => {
//     api
//       .get(`${url}`, params, header)
//       .then((res) => {
//         console.log(url, res);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         log.error("API calling error:-", err);
//         throw err;
//         reject(err);
//       });
//   });
// };

// shopAPi.callRes = (url, params, header) => {
//   return new Promise((resolve, reject) => {
//     api
//       .get(SHOP_BASE_URL + url, params, header)
//       .then((res) => {
//         console.log(url, res);
//         resolve(res);
//       })
//       .catch((err) => {
//         log.error("API calling error:-", err);
//         throw err;
//         reject(err);
//       });
//   });
// };

// shopAPi.callDelete = (url, params, header) => {
//   return new Promise((resolve, reject) => {
//     api
//       .delete(SHOP_BASE_URL + url, params, header)
//       .then((res) => {
//         console.log("res", res);
//         resolve(res);
//       })
//       .catch((err) => {
//         throw err;
//         reject(err);
//       });
//   });
// };

// //without token
// shopAPi.callGet = (url, params) => {
//   return new Promise((resolve, reject) => {
//     api
//       .get(SHOP_BASE_URL + url, params)
//       .then((res) => {
//         console.log("url", url, res);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         log.error("API calling error:-", err);
//         throw err;
//         reject(err);
//       });
//   });
// };

// shopAPi.callPostAuth = (url, params, header) => {
//   console.log(header, "-----header---");
//   return new Promise((resolve, reject) => {
//     api
//       .post(SHOP_BASE_URL + url, params, header)
//       .then((res) => {
//         console.log("url", url, res);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         log.error("API calling error:-", err);

//         reject(err);
//         // throw err;
//       });
//   });
// };

// shopAPi.callPostAuthres = (url, params, header) => {
//   return new Promise((resolve, reject) => {
//     api
//       .post(SHOP_BASE_URL + url, params, header)
//       .then((res) => {
//         console.log("url", url, res);
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//         // throw err;
//       });
//   });
// };

// shopAPi.callPost = (url, params) => {
//   return new Promise((resolve, reject) => {
//     api
//       .post(SHOP_BASE_URL + url, params)
//       .then((res) => {
//         console.log("url", url, res);
//         resolve(res.data);
//       })
//       .catch((err) => {
//         log.error("API calling error:-", err);
//         reject(err);
//         // throw err;
//       });
//   });
// };

// shopAPi.callPut = (url, params, header) => {
//   return new Promise((resolve, reject) => {
//     try {
//       api.put(SHOP_BASE_URL + url, params, header).then((res) => {
//         console.log("url", url, res);
//         resolve(res.data);
//       });
//     } catch (err) {
//       log.error("API calling error:-", err);
//       throw err;
//       reject(err);
//     }
//   });
// };

// shopAPi.callPatch = (url, param, header) => {
//   return new Promise((resolve, reject) => {
//     try {
//       api.patch(SHOP_BASE_URL + url, param, header).then((res) => {
//         console.log("url", url, res);
//         resolve(res.data);
//       });
//     } catch (err) {
//       log.error("API calling error:-", err);
//       throw err;
//       reject(err);
//     }
//   });
// };

// export default shopAPi;
