<template>
  <div>
    <b-modal
      centered
      :visible="show"
      @change="toggleShow"
      ref="modal"
      ok-text="Save"
      @show="resetModal"
      @hidden="resetModal"
      @ok="submit"
    >
      <template v-slot:modal-header style="text-align: center;">
        <h5
          style="
                font-weight: bolder; 
                font-size: 20px; 
                text-align: center"
        >Add New {{title}}</h5>
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
            v-model="dataNewTask.title"
            placeholder="Enter task title"
            :state="dataNewTask.title.length > 0"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="desc-input">
          <b-form-textarea
            id="desc-input"
            v-model="dataNewTask.description"
            :state="dataNewTask.description.length <= 255"
            placeholder="Enter task description max 255 characters..."
            rows="5"
          ></b-form-textarea>
          <b-form-invalid-feedback :state="dataNewTask.description.length <= 255">
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
            @click.prevent="submit"
          >Save</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dataNewTask: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    resetModal() {
      this.dataNewTask = {
        title: '',
        description: ''
      }
    },
    submit(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.createTask();
    },
    createTask() {
      this.$emit('createTask', {
        category: this.$props.title,
        ...this.dataNewTask
      });

      if (this.dataNewTask.title && this.dataNewTask.description.length <= 255) {
        this.toggleShow(false);
      } else {
        this.toggleShow(true);
      }
    },
    toggleShow(value) {
      this.$emit('toggleShow', value);
    }
  }
}
</script>

<style>

</style>