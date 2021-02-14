<template>
  <div>
    <Login
      v-if="page === 'login'"
      @swapPage="changePage"
      @login="login"
      @dataGoogleUser="loginGoogle"
    ></Login>
    <Register
      v-else-if="page === 'register'"
      @swapPage="changePage"
      @register="register"
    ></Register>
    <Home
      v-else-if="page === 'home'"
      @swapPage="changePage"
      :list="dataTasks"
      @fetchData="showAll"
      @createTask="createTask"
      @removeTask="removeTask"
      @editTask="editTask"
    ></Home>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

export default {
  components: {
    Home,
    Login,
    Register
  },
  data() {
    return {
      page: 'login',
      urlServer: 'https://kanban-board-01.herokuapp.com',
      dataTasks: {
        backlogs: [],
        todos: [],
        doings: [],
        dones: []
      },
    }
  },
  methods: {
    swalFail(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err}`,
      })
    },
    changePage(pageName) {
      this.page = pageName;
    },
    register(dataRegister) {
      axios({
        url: `${this.urlServer}/users/register`,
        method: 'POST',
        data: {
          name: dataRegister.name,
          email: dataRegister.email,
          password: dataRegister.password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Hello ${data.name}! Please login first`
          })

          this.page = 'login'
        })
        .catch(err => {
          this.swalFail(err.response.data.errors);
        })
    },
    login(dataLogin) {
      axios({
        url: `${this.urlServer}/users/login`,
        method: 'POST',
        data: {
          email: dataLogin.email,
          password: dataLogin.password
        }
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('userLogin', data.email);
          localStorage.setItem('userLoginId', data.id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Hello ${data.name}!`,
            text: 'Have a nice day!',
            showConfirmButton: false,
            timer: 1500
          })
          this.page = 'home';
        })
        .catch(err => {
          console.log(err);
          this.swalFail(err.response.data.errors);
        })
    },
    loginGoogle(googleUser) {
      const id_token = googleUser.getAuthResponse().id_token;

      axios({
        url: `${this.urlServer}/users/logingoogle`,
        method: 'POST',
        data: {
          googleToken: id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('userLogin', data.email);
          localStorage.setItem('userLoginId', data.id);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Hello ${data.name}!`,
            text: 'Have a nice day!',
            showConfirmButton: false,
            timer: 1500
          })
          this.page = 'home';
        })
        .catch(err => {
          console.log(err);
        })
    },
    showAll() {
      axios({
        url: `${this.urlServer}/tasks`,
        method: 'GET',
        headers: { 
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.dataTasks.backlogs = data.filter(task => {
            return task.category === "backlog"
          });
          this.dataTasks.todos = data.filter(task => {
            return task.category === "todo"
          });
          this.dataTasks.doings = data.filter(task => {
            return task.category === "doing"
          });
          this.dataTasks.dones = data.filter(task => {
            return task.category === "done"
          });

        })
        .catch((err) => {
          console.log(err);
        })
    },
    createTask(data) {
      axios({
        url: `${this.urlServer}/tasks`,
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: data.title,
          description: data.description,
          category: data.category.toLowerCase()
        }
      })
        .then(({ data }) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Success create new task!`,
            showConfirmButton: false,
            timer: 1500
          })
          this.showAll();
        })
        .catch(err => {
          this.swalFail(err.response.data.errors);
        })
    },
    removeTask(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#24a944',
        cancelButtonColor: '#dc3546',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.value) {
          axios({
            url: `${this.urlServer}/tasks/${id}`,
            method: 'DELETE',
            headers: {
              access_token: localStorage.getItem('access_token')
            }
          })
            .then(response => {
              console.log(response);
              this.showAll();
              Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.errors}`,
              })
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your task is safe!',
            'error'
          )
        }
      })
    },
    editTask(data) {
      axios({
        url: `${this.urlServer}/tasks/${data.id}`,
        method: `PUT`,
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          title: data.title,
          description: data.description
        }
      })
        .then(({ data }) => {
          this.showAll();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Success edit task!`,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(err => {
          this.swalFail(err.response.data.errors);
        })
    },
  },
  computed: {
    backlog() {
      return this.dataTasks.backlogs;
    },
    todo() {
      return this.dataTasks.todos;
    },
    doing() {
      return this.dataTasks.doings;
    },
    done() {
      return this.dataTasks.dones;
    }
  },
  watch: {
    backlog: function() {
      this.dataTasks.backlogs.forEach(task => {
        if (task.status !== "backlog") {
          axios({
            url:`${this.urlServer}/tasks/${task.id}`,
            method: 'PATCH',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              category: 'backlog'
            }
          })
          .then((response) => {
            // console.log(response);
          })
          .catch(err => {
            // console.log(err);
          })
        }
      })
    },
    todo: function() {
      this.dataTasks.todos.forEach(task => {
        if (task.status !== "todo") {
          axios({
            url:`${this.urlServer}/tasks/${task.id}`,
            method: 'PATCH',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              category: 'todo'
            }
          })
          .then((response) => {
            // console.log(response);
          })
          .catch(err => {
            // console.log(err);
          })
        }
      })
    },
    doing: function() {
      this.dataTasks.doings.forEach(task => {
        if (task.status !== "doing") {
          axios({
            url:`${this.urlServer}/tasks/${task.id}`,
            method: 'PATCH',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              category: 'doing'
            }
          })
          .then((response) => {
            // console.log(response);
          })
          .catch(err => {
            // console.log(err);
          })
        }
      })
    },
    done: function() {
      this.dataTasks.dones.forEach(task => {
        if (task.status !== "done") {
          axios({
            url:`${this.urlServer}/tasks/${task.id}`,
            method: 'PATCH',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              category: 'done'
            }
          })
          .then((response) => {
            // console.log(response);
          })
          .catch(err => {
            // console.log(err);
          })
        }
      })
    }
  }
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

html, body {
  min-height: 100vh;
  background-size: cover !important;
  background-image: url('./assets/background.jpg');
}
</style>