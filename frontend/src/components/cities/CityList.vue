<template>
  <div>
    <div v-for="city in cities" :key="city.id" class="w-100">
      <CityCard
        :city="city"
        :states="states"
        :deleteCity="deleteCity"
        :updateCity="updateCity"
      />
    </div>
  </div>
</template>

<script>
import CityCard from "./CityCard.vue";
export default {
  name: "CidadeList",
  components: { CityCard },
  props: {
    cities: Array,
    states: Array,
    deleteCity: { type: Function },
    updateCity: { type: Function },
  },
};
</script>

<style>
</style>