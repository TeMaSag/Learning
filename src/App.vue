<template>
  <div class="app ">
    <!-- container -->
    <!-- <appHeader></appHeader> -->
    <navbar></navbar>
    <div class="wrapper">
      <div class="container">
        <!-- <div class="container"> -->
          <transition name='fade'  >
              <router-view></router-view>
          </transition>
        <!-- </div> -->
      </div>  
    </div>  
    <!-- <div class="footer"></div>   -->
  </div>
</template>

<script>
import Vue from "vue";
import navbar from "./components/main/navbar.vue";
import appHeader from "./components/main/header.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      flagClassActive: false
    };
  },
  methods: {
    onButtonClick(args) {
      console.log("hello");
      this.flagClassActive = !this.flagClassActive;
    }
  },
  computed: mapState({
    username: state => state.user.name,
    flagAuthorization: state => state.user.token
  }),
  components: {
    navbar,
    appHeader
  }
};
</script>

<style>
body {
  background-size: cover;
  background-attachment: fixed;
  background-image: url("/public/images/hosting.jpg");
}
.container {
  padding: 30px;
}
.wrapper {
  overflow: auto;
  margin-top: 50px;
  /* flex: 1 1 auto; */
  /* flex-direction: column; */
  min-height: 330px;
  /* background-color: #f4f4f4; */
  display: block;
  width: 100%;
  height: 100%;
  /* position: absolute; */

}
.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: none;
  padding: 0;
  align-content: stretch;
    /* background-size: cover;
  background-attachment: fixed;
  background-image: url("/public/images/look.com.ua-53048.jpg");  */
}
.welcome {
  text-transform: capitalize;
  font-size: 20px;
  color: white;
  font-weight: bold;
  font-family: "Brush Script MT";
}
.parallax {
  /* The image used */
  background-image: url("/public/images/hosting.jpg");

  /* Set a specific height */
  min-height: 300px;
  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.fon {
  /* margin-left: 140px; */
  margin-top: -10px;
  padding: 30px;

  display: block;
  width: 100%;
  height: 100%;
  /* min-height: 500px; */
  position: fixed;
  /* position: relative; */
  background-size: cover;
  background-image: url("/public/images/look.com.ua-53048.jpg");
}
.body {
  display: flex;
  height: 1000%;
}
.footer {
  background-size: 100%;
  /* background-image: url("/public/images/header.jpg"); */
  background-color: beige;
  margin-top: 0px;
  min-height: 60px;
  width: 100%;
  max-height: 40px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  flex: 0 0 auto;
}
/* @media screen and (max-width: 768px) {
  .welcome {
    font-size: 26px;
    margin-left:20px;
    padding-top: 0px;
  }
  .wrapper {
    margin-top: 150px;
  }
} */
</style>
