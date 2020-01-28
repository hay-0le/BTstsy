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

