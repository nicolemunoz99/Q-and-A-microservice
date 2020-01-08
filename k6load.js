import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 1000,
  duration: "1s"
};

export default function() {
  
  let id = Math.floor(Math.random() * 1000000)
  http.get(`http://18.222.206.140:8000/qa/${id}`);
  // sleep(1);
};