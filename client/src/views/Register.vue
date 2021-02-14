<template>
  <RegisterForm
    @swapPage="changePage"
    @register="register"
  ></RegisterForm>
</template>

<script>
import RegisterForm from '../components/RegisterForm';

export default {
  components: {
    RegisterForm
  },
  methods: {
    changePage(pageName) {
      this.$emit('swapPage', pageName);
    },
    register(dataRegister) {
      this.$emit('register', dataRegister);
    }
  }
}
</script>

<style>
</style>