<template>
  <div>
    <b-card-header
      :header-bg-variant="color"
      header-text-variant="white"
    >
      <div class="d-flex bd-highlight">
        <div class="flex-grow-1 bd-highlight">
          <h5>
            <i class="fas fa-clipboard-list" v-if="title === 'Backlog'"></i>
            <i class="fas fa-briefcase" v-else-if="title === 'Todo'"></i>
            <i class="fas fa-spinner" v-else-if="title === 'Doing'"></i>
            <i class="far fa-check-square" v-else-if="title === 'Done'"></i>
            {{title}}
          </h5>
        </div>
        <div class="bd-highlight" @click.prevent="showModalCreate">
          <b-button size="sm" class="my-2 my-sm-0" variant="outline-light" style="border:none;">
            <i class="fas fa-plus-circle"></i>
          </b-button>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="scroll" style="border: 1px lightgray solid; padding: 5px 10px;">
      <draggable class="list-group" :list="list" group="people" :move="onMove">
        <div class="item" v-for="task in list" :key="task.id" :style="task.style">
          <Card
            :task="task"
            @changeTest="test = $event"
            @removeTask="removeTask"
            @editTask="editTask"
          ></Card>
        </div>
      </draggable>
    </b-card-body>

    <ModalAdd
      :title="title"
      :show="showCreate"
      @toggleShow="toggleModalCreate"
      @createTask="createTask"
    ></ModalAdd>

  </div>
</template>

<script>
import draggable from "vuedraggable";
import ModalAdd from './ModalAdd';
import Card from '../components/Card';
import Swal from 'sweetalert2';

export default {
  props: ['title', 'list', 'color'],
  components: {
    draggable,
    Card,
    ModalAdd
  },
  data() {
    return {
      showCreate: false
    }
  },
  methods: {
    showModalCreate() {
      this.showCreate = true;
    },
    toggleModalCreate(value) {
      this.showCreate = value;
    },
    createTask(data) {
      this.$emit('createTask', data);
    },
    removeTask(id) {
      this.$emit('removeTask', id);
    },
    editTask(data) {
      this.$emit('editTask', data);
    },
    onMove(evt) {
      let isAuthorized = evt.draggedContext.element.UserId == localStorage.getItem('userLoginId');
      if (!isAuthorized) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'You are not authorized to perform this action',
        })
      }
      return isAuthorized;
    }
  }
}
</script>

<style scoped>

.scroll {
	overflow-y: scroll;
	min-height: 77vh;
  max-height: 77vh;
  padding: 1rem;
}

.item {
	margin-top: 5px;
	margin-bottom: 5px;
  width: calc(100% - 5px);
  background-color: #fffdfd !important;
  padding: 0;
}

</style>