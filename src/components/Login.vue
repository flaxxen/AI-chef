<template>
  <h1 class="h1">Here you can login</h1>

  <div class="login">
    <input type="text" v-model="email" placeholder="Enter E-mail" class="input" />
    <input type="password" v-model="password" placeholder="Enter Password" class="input" />
    <button v-on:click="Login"  class="button">Login</button>

    <RouterLink to="signup" class="sign">Sign up</RouterLink>

  </div>
</template>



<script>
export default {
  name: "Login"
}
</script>

<style>


.h1{
  margin-bottom: 20px;
  color: #00BD7E;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.button {
  background-color: #4CAF50;
  color: white;
  padding: 7px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.sign {
  color: dodgerblue;
  margin-top: 15px;
}

</style>