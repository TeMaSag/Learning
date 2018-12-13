import { checkAuth } from "./utils/api"
import { axiosInstance } from "../config/config.js";

export default {
  storeAuthorization(context, params) {    
    return axiosInstance("/auth", params, "post")
      .then(resp => {
        if (resp.data.message) {
          return resp.data.message
        }
        const token = resp.data.token;
        document.cookie = JSON.stringify({ token: token });
        localStorage.setItem("token", token);       
        window.location.href = "http://localhost:3000/#/home-page";
        context.commit('authCheck', resp.data)
        
      })
      .catch(e => {
        return e //.request.response
      })
  },
  storeAuthorizationFacebook(context,token) {
    return axiosInstance("/auth/auth-token", { token }, "post")
    .then(resp => {
      document.cookie = JSON.stringify({ token: resp.data.token });
      localStorage.setItem("token", resp.data.token);
      console.log('resp is', resp);       
      window.location.href = "http://localhost:3000/#/home-page";
      context.commit('authCheck', resp.data)
    })
    .catch(e => {
    });
  }
}