<template>
  <div class="row">
    <div class="top-message col-md-offset-3 col-md-6">
      <h1>Welcome to Bookers!!</h1>
      <p>In Bookers,</p>
      <p>you can share and exchange  your opinions , inpressions , and emotions</p>
      <p> about varioius books!</p>
      <div class="btn-wrapper">
        <div class="row">
          <router-link to="signin" class="btn btn-info col">Sign in</router-link>
          <router-link to="signup" class="btn btn-info col">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>

<style>
.btn-info {
  margin: 0 10px;
}
</style>
