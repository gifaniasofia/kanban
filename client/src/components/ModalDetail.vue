<template>
  <div>
    <b-modal
      centered
      scrollable
      :visible="show"
      @change="toggleShow"
      ref="modal"
      ok-only
    >
      <template v-slot:modal-header>
        <h5
          style="
                font-weight: bolder; 
                font-size: 20px; 
                text-align: center"
        >{{task.title}}</h5>
        <b-button size="sm" variant="outline-danger" @click.prevent="toggleShow(false)">
        &times;
        </b-button>
      </template>

      <p class="my-4">
        <strong>Description : </strong><br/>
        {{ task.description }}
      </p>

      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="success"
            class="float-right tombol-sub"
            @click="toggleShow(false)"
          >Ok</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: {}
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleShow(value) {
      this.$emit('toggleShow', value);
    }
  }
}
</script>

<style>
</style>