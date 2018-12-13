<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" role="dialog">
      <div class="modals" ref="modal">
        <header class="modal-header">
          <slot name="header">
            <h3>
              Change Password
              <p> for {{user}}</p>
            </h3>
            
            <button type="button" class="btn-close btn-right" @click="closeModals" aria-label="Close modal">
              x
            </button>
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <span class="message" v-show="message"> {{ message }}</span>
            <p><input type="password" name="changePassword" v-model="newPassword" class="changePassword" placeholder="change password"/></p>
            <button type="button" name="btn" @click="changePassword" class="btn btn-primary btn-sm">change password</button>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import { axiosInstance } from "../../config/config.js";
export default {
  name: "modal",
  data() {
    return {
      users: [],
      newPassword: "",
      message: ""
    };
  },
  props: {
    user: {
      default: function () {
        return ""
      },
      type: String
    }
  },
  created() {
    console.log('this is', this);
  },
  methods: {
     changePassword(user) {
      axiosInstance(
        `/user/${user._id}`,
        { user: this.user, newPassword: this.newPassword },
        "post"
      )
        .then(resp => {
          this.flagMessage = true;
          this.message = resp.data.message;
        })
        .catch(e => {
          user.message = e;
        });
    },
    closeModals() {
      // debugger
      this.$emit("closeModal");
    },
    onChangePassword() {
      this.$emit("changePassword", { newPassword: this.newPassword, user: this.user });
    }
  }
};
</script>
<style>
.message {
  color:red
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
  padding: 8px 16px;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modals {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
.btn {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>