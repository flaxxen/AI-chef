<template>
  <h1 class="h1">Sign up</h1>
  <div class="signup">
    <input type="text" v-model="name" placeholder="Enter Name" class="input"/>
    <input type="text" v-model="email" placeholder="Enter E-mail" class="input"/>
    <input type="password" v-model="password" placeholder="Enter Password" class="input"/>
    <button v-on:click="SignUp" class="button">Sign Up</button>
    <p>
      <RouterLink to="/login" class="login">Login</RouterLink>

    </p>
  </div>
</template>

<script>
export default {
  name: "SignUp"

}
</script>

<style>


.h1{
  margin-bottom: 20px;
  color: #00BD7E;
}

.signup {
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

.login {
  color: dodgerblue;
  margin-top: 15px;
}

</style>