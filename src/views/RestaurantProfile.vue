<template>
  <RestaurantForm formType="profile" :restaurant="restaurant" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantForm from "../components/RestaurantForm.vue";
import axios from "axios";
import { Restaurants } from "@/shims-tsx";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component({
  components: {
    RestaurantForm,
  },
})
export default class RestaurantProfile extends Vue {
  private userModule = getModule(User, this.$store);

  private apiUpdateRoute =
    "http://localhost:3000/restaurant/" + this.userModule.roleId;
  private apiDeleteRoute =
    "http://localhost:3000/restaurant/" + this.userModule.roleId;
  private apiGetRoute =
    "http://localhost:3000/restaurant/" + this.userModule.roleId;

  private restaurant: Restaurants.Restaurant = {
    id: 0,
    name: "",
    email: "",
    siret: "",
    phoneNumber: "",
    website: "",
    description: "",
    type: "",
    openingTime: "",
    closingTime: "",
    pictureLink: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    sponsorshipLink: "",
  };

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        //Perform Success Action
        this.restaurant = res.data;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //  this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });

    this.$root.$on(
      "update-restaurant",
      (newRestaurant: Restaurants.Restaurant) =>
        this.updateRestaurant(newRestaurant)
    );

    this.$root.$on("delete-restaurant", (id: number) =>
      this.deleteRestaurant(id)
    );
  }

  private updateRestaurant(newRestaurant: Restaurants.Restaurant) {
    axios
      .put(this.apiUpdateRoute, this.restaurant, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log(res);
        this.$router.go(0);
      })
      .catch((error: any) => {
        console.log(error);
        // error.response.status Check status code
      })
      .finally(() => {
        //Perform action in always
      });
  }

  private deleteRestaurant(id: number) {
    axios
      .delete(this.apiDeleteRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log(res);
        this.userModule.set_roleType("");
        this.userModule.set_roleId(0);
        this.$router.push({ name: "ClientProfile" });
        // localStorage.removeItem("restaurantId");
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  }
}
</script>