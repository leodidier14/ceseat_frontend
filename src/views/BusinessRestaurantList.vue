<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Liste des Restaurants
    </h3>
    <v-data-table
      :headers="headers"
      :items="restaurants"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de composants disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.description }}</td>
          <td>{{ row.item.version }}</td>
          <td>
            <router-link :to="$route.path + '/' + row.item.id" tag="v-btn">
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

@Component
export default class BusinessRestaurantList extends Vue {

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
      value: "name",
    },
  ];

  private restaurants: Array<Restaurants.Restaurant> = [
    {
      id: 1,
      name: "McDonald's",
      city: "Strasbourg",
      type: "Snack",
      schedule: "",
      image: "",
    },
    {
      id: 2,
      name: "Sushi World",
      city: "Bagdad",
      type: "Japonais",
      schedule: "",
      image: "",
    },
  ];
}
</script>
