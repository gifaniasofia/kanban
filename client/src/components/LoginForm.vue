<template>
  <div class="login-container">
    <div class="container-login-register position-center">
      <div class="login-register-content">
        <div class="login-register-image">
          <figure><img src="../assets/work.png" alt="sigin image"></figure>
          <a href="#" class="register-link" @click.prevent="changePageRegister">Create an account</a>
        </div>

        <div class="login-register-form">
          <h2 class="form-title">Login</h2>
          <form id="login-form" @submit.prevent="login">
            <div class="form-group">
              <label for="login-email"><i class="fas fa-envelope"></i> Email Address</label>
              <input type="email" class="form-control" id="login-email" placeholder="Enter Email" v-model="dataLogin.email" required/>
            </div>
          
            <div class="form-group">
              <label for="login-password"><i class="fas fa-lock"></i> Password</label>
              <input type="password" class="form-control" id="login-password" placeholder="Enter password" v-model="dataLogin.password" required/>
            </div>
                
            <p> <button type="submit" class="btn" id="login-button-submit" style="background-color: #6737c3; color: #ffffff">Login</button></p>
          </form>

          <div class="social-login">
            <span class="social-label">Or login with</span>
            <ul class="socials">
              <li><GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from 'vue-google-login';

export default {
  components: {
    GoogleLogin
  },
  data() {
    return {
      dataLogin: {
        email: '',
        password: ''
      },
      params: {
        client_id: '527048370228-4905bped8oav5v60carodrvt3e4330er.apps.googleusercontent.com'
      },
      renderParams: {
        width: 180,
        height: 35,
        longtitle: true
      }
    }
  },
  methods: {
    login() {
      this.$emit('login', this.dataLogin);
      this.dataLogin = {
        email: '',
        password: ''
      };
    },
    changePageRegister() {
      this.$emit('swapPage', 'register');
    },
    onSuccess(googleUser) {
      this.$emit('dataGoogleUser', googleUser);
    },
    onFailure(err) {
      console.log(err);
    }
  },
  created() {
    if(localStorage.getItem('access_token')) {
      this.$emit('swapPage', 'home');
    } else {
      this.$emit('swapPage', 'login');
    }
  }
}
</script>

<style>
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
	padding-top: 67px;
  padding-bottom: 87px;
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

.social-login {
  align-items: center;
  margin-top: 20px;
}

.social-label {
  display: inline-block;
  margin-right: 15px;
  font-size: 13px;
}

.socials li {
  padding: 5px 15px 5px 0;
}

.socials {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>