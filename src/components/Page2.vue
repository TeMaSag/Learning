<template>
  <div>
    <input type="text" class="form-control" v-model="input2" id="urlToParcsing" placeholder="Url to parsing">
      <button><router-link to="/page1">Page1</router-link></button>
  </div>
</template>

<script>
export default {
data() {
  return {
    input2: ''
  }
}
}
</script>

<style>

</style>
