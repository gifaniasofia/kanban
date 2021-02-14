<template>
  <div class="main-page">
    <Navbar @swapPage="changePage"></Navbar>
    <BoardList
      :list="list"
      @createTask="createTask"
      @removeTask="removeTask"
      @editTask="editTask"
    ></BoardList>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import BoardList from '../components/BoardList';

export default {
  props: ['list'],
  components: {
    Navbar,
    BoardList
  },
  methods: {
    changePage(pageName) {
      this.$emit('swapPage', pageName);
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
  },
  mounted() {
    this.$emit('fetchData');
  }
}
</script>

<style scoped>
.card_deck {
  width: 18rem;
}
</style>