<template>
  <RestaurantForm formType="profile" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantForm from "../components/RestaurantForm.vue";

@Component({
  components: {
    RestaurantForm,
  },
})
export default class RestaurantProfile extends Vue {}
</script>