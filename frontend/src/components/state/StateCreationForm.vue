<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name" v-model="newName" />
      </div>
      <div class="form-group col-md-6">
        <label for="name">Abreviação</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="newAbbreviation"
        />
      </div>
      <div
        class="form-group d-flex align-items-end col-md-2 justify-content-center"
      >
        <button
          type="submit"
          class="btn btn-primary w-75"
          @click="createStateHandle"
        >
          Criar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "StateCreationForm",
  components: {},
  data() {
    return {
      newName: "",
      newAbbreviation: "",
    };
  },
  props: {
    createState: { type: Function },
  },
  methods: {
    createStateHandle(e) {
      e.preventDefault();
      this.createState(this.newName, this.newAbbreviation);
    },
  },
};
</script>

<style>
</style>