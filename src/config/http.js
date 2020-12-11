/*
 * @Author: your name
 * @Date: 2020-11-04 19:48:03
 * @LastEditTime: 2020-11-24 17:35:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bigscreen_pc\src\config\http.js
 */
import axios from 'axios'
// import qs from 'qs';

// const base = 'http://192.168.0.178:8888'; //联调
const base = 'http://125.77.202.90:35555'; //测试环境
// export const imageUrl = ''; //测试图片资源
// export const uploadFile = base + '/starMedia/file/add';
axios.defaults.withCredentials = false;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// axios.interceptors.request.use(function (config) {
//   console.dir(config);
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

axios.interceptors.response.use(function (response) {
  // if (response.data && response.data.errcode) {
  //   if (parseInt(response.data.errcode) === 1000) {
  //     //未登录
  //     // login
  //   }
  // }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default {
  BaseUrl(url) {
    return `${base}${url}`
  },
  POST: (url, params) => {
    return axios.post(`${base}${url}`, params).then(res => res.data)
  },
  
  GET: (url, params) => {
    return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
  },
  
  PUT: (url, params) => {
    return axios.put(`${base}${url}`, params).then(res => res.data)
  },
  
  DELETE: (url, params) => {
    return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
  },
  
  PATCH: (url, params) => {
    return axios.patch(`${base}${url}`, params).then(res => res.data)
  },
}