<template>
<div>
  <form class="form-inline" id="formToParcsing">
    <div class="form-group mx-sm-3 mb-2">
      <input type="text" class="form-control" v-model="parsingUrl" id="urlToParcsing" placeholder="Url to parsing">
      <button type="submit" id="btnParsingUrl" v-on:click="postParsing" class="btn btn-primary mb-2">Parsing</button>
    </div>
  </form>
  <div class="lds-css ng-scope" v-show="isActive" style="display: none">
    <div class="lds-gear" style="width:100%;height:100%"><div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
  </div>
  <div class="parsingContent"> 
    <img v-for="(srcImg,index) in content" :key="index" :src="srcImg" class="marketplace__gridItem" > 
  </div>
</div> 
</template>

<script>
import axios from "axios";
import { axiosInstance } from "../config/config.js";
export default {
  name: "parsing",
  data() {
    return {
      content: [],
      parsingUrl: this.parsingUrl,
      infoImage: [],
      intermediate: [],
      isActive: false
    };
  },
  methods: {
    postParsing() {
      this.isActive = true;
      // axios
      //   .request(axiosInstance("/parsing", { url: this.parsingUrl }, "post"))
      axiosInstance("/parsing", { url: this.parsingUrl }, "post")
        .then(resp => {
          for (let i = 0; i < resp.data.content.length; i++) {
            this.infoImage.push(resp.data.content[i].info.split("\n"));
            this.intermediate = resp.data.content[i].src.match(/".*"/);
            this.content.push("https:" + this.intermediate[0].replace(/"/g, ""));
          }
          this.isActive = false;
        });
    }
  }
};
</script>

<style>
.active {
  display: block !important;
}
.marketplace__gridItem {
  width: 150px;
    height: 150px;
  margin: 5px 20px 5px 5px;
}
.parsingContent {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  margin: 10px 150px 10px 10px;
  background-repeat: no-repeat;
  background-size: cover;
  line-height: 0;
  -webkit-column-count: 5;
  -webkit-column-gap: 0px;
  -moz-column-count: 5;
  -moz-column-gap: 0px;
  column-count: 5;
  column-gap: 0px;
}
.parsingContent:last-child {
  margin-bottom: 200px;
}
@keyframes lds-gear {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes lds-gear {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.lds-gear > div {
  -webkit-transform-origin: 100px 100px;
  transform-origin: 100px 100px;
  -webkit-animation: lds-gear 1s infinite linear;
  animation: lds-gear 1s infinite linear;
  position: relative;
}
.lds-gear > div div {
  position: absolute;
  width: 26px;
  height: 192px;
  background: #00090a;
  left: 100px;
  top: 100px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.lds-gear > div div:nth-child(1) {
  width: 152px;
  height: 152px;
  border-radius: 50%;
}
.lds-gear > div div:nth-child(3) {
  -webkit-transform: translate(-50%, -50%) rotate(30deg);
  transform: translate(-50%, -50%) rotate(30deg);
}
.lds-gear > div div:nth-child(4) {
  -webkit-transform: translate(-50%, -50%) rotate(60deg);
  transform: translate(-50%, -50%) rotate(60deg);
}
.lds-gear > div div:nth-child(5) {
  -webkit-transform: translate(-50%, -50%) rotate(90deg);
  transform: translate(-50%, -50%) rotate(90deg);
}
.lds-gear > div div:nth-child(6) {
  -webkit-transform: translate(-50%, -50%) rotate(120deg);
  transform: translate(-50%, -50%) rotate(120deg);
}
.lds-gear > div div:nth-child(7) {
  -webkit-transform: translate(-50%, -50%) rotate(150deg);
  transform: translate(-50%, -50%) rotate(150deg);
}
.lds-gear > div div:nth-child(8) {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
}
.lds-gear {
  width: 200px !important;
  height: 200px !important;
  -webkit-transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
  transform: translate(-100px, -100px) scale(1) translate(100px, 100px);
}
@media screen and (max-width: 768px) {
  .form-group {
    display: flex
  }
  input {
    margin-right: 20px;
  }
  .marketplace__gridItem {
    width: 60px;
    height: 60px;
  }
  .parsingContent {
    margin: 0 0 0 0
  }
}
</style>
