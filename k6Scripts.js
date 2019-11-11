import { check } from "k6";
import http from "k6/http";

//GET for 'main page'
export default function() {
  let res = http.get("http://localhost:5555");
  console.log(res)
  check(res, {
    "is status 200": (r) => r.status === 200
  });
};

//GET to retrieve last item in db

//GET to retreive random productid from db

//POST to add an item



// // GET Request
// export default function() {
//   var i = Math.floor(Math.random() * 10000000);
//   http.get(`http://localhost:1234/api/checkout/${i}/details`);
//   sleep(0);
// }