import Vue from 'vue'
import axios from "axios";
import { axiosInstance } from "../../config/config.js";

export const checkAuth = (url, params, request) => {
  axiosInstance(url, params, request)
    .then(response => {
      // return resp.data.user
      return response.data
    })
    .catch(e => {
      return e
    })
}

 