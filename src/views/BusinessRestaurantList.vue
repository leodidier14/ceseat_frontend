<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Liste des Restaurants
    </h3>
    <v-data-table
      :headers="headers"
      :items="restaurants"
      :header-props="headerProps"
      :footer-props="footerProps"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de restaurants disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.city }}</td>
          <td>{{ row.item.type }}</td>
          <td>
            <router-link :to="$route.path + '/' + row.item.id">
              <v-btn class="mx-2" text small color="black">
                <v-icon dark>mdi-information</v-icon>
              </v-btn>
            </router-link>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Restaurants } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component
export default class BusinessRestaurantList extends Vue {
  private apiGetRoute: string = "http://localhost:3000/restaurants";
  private userModule = getModule(User, this.$store);
  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Restaurants par page",
  };
  private headers: object = [
    {
      text: "Nom",
      value: "name",
    },
    {
      text: "Ville",
      value: "city",
    },
    {
      text: "Type",
      value: "type",
    },
    {
      text: "Commandes en cours",
      sortable: false,
    },
  ];

  private restaurants: Array<Restaurants.Restaurant> = [];

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        console.log(res.data);
        this.restaurants = res.data;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }
}
</script>
