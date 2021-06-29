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


  mounted() {
    this.$root.$on(
      "create-restaurant",
      (newRestaurant: Restaurants.Restaurant) =>
        this.createRestaurant(newRestaurant)
    );
  }

  private apiSubmitRoute: string = "http://localhost:3000/restaurant";

  private createRestaurant(newRestaurant: Restaurants.Restaurant) {
   axios
          .post(this.apiSubmitRoute, newRestaurant, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res: any) => {
            localStorage.setItem("restaurantId", res.data.id);
            console.log(res);
            //Perform Success Action
          })
          .catch((error: any) => {
            console.log(error);
            // error.response.status Check status code
          })
          .finally(() => {
            //Perform action in always
          });
  }
}
</script>