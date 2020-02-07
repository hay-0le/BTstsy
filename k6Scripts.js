//FILE SUMMARY: Basic Stress testing on random product id's 1-10,000,000

import { sleep, check } from "k6";
import http from "k6/http";
import { Rate, Counter } from "k6/metrics";
// require('dotenv').config();

const port = 4444;
export let errorRate = new Rate("errors");

export const options = {
  stages: [
    { duration: "30s", target: 100 },
    { duration: "30s", target: 500 },
    { duration: "1m", target: 100 },
    { duration: "30s", target: 10 },
  ],
  thresholds: {
    //stops test if error rate exceeds 10%
    "errors": ["rate<0.1"]
  }
}

//GET to retreive random productid from db
export default function() {
  let randomId = Math.floor(Math.random() * 10000000) + 1;

  let res = http.get(`http://localhost:${port}/?${randomId}`);

  check(res, {
    "Status is 200": (r) => r.status === 200
  }) || errorRate.add(1);
};


