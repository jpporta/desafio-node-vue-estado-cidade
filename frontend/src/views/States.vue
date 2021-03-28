<template>
  <div class="estados">
    <h1 class="display-2">Estados</h1>
    <div class="d-flex w-25 justify-content-between">
      <button
        v-bind:class="[
          isCreating ? 'btn btn-primary' : 'btn btn-outline-primary',
        ]"
        @click="toggleCreation"
      >
        Criar Novo Estado
      </button>
      <button
        v-bind:class="[
          isFiltering ? 'btn btn-primary' : 'btn btn-outline-primary',
        ]"
        @click="toggleFilter"
      >
        Filtrar
      </button>
    </div>
    <hr />
    <div v-show="isCreating">
      <div class="alert alert-danger" v-if="errors.creation.hasError">
        {{ errors.creation.errorMsg }}
      </div>
      <StateCreationForm :createState="createState" />
      <hr />
    </div>
    <div v-show="isFiltering">
      <StateFilter :setFilter="setFilter" />
      <hr />
    </div>

    <StateList
      :deleteState="deleteState"
      :updateState="updateState"
      :states="states"
    />
    <nav aria-label="..." class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li
          v-bind:class="[
            pagination.page === 0 ? 'page-item disabled' : 'page-item',
          ]"
        >
          <a class="page-link" @click="() => setPage(this.pagination.page - 1)"
            >Anterior</a
          >
        </li>
        <li
          v-bind:class="[
            pagination.page + 1 === p ? 'page-item active' : 'page-item',
          ]"
          v-for="p in pagination.pages"
          :key="p"
        >
          <a class="page-link" @click="() => setPage(p - 1)">{{ p }}</a>
        </li>
        <li
          v-bind:class="[
            Math.ceil(this.pagination.total / this.pagination.limit) ===
            this.pagination.page + 1
              ? 'page-item disabled'
              : 'page-item',
          ]"
        >
          <a class="page-link" @click="() => setPage(this.pagination.page + 1)"
            >Próximo</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import StateCreationForm from "../components/state/StateCreationForm";
import StateList from "../components/state/StateList";
import StateFilter from "../components/state/StateFilter";
import { instance } from "../utils/backend";

export default {
  name: "States",
  components: {
    StateCreationForm,
    StateList,
    StateFilter,
  },
  data() {
    return {
      states: [],
      isCreating: false,
      isFiltering: false,
      filters: {},
      errors: {
        creation: {
          errorMsg: "Algo deu errado, por favor tente novamente mais tarde",
          hasError: false,
        },
      },
      pagination: {
        pages: [],
        limit: 10,
        page: 0,
        total: 0,
      },
    };
  },
  methods: {
    async deleteState(id) {
      const index = this.states.findIndex((o) => o.id === id);
      this.states.splice(index, 1);
      await instance.delete(`/states/${id}`);
      this.states = await this.listStates();
    },
    async createState(name, abbreviation) {
      try {
        await instance.post("/states", { name, abbreviation });
      } catch (err) {
        this.handleErrors(err.response.status, "creation");
      }
      this.states = await this.listStates();
    },
    async updateState(id, name, abbreviation) {
      await instance.put(`/states/${id}`, { name, abbreviation });
      this.states = await this.listStates();
    },
    toggleCreation() {
      this.isCreating = !this.isCreating;
      if (this.isCreating) this.isFiltering = false;
    },
    toggleFilter() {
      this.isFiltering = !this.isFiltering;
      if (this.isFiltering) this.isCreating = false;
    },
    async setFilter(name, abbreviation) {
      const filters = {};
      if (name) filters.name = name;
      if (abbreviation) filters.abbreviation = abbreviation;
      this.filters = filters;
      this.states = await this.listStates();
    },
    async listStates() {
      const states = await instance.get("/states", {
        params: { ...this.filters, ...this.pagination },
      });
      this.pagination.total = states.data.count;
      const pages = [];
      for (
        let i = 1;
        i <= this.pagination.total / this.pagination.limit + 1;
        i++
      ) {
        pages.push(i);
      }
      this.pagination.pages = pages;
      return states.data.rows;
    },
    async setPage(page) {
      this.pagination.page = page;
      this.states = await this.listStates();
    },
    handleErrors(code, type) {
      this.errors.creation.hasError = true;
      if (code === 409) {
        this.errors[type].errorMsg =
          "Já existe estado com esse nome ou com essa abreviação!";
      } else if (code === 400) {
        this.errors[type].errorMsg = "Revise os dados inseridos";
      } else if (code === 404) {
        this.errors[type].errorMsg = "Estado não encontrada";
      } else {
        this.errors[type].errorMsg =
          "Algo deu errado, por favor tente novamente mais tarde";
      }
    },
  },
  async mounted() {
    const states = await this.listStates();
    this.states = states;
  },
};
</script>
