<template>
  <form>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="name">Nome</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="filterName"
        />
      </div>
      <div class="form-group col-md-3">
        <label for="name">Abreviação</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="filterAbbreviation"
        />
      </div>
      <div
        class="form-group d-flex align-items-end col-md-3 justify-content-around"
      >
        <button
          type="submit"
          class="btn btn-primary w-50 mr-2"
          @click="setFilterHandle"
        >
          Filtrar
        </button>
        <button
          type="submit"
          class="btn btn-danger w-50 mr-2"
          @click="clearFilter"
        >
          Limpar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "CityFilter",
  components: {},
  data() {
    return {
      filterName: "",
      filterAbbreviation: "",
    };
  },
  props: {
    states: Array,
    setFilter: { type: Function },
  },
  methods: {
    setFilterHandle(e) {
      e.preventDefault();
      this.setFilter(this.filterName, this.filterAbbreviation);
    },
    clearFilter(e) {
      e.preventDefault();
      this.setFilter(null, null);
    },
  },
};
</script>

<style>
</style>