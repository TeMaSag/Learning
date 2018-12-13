<template>
<div> 
  <div class="form-group">
    <input type="text" class="form-control" v-model.lazy="term" v-debounce="1000" v-model="search" placeholder="search field 'name'">
  </div>
  <div>
    <div style="font-weight: bold" > Parameter search </div>
    <!-- <span class="price"> -->
      <span>Price Down:
        <select v-on:click="getCars()" v-model="yearDown" class="filteryear" id="filteryearDown">
          <option  v-for="(year, index) in years" :key="index"> {{ year }} </option>
        </select>
      </span>
      <span class="price"> Price Up:
        <select v-model="yearUp" v-on:click="getCars()" class="selectpicker"  selected="All years" id="filteryearUp">
          <option  v-for="(year, index) in years" :key="index"> {{ year }} </option>
        </select> 
      </span>  
    <!-- </span>   -->
    <div class="row" style="margin-top:10px;">
      <div class="col-lg-6">
        <div class="input-group">
          <span class="input-group-addon">
          </span>
          <input type="number" class="form-control" v-model.lazy="term" v-debounce="1000" id="filterPricefrom" v-model="priceDown"   placeholder="price from">
        </div>
      </div>
      <div class="col-lg-6">
        <div class="input-group">
          <span class="input-group-addon">
          </span>
          <input type="number" class="form-control" v-model.lazy="term" v-debounce="1000" id="filterPricefrom" v-model="priceUp"   placeholder="price from">
        </div>
      </div>
  </div>
  </div>
  <div class="tables">
    <table class="table table-dark table-bordered" style="background-color:grey;" id="mytable">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">year</th>
          <th scope="col">price</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(post, index) in posts" :key="index" >
            <th scope="row"> {{ post.id }} </th>
            <td height=50> {{ post.name }} </td>
            <td> {{ post.year }} </td>
            <td height=50> {{ post.price }} </td>
          </tr>        
      </tbody>
    </table> 
    <div class="pager container">
      <button v-for="(paginate, index) in paginates" :key="index" v-on:click="getCars(paginate)"  :class="{ isActive: flagclass[paginate] }"> {{ paginate }}  </button>  
    </div>    
  </div>
  
</div>   
</template>

<script>
import { axiosInstance } from "../config/config.js";
import debounce from "v-debounce";

export default {
  name: "app",
  data() {
    return {
      posts: [],
      errors: [],
      years: [],
      paginates: [],
      yearDown: this.yearDown,
      yearUp: this.yearUp,
      priceUp: this.priceUp,
      priceDown: this.priceDown,
      search: this.search,
      flagclass: [],
      term: ""
    };
  },
  methods: {
    editGoogleTable() {
      axiosInstance("/google-sheets", {} , "post")
        .then(resp => {
          this.urlShorten = resp.data.hash;
          this.message = resp.data.message;
        })
        .catch(e => {
          this.message = e;
        });
    },
    initYears() {
      this.years.push("All years");
      for (let i = 2009; i < 2019; i++) {
        this.years.push(i);
      }
    },
    createdTable(cars, pag) {
      for (let i = 0; i < this.flagclass.length; i++) {
        this.flagclass[i] = false;
      }
      this.flagclass[pag] = true;
      this.paginates = [];
      this.posts = [];
      let countPaginate = Math.ceil(cars.length / 5);
      for (let i = 0; i < countPaginate; i++) {
        this.paginates.push(i + 1);
      }
      let limit = 5;
      let offset = limit * pag - limit;
      let intermediateValue = {};
      for (let i = offset, index = 0; i < offset + limit; i++, index++) {
        intermediateValue = cars[i];
        intermediateValue.id = i + 1;
        this.posts.push(intermediateValue);
      }
    },
    getCars(page) {
      const pag = page || 1;
      let limit;
      let offset;
      axiosInstance(
        `/filter-cars`,
        {
          search: this.search,
          yearDown: this.yearDown,
          yearUp: this.yearUp,
          priceUp: this.priceUp,
          priceDown: this.priceDown,
          offset: offset,
          limit: limit
        },
        "get"
      )
        .then(resp => {
          this.createdTable(resp.data, pag);
        })
        .catch(e => {
          // this.errors.push(e);
          console.log("here you were");
        });
    }
  },
  watch: {
    term() {
      console.log("WORKING WORKING");
      return this.getCars();
    }
  },
  directives: {
    debounce
  },
  created() {
    this.initYears();
    this.getCars(1);
  },
  components: {}
};
</script>

<style>
.pager {
  display: block;
}
.pager button {
  margin-right: 10px;
  width: 40px;
  height: 30px;
}
.isActive {
  color: red;
}
.tables {
  margin-top: 10px;
}
td {
  overflow: auto;
  max-width: 400px;
  white-space: nowrap;
}
@media screen and (max-width: 768px) {
  .price {
    display: block;
    /* clear: both; */
  }
}
</style>


  