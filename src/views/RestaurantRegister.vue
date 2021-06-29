<template>
  <RestaurantForm formType="register" />
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
export default class RestaurantRegister extends Vue {
  private userModule = getModule(User, this.$store);

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
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        this.userModule.set_roleType("restaurant");
        this.userModule.set_roleId(res.data.id);
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