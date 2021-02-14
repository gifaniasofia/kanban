<template>
  <div>
    <b-skeleton-wrapper :loading="loading">
      <template #loading>
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
      </template>

      <b-card class="card-task-item">
        <b-card-body style="padding: 0;">
          <b-button size="sm" class="my-0 my-sm-0 btn-small" variant="info" @click.prevent="showModalDetail">
            <i class="fas fa-info-circle"></i>
          </b-button>
          <b-button size="sm" class="my-0 my-sm-0 btn-small" variant="warning" @click.prevent="showModalEdit">
            <i class="fas fa-edit"></i>
          </b-button>
          <b-button size="sm" class="my-0 my-sm-0 btn-small" variant="danger" @click.prevent="removeTask(task.id)">
            <i class="fas fa-trash-alt"></i>
          </b-button>
          <hr>
          <b-card-title>{{ task.title }}</b-card-title>
          <b-card-sub-title class="mb-2">
            <p>Created at: {{ convertDate(task.createdAt) }} <br/>
               Created by: {{ task.User.name }}
            </p>
          </b-card-sub-title>
        </b-card-body>
      </b-card>
    </b-skeleton-wrapper>

    <ModalDetail
      :show="showDetail"
      @toggleShow="toggleModalDetail"
      :task="task"
    ></ModalDetail>

    <ModalEdit
      :show="showEdit"
      @toggleShow="toggleModalEdit"
      :currentData="task"
      @editTask="editTask"
    ></ModalEdit>
  </div>
</template>

<script>
import ModalDetail from '../components/ModalDetail';
import ModalEdit from '../components/ModalEdit';

export default {
  props: ['task'],
  components: {
    ModalDetail,
    ModalEdit
  },
  data() {
    return {
      showDetail: false,
      showEdit: false,
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 2
    }
  },
  methods: {
    showModalDetail() {
      this.showDetail = true;
    },
    showModalEdit() {
      this.showEdit = true;
    },
    editTask(data) {
      this.$emit('editTask', data);
    },
    removeTask(id) {
      this.$emit('removeTask', id);
    },
    toggleModalDetail(value) {
      this.showDetail = value;
    },
    toggleModalEdit(value) {
      this.showEdit = value;
    },
    convertDate(d) {
      let date = new Date(d).toString().split(' ');
      let result = ''
      for (let i = 0; i < 5; i ++) {
        if (i === 4) {
          let time = date[i].substr(0, 5);
          result += time;
        } else {
          result += `${date[i]} `;
        }
      }
      return result;
    },
    clearLoadingTimeInterval() {
      clearInterval(this.$_loadingTimeInterval);
      this.$_loadingTimeInterval = null;
    },
    startLoading() {
      this.loading = true;
      this.loadingTime = 0;
    }
  },
  watch: {
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval();

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime++
          }, 1000)
        }
      }
    },
    loadingTime(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === this.maxLoadingTime) {
          this.loading = false;
        }
      }
    }
  },
  created() {
    this.$_loadingTimeInterval = null;
  },
  mounted() {
    this.startLoading();
  },
}
</script>

<style scoped>
.card {
  background-color: #fffdfd !important;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.5);
  transition: height 0.3s, box-shadow 0.3s;
}

.card:hover {
  min-height: 11rem;
  box-shadow: 20px 20px 40px 0px rgba(0,0,0,0.5);
  cursor: pointer;
}

.card-task-item {
	min-height: 8.5rem;
	background-color: #ffffff !important;
  padding: 0;
}

.card-title {
	font-weight: bold;
	font-size: 15px;
}

.card-subtitle {
	font-size: 12px;
}

.btn-small {
	text-decoration: none;
	color: #ffffff !important;
  min-width: 1.8em;
  padding: .1em !important;
  margin-left: .1em;
  margin-right: .1em;
}
</style>