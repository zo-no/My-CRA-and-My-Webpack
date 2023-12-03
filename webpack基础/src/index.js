import "@babel/polyfill";
// import axios from "axios";
import "./index.less";

//js中使用处理css中的图片，要先基于ES6的模块化导入，这样webpack才能识别
//错误
// import logo from "./logo.png";
// let img = new Image();
// img.src = logo;
// document.body.appendChild(img);

// const request = axios.create({
//   baseURL: "http://localhost:8000", //根域名
//   timeout: 5000,
// });

// const requestData = {
//   grant_type: "",
//   username: 123,
//   password: 123,
//   scope: "",
//   client_id: "",
//   client_secret: "",
// };
// request({
//   url: "/v1/userinit/login/account",
//   method: "POST",
//   data: requestData,
//   headers: {
//     accept: "application/json",
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// }).then((res) => {
//   console.log(res);
// });
