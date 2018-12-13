<template>  
<!-- <div class="header">
  <div v-if="flagAuthorization" class="welcome">
    <p>Welcome, {{ username }} </p>
  </div>
  <div class="navbar">
      <navbar style="clear:both"></navbar>
    <div class="button-header" >
      <span class="a" v-if="flagAuthorization">        
        <button type="button" class="btn btn-danger" v-on:click="exitAccount"> Exit account </button>
      </span>      
      <span class="logIn" v-else>
        <router-link to="/auth">
          <button type="button" class="btn btn-primary"> Log In </button>
        </router-link>
        <router-link to="/registration">
          <button type="button" class="btn btn-success"> Sign Up </button>
        </router-link>
      </span>
    </div>
  </div>
</div> -->
<div class="container">
  <div class="navbar-header"> 
     {{ username }}
  </div>
  <div id="navbar" class="navbar-collapse collapse">
    <navbar></navbar>
  </div>
</div>
</template>

<script>
import { axiosInstance } from "../../config/config.js";
import { mapMutations, mapState } from "vuex";
import { store } from "../../store";
import navbar from "./navbar.vue";

export default {
  name: "AppHeader",
  data() {
    return {};
  },
  methods: {
    exitAccount() {
      localStorage.removeItem("token");
      location.reload(true);
      window.location.href = "http://localhost:3000/#/auth";
    }
  },
  computed: mapState({
    username: state => state.user.name,
    flagAuthorization: state => state.user.token
  }),
  components: {
    navbar
  }
};
</script>

<style>
.header {
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  position: fixed;
  width: 100%;
  background-image: url("/public/images/hosting.jpg");
  min-height: 275px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
span {
  margin-top: 10px;
}
.clearfix {
  height: 0px;
  clear: both;
}
.navbar {
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  flex: 1;
  align-items: flex-end;
  /* align-self: stretch; */
  font-size: 24px;
}
.btnExitAccount {
  display: flex;
  margin-right: 50px;
  /* margin-top:50px; */
  padding-top: 27px;
}
.signUp {
  margin-top: 160px;
  margin-left: -100px;
  min-width: 100px;
}
.headerLogin {
  display: flex;
  align-content: center;
  justify-content: flex-end;
  width: 100%;
}
.button-header {
  display: flex;
  flex: 1;
  flex-direction: row-reverse;
  padding: 10px 20px 10px 0;
  font-size: 24px;
  color: rgb(214, 126, 18);
}

.btnExitAccount {
  display: flex;
  margin-right: 50px;
  /* margin-top:50px; */
  padding-top: 27px;
}
.a {
  margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
  .logIn {
    margin-top: 20px;
    margin-right: 0px;
  }
  .header {
    flex-direction: column;
    /* max-height: 150px; */
    min-height: 150px;
  }
  .navbar {
    flex-direction: column;
    margin-top: -10px;
    /* margin-right: 50px; */
    font-size: 18px;
    max-height: 90px;
    /* margin-top:30px; */
  }
  .button-header {
    font-size: 16px;
  }
  .a {
    /* order: 1; */
    margin-top: -20px;
    /* margin-right: 0px; */
  }
}
</style>


