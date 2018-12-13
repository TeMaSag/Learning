<template>
  <div class="users">
    <div v-if="flagAdminRights">
      <p>USERS:</p>                    
      <table class="table table-dark table-bordered" style="background-color:grey;">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Role User</th>
            <th>count URL</th>
          </tr>
        </thead>
        <tbody >  
          <tr v-for="(user,index) in users" :key="index">  
          <th align="center" scope="row"> {{ index + 1 }} </th>                  
            <td align="center" height=50>  
              <p> {{ user._id }}  </p>   
              <button type="button" class="btn-secondary btn-xs" @click="showModal(index)">
               change password
              </button>
               <modal style="with:40px" v-bind:user="user._id" v-show="user.isModalVisible" @closeModal="close(user)" @changePassword="newPasswordChange"/>              
            </td> 
            <td align="center" height=50> 
              <span> {{ user.role }}</span>
              <select  v-model="user.newRole" class="change-role" @click="changeRole(user)">
                <option> admin </option>
                <option> user </option>
              </select>   
              <span class='error' v-show="flagChangeRole"> {{ user.changeRole }} </span>
            </td> 
            <td align="center" height=50> {{ user.totalUrls }} </td> 
          </tr>          
        </tbody>
      </table>
    </div>
  <div class="textAdmin" v-else>
    <span >You do not have administrative rights</span>
  </div>
  </div>
</template>


<script>
const Modal = {
  name: "modal",
  template: "#modal",
  methods: {
    close(event) {
      this.$emit("close");
    }
  }
};

import { axiosInstance } from "../config/config.js";
import axios from "axios";
import modal from "./modal/dialog.vue";

export default {
  data() {
    return {
      users: [],
      usersFB: [],
      userPasswords: [],
      newPassword: this.newPassword,
      selected: this.selected,
      flagMessage: false,
      flagChangeRole: false,
      flagAdminRights: false,
      message: "",
      isModalVisible: true
    };
  },
  methods: {
    newPasswordChange(newPassword) {
      // debugger

      this.changePassword(newPassword)
    },
    showModal(index) {
      // debugger
      // console.log('user', user);
      this.$set(this.users[index], 'isModalVisible', !this.users[index].isModalVisible)
    },
    open(user) {
      console.log('open');
    },
    close(user) {
      // debugger
      user.isModalVisible = false;
    },
    checkAdminRights() {
      axiosInstance("/check-auth", {}, "post")
        .then(resp => {
          // debugger;
          if (resp.data.user.role == "admin") {
            this.flagAdminRights = true;
          }
        })
        .catch(e => {
          // debugger;
        });
    },
    getAdminPanel() {
      axiosInstance("/user/all-users", {}, "get")
        .then(resp => {
          this.users = resp.data.result;
          console.log(this.users)
        })
        .catch(e => {
          console.log("err", e);
        });
    },
   
    changeRole(user) {
      axiosInstance(
        "/user/role",
        { user: user._id, role: user.newRole },
        "post"
      )
        .then(resp => {
          this.flagChangeRole = true;
          user.changeRole = resp.data.message;
        })
        .catch(e => {
          user.changeRole = e;
        });
    }
  },
  created() {
    this.getAdminPanel();
    this.checkAdminRights();
  },
  components: {
    modal
  }
};
</script>

<style>
.textAdmin {
  width: 500px;
  font-size: 24px;
  color: red;
}
.users {
  margin: 20px 250px 170px 20px;
}
td {
  overflow: auto;
  max-width: 400px;
  white-space: nowrap;
}
.error {
  color: red;
}
@media screen and (max-width: 768px) {
  .text {
    font-size: 12px;
  }
}
</style>
