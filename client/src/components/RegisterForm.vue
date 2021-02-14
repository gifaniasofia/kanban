<template>
  <div class="register-container">
    <div class="container-login-register position-center">
      <div class="login-register-content">
        <div class="login-register-form">
          <h2 class="form-title">Register</h2>
          <form id="register-form" @submit.prevent="register">
            <div class="form-group">
              <label for="register-name"><i class="fas fa-user"></i> Fullname</label>
              <input type="text" class="form-control" id="register-name" placeholder="Enter Fullname" v-model="dataRegister.name" required/>
            </div>

            <div class="form-group">
              <label for="register-email"><i class="fas fa-envelope"></i> Email Address</label>
              <input type="email" class="form-control" id="register-email" placeholder="Enter Email" v-model="dataRegister.email" required/>
            </div>
          
            <div class="form-group">
              <label for="register-password"><i class="fas fa-lock"></i> Password</label>
              <input type="password" class="form-control" id="register-password" placeholder="Enter password" v-model="dataRegister.password" aria-describedby="passwordHelpBlock" required/>
              <small id="passwordHelpBlock" class="form-text text-muted">
                Your password must be at least 6 characters long, contain at least one number, one lowercase alphabet, and one uppercase alphabet.
              </small>
            </div>
                
            <p> <button type="submit" class="btn" id="register-button-submit" style="background-color: #6737c3; color: #ffffff">Register</button></p>
          </form>
        </div>

        <div class="login-register-image">
          <figure><img src="../assets/work.png"></figure>
          <a href="#" class="login-link" @click.prevent="changePageLogin">I already have an account</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataRegister: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register() {
      this.$emit('register', this.dataRegister);
      this.dataRegister = {
        name: '',
        email: '',
        password: ''
      };
    },
    changePageLogin() {
      this.$emit('swapPage', 'login');
    }
  }
}
</script>

<style scoped>
.container-login-register {
	width: 900px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.position-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-register-content {
  display: flex;
	padding-top: 45px;
  padding-bottom: 45px;
}

.login-register-form, .login-register-image {
  width: 50%;
  overflow: hidden;
}

.login-register-form {
  margin-right: 90px;
  margin-left: 80px;
}

.login-register-image {
	width: 50rem;
  margin-left: 50px;
  margin-right: 20px;
  margin-top: 10px;
}

.form-group {
  position: relative;
  margin-bottom: 25px;
  overflow: hidden;
}

.form-group:last-child {
  margin-bottom: 0px;
}

.form-title {
  margin-bottom: 33px;
}

.register-link, .login-link {
  font-size: 14px;
  color: #222;
  display: block;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
}

figure {
  margin: 0;
}
</style>