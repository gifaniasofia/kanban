<template>
  <div>
    <b-modal
      centered
      :visible="show"
      @change="toggleShow"
      ref="modal"
      ok-text="Save"
      @ok="submit"
    >
      <template v-slot:modal-header style="text-align: center;">
        <h5
          style="
                font-weight: bolder; 
                font-size: 20px; 
                text-align: center"
        >Edit Task</h5>
        <b-button size="sm" variant="outline-danger" @click.prevent="toggleShow(false)">
        &times;
        </b-button>
      </template>
      <b-form ref="form" @submit.stop.prevent="submit">
        <b-form-group
          label="Title"
          label-for="title-input"
          type="text"
          invalid-feedback="Task title is required"
        >
          <b-form-input
            id="title-input"
            v-model="dataEditTask.title"
            :state="dataEditTask.title.length > 0"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="desc-input">
          <b-form-textarea
            id="desc-input"
            v-model="dataEditTask.description"
            :state="dataEditTask.description.length <= 255"
            rows="5"
          ></b-form-textarea>
          <b-form-invalid-feedback :state="dataEditTask.description.length <= 255">
            Your task description must be 0-255 characters long.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            type="submit"
            variant="success"
            class="float-right tombol-sub"
            @click="submit"
          >Save</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    currentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      dataEditTask: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    submit(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.editTask();
    },
    editTask() {
      this.$emit('editTask', {
        id: this.$props.currentData.id,
        ...this.dataEditTask
      })

      if (this.dataEditTask.title && this.dataEditTask.description.length <= 255) {
        this.toggleShow(false);
      } else {
        this.toggleShow(true);
      }
    },
    getCurrentData() {
      this.dataEditTask = JSON.parse(JSON.stringify(this.$props.currentData));
    },
    toggleShow(value) {
      this.$emit('toggleShow', value);
    }
  },
  created() {
    this.getCurrentData();
  }
}
</script>

<style>

</style>