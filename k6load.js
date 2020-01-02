import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "10s"
};

export default function() {
  http.get("http://127.0.0.1:8000/qa/5");
  sleep(1);
};