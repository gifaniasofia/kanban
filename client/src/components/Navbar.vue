<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="faded">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-button pill variant class="colorNav" style="border:none;">
            <b-navbar-brand href="#">
              <img src="../assets/logo.png" width="28" height="28" alt="">
              <span style="font-weight: bolder; color: white;">Kanban Board</span>
            </b-navbar-brand>
          </b-button>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-button size="sm" v-b-tooltip.hover="{ variant: 'dark' }" title="Drag the task card to update category" variant class="colorHelp"><i class="far fa-question-circle"></i></b-button>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em style="text-decoration: underline; color: black;"><i class="fas fa-user-circle"></i> {{userLogin}}</em>
            </template>
            <b-dropdown-item href="#" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i> Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userLogin: localStorage.userLogin
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        console.log('User signed out.');
      })
      this.$emit('swapPage', 'login');
    }
  }
}
</script>

<style scoped>
.colorNav {
	background-color:#bfb8de !important;
}

.colorHelp {
  background-color: #5b71ad !important;
}
</style>