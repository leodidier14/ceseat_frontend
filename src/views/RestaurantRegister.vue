<template>
  <div style="height: 100%">
    <v-alert
      class="text-center"
      :value="errorPopup"
      dense
      outlined
      type="error"
    >
      Erreur à la création du restaurant
    </v-alert>
    <RestaurantForm formType="register" />
  </div>
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
  private errorPopup: boolean = false;

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
        this.$router.push({ name: "RestaurantMenu" });
        //Perform Success Action
      })
      .catch((error: any) => {
        console.log(error);
        this.errorPopup = true;
      })
      .finally(() => {
        //Perform action in always
      });
  }
}
</script>