import "@babel/polyfill";
import axios from "axios";
import "./index.less";

const request = axios.create({
  baseURL: "http://localhost:8000", //根域名
  timeout: 5000,
});

const requestData = {
  grant_type: "",
  username: 123,
  password: 123,
  scope: "",
  client_id: "",
  client_secret: "",
};
request({
  url: "/v1/userinit/login/account",
  method: "POST",
  data: requestData,
  headers: {
    accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
}).then((res) => {
  console.log(res);
});
