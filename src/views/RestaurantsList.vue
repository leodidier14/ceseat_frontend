<template>
  <v-card
    class="content mx-auto"
    elevation="10"
    width="80%"
    height="80%"
    max-height="80%"
  >
    <v-toolbar class="filter-bar" color="white">
      <v-text-field
        label="Nom du restaurant"
        color="#CA6B3E"
        class="mr-2 hidden-sm-and-down"
        v-model="searchName"
      ></v-text-field>
      <v-text-field
        label="Ville"
        color="#CA6B3E"
        class="mr-2 hidden-sm-and-down"
        v-model="searchCity"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-select
        label="Type"
        class="mr-2 hidden-sm-and-down"
        color="#CA6B3E"
        :items="types"
        v-model="searchType"
        item-color="#CA6B3E"
      ></v-select>
      <v-select
        label="Disponibilité"
        class="mr-2 hidden-sm-and-down"
        color="#CA6B3E"
        :items="schedule"
        v-model="searchSchedule"
        item-color="#CA6B3E"
      ></v-select>
      <template>
        <div class="text-center hidden-md-and-up">
          <v-dialog v-model="dialog" width="80%">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#CA6B3E" dark v-bind="attrs" v-on="on">
                Filtres de recherche
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h6">
                Que recherchez vous ?
              </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Nom du restaurant"
                  color="#CA6B3E"
                  class="mr-2"
                  v-model="searchName"
                ></v-text-field>
                <v-text-field
                  label="Ville"
                  color="#CA6B3E"
                  class="mr-2"
                  v-model="searchCity"
                ></v-text-field>
                <v-select
                  label="Type"
                  class="mr-2"
                  color="#CA6B3E"
                  :items="types"
                  v-model="searchType"
                  item-color="#CA6B3E"
                ></v-select>
                <v-select
                  label="Disponibilité"
                  class="mr-2"
                  color="#CA6B3E"
                  :items="schedule"
                  v-model="searchSchedule"
                  item-color="#CA6B3E"
                ></v-select>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#CA6B3E" text @click="dialog = false">
                  Fermer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-toolbar>

    <div class="restaurants-list">
      <div
        class="restaurant"
        v-for="restaurant in resultQuery"
        :key="restaurant.id"
      >
        <Restaurant :restaurant="restaurant" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Restaurant from "@/components/Restaurant.vue";
import { Restaurants } from "@/shims-tsx";
@Component({
  components: {
    Restaurant,
  },
})
export default class RestaurantsList extends Vue {
  private dialog: boolean = false;

  private searchName: string = "";
  private searchCity: string = "";
  private searchType: string = "";
  private searchSchedule: string = "";
  private types: Array<string> = [
    "Tous",
    "Snack",
    "Japonais",
    "Hamburger",
    "Tacos",
  ];
  private schedule: Array<string> = ["Tous", "Ouverts", "Fermés"];

  private restaurants: Array<Restaurants.Restaurant> = [
    {
      id: 1,
      name: "MacDo",
      city: "Strasbourg",
      schedule: "12h-22h",
      type: "Snack",
      image:
        "https://media.gqmagazine.fr/photos/5f45086a03a812dcf4928d85/master/pass/McDo-Nouveau-Plat.jpg",
    },
    {
      id: 4,
      name: "Sushi world",
      city: "Marseille",
      schedule: "12h-22h",
      type: "Japonais",
      image:
        "https://www.grand-roissy-tourisme.com/wp-content/uploads/wpetourisme/6823824-diaporama.jpg",
    },
    {
      id: 2,
      name: "Burger King",
      city: "Paris",
      schedule: "15h-22h",
      type: "Snack",
      image:
        "http://codingmatters.org/wp20-04/wp-content/uploads/2020/11/NHNH2EHT35GN3EJSHZSAABZWAE.jpg",
    },
    {
      id: 3,
      name: "KFC",
      city: "Lyon",
      schedule: "12h-22h",
      type: "Snack",
      image:
        "https://www.elma-food.com/wp-content/uploads/2019/12/shutterstock_1120332020-DPI.jpg",
    },
  ];

  get resultQuery(): Array<Restaurants.Restaurant> {
    return getBySchedule(
      getByType(
        getByCity(
          getByName(this.restaurants, this.searchName),
          this.searchCity
        ),
        this.searchType
      ),
      this.searchSchedule
    );
  }
}
function getByName(list: Array<any>, name: string) {
  if (name) {
    return list.filter((item: any) => {
      return name
        .toLowerCase()
        .split(" ")
        .every((v: any) => item.name.toLowerCase().includes(v));
    });
  } else {
    return list;
  }
}

function getByCity(list: Array<any>, city: string) {
  if (city) {
    return list.filter((item: any) => {
      return city
        .toLowerCase()
        .split(" ")
        .every((v: any) => item.city.toLowerCase().includes(v));
    });
  } else {
    return list;
  }
}

function getByType(list: Array<any>, city: string) {
  if (city && city != "Tous") {
    return list.filter((item: any) => {
      return city
        .toLowerCase()
        .split(" ")
        .every((v: any) => item.type.toLowerCase().includes(v));
    });
  } else {
    return list;
  }
}

function getBySchedule(list: Array<any>, city: string) {
  return list;
}
</script>

<style lang="scss" scoped>
.filter-bar {
  padding-top: 20px;
  padding-bottom: 70px;
}
.content {
  margin-top: 50px;
}

.restaurants-list {
  height: 80%;
  overflow-y: auto;
}

.restaurant {
  height: 30%;
}
</style>
