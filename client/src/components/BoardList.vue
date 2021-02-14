<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col col lg="3" md="6" sm="12" class="mt-3 card_deck">
          <Board
            title="Backlog"
            color="primary"
            :list="listBacklog"
            @createTask="createTask"
            @removeTask="removeTask"
            @editTask="editTask"
          ></Board>
        </b-col>
        <b-col col lg="3" md="6" sm="12" class="mt-3 card_deck">
          <Board
            title="Todo"
            color="dark"
            :list="listTodo"
            @createTask="createTask"
            @removeTask="removeTask"
            @editTask="editTask"
          ></Board>
        </b-col>
        <b-col col lg="3" md="6" sm="12" class="mt-3 card_deck">
          <Board
            title="Doing"
            color="secondary"
            :list="listDoing"
            @createTask="createTask"
            @removeTask="removeTask"
            @editTask="editTask"
          ></Board>
        </b-col>
        <b-col col lg="3" md="6" sm="12" class="mt-3 card_deck">
          <Board
            title="Done"
            color="success"
            :list="listDone"
            @createTask="createTask"
            @removeTask="removeTask"
            @editTask="editTask"
          ></Board>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Board from './Board';

export default {
  props: ['list'],
  components: {
    Board
  },
  methods: {
    createTask(data) {
      this.$emit('createTask', data);
    },
    removeTask(id) {
      this.$emit('removeTask', id);
    },
    editTask(data) {
      this.$emit('editTask', data);
    },
  },
  computed: {
    listBacklog() {
      return this.$props.list.backlogs;
    },
    listTodo() {
      return this.$props.list.todos;
    },
    listDoing() {
      return this.$props.list.doings;
    },
    listDone() {
      return this.$props.list.dones;
    }
  },
}
</script>

<style>

</style>