<template>
  <RestaurantForm formType="register" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantForm from "../components/RestaurantForm.vue";

@Component({
  components: {
    RestaurantForm,
  },
})
export default class RestaurantRegister extends Vue {}
</script>