<template>      
<div class="registation"> 
  <h3 > Create your account </h3>
  <div>
    <div v-show="flagMessage" > 
      <span class="error"> {{ message }} </span>
    </div>               
    <div class="form-group">
        <label for="login" class="text"> Login </label> 
        <input type="text" name="login" class="form-control" v-model="login" placeholder="Enter login">
    </div>  
    <div class="form-group">
        <label for="email" class="text"> Email </label>
        <input type="email" name="email" class="form-control" v-model="email" placeholder="email">
    </div>        
    <div class="form-group">
        <label for="password" class="text"> Password </label>
        <input type="password" name="password" class="form-control" v-model="password" placeholder="password">
    </div>
    
    <div>
        <button v-on:click="postRegistr" class="btn  btn-primary" style="width:100%"> Sign Up </button>
    </div>
  </div>               
</div>
</template>

<script>
import { axiosInstance } from "../config/config.js";

export default {
  data() {
    return {
      login: this.login,
      password: this.password,
      email: this.email,
      message: "",
      flagMessage: false
    };
  },
  methods: {
    postRegistr(context, credentials, redirect) {
      axiosInstance(
        "/registr",
        {
          login: this.login,
          password: this.password,
          email: this.email
        },
        "post"
      )
        .then(resp => {
          this.flagMessage = true;
          this.message = resp.data.message;
        })
        .catch(e => {
          localStorage.removeItem("user-token");
          this.flagMessage = true;
          this.message = e.response.data.message;
        });
    }
  }
};
</script>
<style>
h3 {
  font-size: 52px
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
  }
  h3 {
    font-size: 26px
  }
}
</style>

