<template>
  <div>
      <div class="form-group">
        <label for="url" class="text"> URL </label>  
        <input type="text" name="url" class="form-control"  v-model="url"  id="url" placeholder="Enter url" />
      </div>          
      <div class="form-group">
        <label for="urlShorten" class="text">  URL Shorten </label>
        <input type="text" name="urlShorten" class="form-control" v-model="urlShorten"  placeholder="URL shorten"/>
      </div> 
      <button class="btn btn-secondary" v-on:click="postGenerate">Generate short url</button>
      <button v-on:click="postSaveDb" class="btn btn-primary">Save to database</button>     
    <div v-show="flagShortUrl">
      <p class="text">Short url: <a :href="urlShortLink"> {{ urlShortLink }} </a></p>
    </div>
    <div>
      <p class="text" >Message: <span class="error"> {{ message }} </span></p>
    </div>
      <button class ="btn btn-success" @click="flagSwhowUrl=!flagSwhowUrl">Show URL</button>
    <div id="showUrls"> 
      <table class="table table-dark table-bordered" v-show="flagSwhowUrl">
        <thead >
          <tr>
            <th>#</th>
            <th>ORIGIN URL</th>
            <th>SHORT URL</th>
            <th>DATE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody >
          <tr v-for="(url, index) in showUrl[0]" :key="index" > 
            <th scope="row"> {{ +index+1 }} </th>
            <td height=50><a :href="url.originUrl"> {{ url.originUrl }} </a> </td>
            <td height=50><a :href ="url.urlShorten"> {{ url.urlShorten }} </a> </td>
            <td height=50> {{ url.date }} </td>
            <td height=50> {{ url.count }} </td>
          </tr>
        </tbody>
      </table>
    </div> 
  </div>
</template>

<script>
import { axiosInstance } from "../config/config.js";

export default {
  name: "HomePage",
  data() {
    return {
      url: this.url,
      urlShorten: this.urlShorten,
      errors: [],
      message: "",
      showUrl: [],
      shortUrl: {},
      flagSwhowUrl: false,
      flagShortUrl: false,
      urlShortLink: ""
    };
  },
  methods: {
    postGenerate() {
      axiosInstance("/home-page", { url: this.url }, "post")
        .then(resp => {
          this.urlShorten = resp.data.hash;
          this.message = resp.data.message;
        })
        .catch(e => {
          this.message = e;
        });
    },
    postSaveDb() {
      axiosInstance(
        "/home-page/savedb",
        { url: this.url, urlShorten: this.urlShorten },
        "post"
      )
        .then(resp => {
          this.message = resp.data.message;
          this.urlShortLink =
            window.location.origin + "/hash/" + resp.data.hash;
          this.flagShortUrl = true;
        })
        .catch(e => {
          this.message = e.response.data.message;
        });
    },
    postShowUrl() {
      axiosInstance("/home-page/show-url", {}, "post")
        .then(resp => {
          if (resp.data.message) {
            return (this.message = resp.data.message);
          }
          let a = {};
          for (let i = 0; i < resp.data.result.length; i++) {
            if (!a[i]) {
              a[i] = {};
            }
            a[i].originUrl = resp.data.result[i].url;
            a[i].urlShorten =
              window.location.origin +
              "/hash/" +
              resp.data.result[i].urlShorten;
            a[i].date = resp.data.result[i].date;
            a[i].count = resp.data.result[i].count;
          }
          this.showUrl.push(a);
        })
        .catch(e => {
          this.message = e;
        });
    },
    // hash() {
    //   axiosInstance("/hash/", {}, "post")
    //   .then (resp => {

    //   })
    //   .catch (e => {

    //   })
    // }
  },
  created() {
    this.postShowUrl();
  }
};
</script>

<style scoped>
td {
  overflow: auto;
  max-width: 400px;
  white-space: nowrap;
}
td,
th {
  background-color: bisque;
}
.error {
  color: red;
}
.text {
  font-weight: bold;
  font-size: 18px;
}
@media screen and (max-width: 768px) {
  .generateUrl{
    margin-top: 15px;
  }
  .btn {
    
    margin-bottom: 10px;
  }
}
</style>
