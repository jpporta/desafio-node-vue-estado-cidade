<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Nome</label>
        <input type="text" class="form-control" id="name" v-model="newName" />
      </div>
      <div class="form-group col-md-4">
        <label for="inputState">Estado</label>
        <select id="inputState" class="form-control" v-model="newStateId">
          <option v-for="state in states" :key="state._id" :value="state._id">
            {{ state.name }}
          </option>
        </select>
      </div>
      <div
        class="form-group d-flex align-items-end col-md-2 justify-content-center"
      >
        <button
          type="submit"
          class="btn btn-primary w-75"
          @click="createCityHandle"
        >
          Criar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "CidadeCreationForm",
  components: {},
  data() {
    return {
      newName: "",
      newStateId: "",
    };
  },
  props: {
    createCity: { type: Function },
    states: Array,
  },
  methods: {
    createCityHandle(e) {
      e.preventDefault();
      this.createCity(this.newName, this.newStateId);
    },
  },
};
</script>

<style>
</style>