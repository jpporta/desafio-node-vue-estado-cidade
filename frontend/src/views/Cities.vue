<template>
  <div class="cidades">
    <h1 class="display-2">Cidades</h1>
    <div class="d-flex w-25 justify-content-between">
      <button
        v-bind:class="[
          isCreating ? 'btn btn-primary' : 'btn btn-outline-primary',
        ]"
        @click="toggleCreation"
      >
        Criar Nova Cidade
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
      <CityCreationForm :createCity="createCity" :states="states" />
      <hr />
    </div>
    <div v-show="isFiltering">
      <CityFilter :setFilter="setFilter" :states="states" />
      <hr />
    </div>

    <CityList
      :cities="cities"
      :deleteCity="deleteCity"
      :updateCity="updateCity"
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
import CityCreationForm from "../components/cities/CityCreationForm";
import CityList from "../components/cities/CityList";
import CityFilter from "../components/cities/CityFilter";
import { instance } from "../utils/backend";

export default {
  name: "Cities",
  components: {
    CityCreationForm,
    CityList,
    CityFilter,
  },
  data() {
    return {
      cities: [],
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
    async deleteCity(id) {
      const index = this.cities.findIndex((o) => o.id === id);
      this.cities.splice(index, 1);
      await instance.delete(`/cities/${id}`);
      this.cities = await this.listCities();
    },
    async createCity(name, stateId) {
      try {
        await instance.post("/cities", { name, stateId });
      } catch (err) {
        this.handleErrors(err.response.status, "creation");
      }
      this.cities = await this.listCities();
    },
    async updateCity(id, name, stateId) {
      await instance.put(`/cities/${id}`, { name, stateId });
      this.cities = await this.listCities();
    },
    toggleCreation() {
      this.isCreating = !this.isCreating;
      if (this.isCreating) this.isFiltering = false;
    },
    toggleFilter() {
      this.isFiltering = !this.isFiltering;
      if (this.isFiltering) this.isCreating = false;
    },
    async setFilter(name, stateId) {
      const filters = {};
      if (name) filters.name = name;
      if (stateId) filters.stateId = stateId;
      this.filters = filters;
      this.cities = await this.listCities();
    },
    async listCities() {
      const cities = await instance.get("/cities", {
        params: { ...this.filters, ...this.pagination },
      });
      this.pagination.total = cities.data.count;
      const pages = [];
      for (
        let i = 1;
        i <= Math.ceil(this.pagination.total / this.pagination.limit);
        i++
      ) {
        pages.push(i);
      }
      this.pagination.pages = pages;
      return cities.data.rows;
    },
    handleErrors(code, type) {
      this.errors.creation.hasError = true;
      if (code === 409) {
        this.errors[type].errorMsg = "Já existe cidade com esse nome!";
      } else if (code === 400) {
        this.errors[type].errorMsg = "Revise os dados inseridos";
      } else if (code === 404) {
        this.errors[type].errorMsg = "Cidade não encontrada";
      } else {
        this.errors[type].errorMsg =
          "Algo deu errado, por favor tente novamente mais tarde";
      }
    },
    async setPage(page) {
      this.pagination.page = page;
      this.cities = await this.listCities();
    },
  },
  async mounted() {
    const states = await instance.get("/states");
    const cities = await this.listCities();
    this.cities = cities;
    this.states = states.data.rows;
  },
};
</script>
