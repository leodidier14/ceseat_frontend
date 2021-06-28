<template>
  <RestaurantForm formType="register" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantForm from "../components/RestaurantForm.vue";
import axios from "axios";
import { Restaurants } from "@/shims-tsx";

@Component({
  components: {
    RestaurantForm,
  },
})
export default class RestaurantRegister extends Vue {
  private apiRootRoute = "api/restaurant/";

  mounted() {
    this.$root.$on(
      "create-restaurant",
      (newRestaurant: Restaurants.Restaurant) =>
        this.createRestaurant(newRestaurant)
    );
  }

  private createRestaurant(newRestaurant: Restaurants.Restaurant) {
    axios
      .post(this.apiRootRoute, newRestaurant)
      .then((res: any) => {
        this.$router.push({ name: "RestaurantList" });
      })
      .catch((error: any) => {
        this.$router.go(0);
      })
      .finally(() => {
        
      });
  }
}
</script>