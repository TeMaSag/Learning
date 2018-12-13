<template>  
<div class="registation">
  <h3 style="font-size: 52px; margin-bottom: 20px" class="panel-title"> Log in </h3>
  <div>
    <div v-show="flagMessage" > 
      <span class="error">{{ message }} </span>
    </div>
    <div class="form-group">
      <label for="login" class="text"> Login </label>  
      <input type="text" name="login" class="form-control" v-model="login" placeholder="Enter login" >                    
    </div>          
    <div class="form-group">
      <label for="password" class="text"> Password </label>
      <input type="password" name="password" class="form-control" v-model="password"  placeholder="password">
    </div>
    <div>
      <button v-on:click="postAuth" class="btn btnAuth text btn-primary"> Log in </button>
    </div>  
    <div class= "social-network">
      <span> Entrance through: </span> 
      <img src="src/public/images/logo-facebook.png" v-on:click="authFB" height="50px" width="60px" alt="logo">
    </div>
  </div>
</div>

</template>

<script>
import axios from "axios";
import { axiosInstance } from "../config/config.js";
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

export default {
  data() {
    return {
      login: this.login || "root",
      password: this.password || "fusion",
      flagMessage: false,
      message: ""
    };
  },
  methods: {
    authFB() {
      
      const scope = this;
      window.fbAsyncInit = function() {
        FB.init({
          appId: "709511692745732",
          cookie: true,
          xfbml: true,
          version: "v2.12"
        });
        console.log("init");
        FB.login(
          function(response) {
            console.log("resp", response);
            const token = response.authResponse.accessToken;
            scope.$store.dispatch("storeAuthorizationFacebook",  token )
            .then(data => {
            })
            .catch(error=> {
              console.log('error:', error);
            })
          },
          { scope: "public_profile,email" }
        );
      };

      (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    },
    postAuth() {
      this.$store
        .dispatch("storeAuthorization", {
          login: this.login,
          password: this.password
        })
        .then(data => {
          console.log("", data);
          this.message = data.response.data.message;
          this.flagMessage = true;
        })
        .catch(err => {
          console.log("here we fallen");
        });
    }
  }
};
</script>

<style>
.btnAuth {
  width:100%
}
.social-network {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}
.registation {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-right: 250px;
  flex-direction: column;
}

.error {
  color: red;
}
.text {
  font-weight: bold;
  font-size: 18px;
}
@media screen and (max-width: 768px) {
  .registation {
    margin-right: 0px;
    display: block;
}


}
</style>
