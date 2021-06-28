<template>
  <RestaurantForm formType="profile" />
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
export default class RestaurantProfile extends Vue {
  private apiRootRoute = "api/restaurant/";
  private apiGetRoute = "api/restaurant/id";

  private restaurant: Restaurants.Restaurant = {
    id: 0,
    name: "",
    email: "",
    siretNumber: "",
    phoneNumber: "",
    website: "",
    description: "",
    type: "",
    openingTime: "",
    closingTime: "",
    image: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    sponsorshipLink: "",
  };

  mounted() {
    axios
      .get(this.apiGetRoute)
      .then((res: any) => {
        //Perform Success Action
        this.restaurant = res;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });

    this.$root.$on(
      "update-restaurant",
      (newRestaurant: Restaurants.Restaurant) =>
        this.updateRestaurant(newRestaurant)
    );

    this.$root.$on(
      "delete-restaurant",
      (id: number) =>
        this.deleteRestaurant(id)
    );
  }

  private updateRestaurant(newRestaurant: Restaurants.Restaurant) {
    axios
      .put(this.apiRootRoute + newRestaurant.id, newRestaurant)
      .then((res: any) => {
        this.restaurant = res;
      })
      .catch((error: any) => {
        this.$router.go(0);
      })
      .finally(() => {
        this.$router.go(0);
      });
  }

  private deleteRestaurant(id: number) {
    axios
      .delete(this.apiRootRoute + id)
      .then((res: any) => {
        this.$router.push({ name: "RestaurantRegister" })
      })
      .catch((error: any) => {
        this.$router.go(0);
      })
      .finally(() => {
        
      });
  }
}
</script>