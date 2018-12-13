<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="navbar-header">
      <button
        v-on:click="classInActive"
        type="button"
        class="navbar-toggle"
        data-toggle="collapse"
        data-target="#navbar"
        aria-expanded="true"
        aria-controls="navbar"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a v-if="flagAuthorization" class="navbar-brand welcome" href="#">Welcome, {{ username }}</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse" :class="{ in: inActive }">
      <ul class="nav navbar-nav">
        <li>
          <router-link to="/home-page">Home</router-link>
        </li>
        <li v-if="['user', 'admin'].includes(userRole)">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/parsing">Parsing</router-link>
        </li>
        <li v-if="['admin'].includes(userRole)">
          <router-link to="/admin-panel">Admin</router-link>
        </li>
        
        <li class="dropdown" :class="{ open: openDropdown }">
          <a
            v-on:click="dropDowns"
            href="#"
            class="dropdown-toggle"
            aria-haspopup="true"
            data-toggle="dropdown"
            role="button"
          >Dropdown
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" :class="{ show: openDropdown }">
            <li>
              <router-link to="/auth">Log In</router-link>
            </li>
            <li>
              <router-link to="/registration">Sign Up</router-link>
            </li>
            <li role="separator" class="divider">
              <a href="#" class></a>
            </li>
            <li v-if="flagAuthorization" style="background:red">
              <a href="#" v-on:click="exitAccount">Exit account</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { axiosInstance } from "../../config/config.js";
import { mapMutations, mapState } from "vuex";

export default {
  name: "navBar",
  data() {
    return {
      image: [],
      message: "",
      openDropdown: false,
      inActive: false
    };
  },
  methods: {
    exitAccount() {
      localStorage.removeItem("token");
      location.reload(true);
      window.location.href = "http://localhost:3000/#/auth";
    },
    dropDowns() {
      this.openDropdown = !this.openDropdown;
    },
    classInActive() {
      this.inActive = !this.inActive;
    },
    exitAccount() {
      localStorage.removeItem("token");
      location.reload(true);
      window.location.href = "http://localhost:3000/#/auth";
    },
    buttonClickMenu() {
      this.$emit("button-click");
    },
    uploadAvatar(event) {
      let data = new FormData();
      data.append("avatar", event.target.files[0]);
      axiosInstance("/upload-files", data, "post")
        .then(resp => {
          console.log("resp");
          this.$store.dispatch("storeAuthorization", {
            login: this.$store.state.user.name,
            password: this.$store.state.user.password
          });
          this.message = resp.data.message;
        })
        .catch(e => {
          this.message = e;
        });
    }
  },
  computed: mapState({
    username: state => state.user.name,
    userAvatar: state => state.user.avatarSrc,
    userRole: state => {
      return state.user.role;
    },
    flagAuthorization: state => state.user.token
  })
};
</script>

  <style>
.avatar {
  display: flex;
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>