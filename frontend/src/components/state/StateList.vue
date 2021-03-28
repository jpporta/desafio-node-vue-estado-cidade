<template>
  <div>
    <div v-for="state in states" :key="state._id" class="w-100">
      <StateCard
        :state="state"
        :deleteState="deleteState"
        :updateState="updateState"
      />
    </div>
  </div>
</template>

<script>
import StateCard from "./StateCard";
export default {
  name: "StateList",
  components: { StateCard },
  props: {
    states: Array,
    deleteState: { type: Function },
    updateState: { type: Function },
  },
};
</script>

<style>
</style>