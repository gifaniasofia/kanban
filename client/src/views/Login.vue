<template>
  <LoginForm
    @login="login"
    @swapPage="changePage"
    @dataGoogleUser="loginGoogle"
  ></LoginForm>
</template>

<script>
import LoginForm from '../components/LoginForm';

export default {
  components: {
    LoginForm
  },
  methods: {
    login(dataLogin) {
      this.$emit('login', dataLogin);
    },
    changePage(pageName) {
      this.$emit('swapPage', pageName);
    },
    loginGoogle(dataGoogleUser) {
      this.$emit('dataGoogleUser', dataGoogleUser);
    }
  }
}
</script>

<style scoped>

</style>