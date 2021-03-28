<template>
  <div class="card w-100">
    <h5 class="card-header">{{ city.name }} - {{ getThisStateName() }}</h5>
    <div class="card-body">
      <div>
        <div class="row w-100">
          <div class="col d-flex justify-content-between">
            <span>Criado em: </span>
            <span
              class="flex-fill m-2"
              style="border-bottom: 2px dotted #999"
            ></span>
            <span>{{ getFormatedCreation() }}</span>
          </div>
        </div>
        <div class="row w-100">
          <div class="col d-flex justify-content-between">
            <span>Útima alteração em: </span>
            <span
              class="flex-fill m-2"
              style="border-bottom: 2px dotted #999"
            ></span>
            <span>{{ getFormatedUpdate() }}</span>
          </div>
        </div>
        <hr />
      </div>
      <form v-if="editing">
        <div class="form-row">
          <div class="form-group col-md-4">
            <label for="name">Novo nome</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="newName"
            />
          </div>

          <div class="form-group col-md-4">
            <label for="inputState">Estado</label>
            <select id="inputState" class="form-control" v-model="newState">
              <option
                v-for="state in states"
                :key="state._id"
                :value="state._id"
              >
                {{ state.name }}
              </option>
            </select>
          </div>

          <div class="form-group col-md-2">
            <div class="d-flex h-100 align-items-end">
              <button class="btn btn-success" @click="saveEdition">
                Salvar
              </button>
            </div>
          </div>
        </div>
      </form>
      <form>
        <div class="form-row">
          <div class="form-group col-md-1">
            <button class="btn btn-info" @click="toggleEditing">
              {{ editing ? "Cancelar" : "Editar" }}
            </button>
          </div>
          <div class="form-group col-md-1">
            <button class="btn btn-danger" @click="deleteMe">Deletar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { utcToZonedTime } from "date-fns-tz";
import fnsFormat from "date-fns-tz/format";
export default {
  name: "CityCard",
  components: {},
  data() {
    return {
      editing: false,
      newName: this.city.name,
      newState: "",
    };
  },
  props: {
    city: Object,
    states: Array,
    deleteCity: { type: Function },
    updateCity: { type: Function },
    editCity: {},
  },
  methods: {
    deleteMe(e) {
      e.preventDefault();
      this.deleteCity(this.city._id);
    },
    toggleEditing(e) {
      e.preventDefault();
      this.editing = !this.editing;
    },
    saveEdition(e) {
      e.preventDefault();
      this.city.name = this.newName;
      this.updateCity(this.city._id, this.newName, this.newState);
    },
    getThisStateName() {
      const state = this.states.find((o) => o._id === this.city.stateId);
      return state && state.name;
    },
    getFormatedCreation() {
      const createdAt = utcToZonedTime(
        this.city.createdAt,
        "America/Sao_Paulo"
      );
      const formatedCreatedAt = fnsFormat(createdAt, "dd/MM/yyyy HH:mm:ss");

      return formatedCreatedAt;
    },
    getFormatedUpdate() {
      const updatedAt = utcToZonedTime(
        this.city.updatedAt,
        "America/Sao_Paulo"
      );
      const formatedUpdatedAt = fnsFormat(updatedAt, "dd/MM/yyyy HH:mm:ss");
      return formatedUpdatedAt;
    },
  },
};
</script>

<style>
</style>