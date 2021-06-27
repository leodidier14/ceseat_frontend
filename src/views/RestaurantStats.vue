<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Stats du restaurant
    </h3>
    <v-container style="height: 100%">
      <v-row style="height: 40%">
        <v-col cols="12" md="8" style="height: 100%">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">
              Menus Populaires
            </h4>
            <div class="card-container">
              <ArticleCard
                class="article-card"
                v-for="menu in menus"
                :key="menu.name"
                :menu="menu"
                type="stats"
              >
                <template v-slot:article-image>
                  <v-img :src="menu.image"></v-img>
                </template>
              </ArticleCard>
            </div>
          </v-card>
        </v-col>
        <v-col class="nb-col" cols="12" md="4" style="height: 50%">
          <v-card class="mx-auto" elevation="10" width="100%" color="#CA6B3E">
            <h4 class="text-center py-2" style="color: white">
              Articles en moyenne par Commande
            </h4>
            <div class="number-stats-container">
              <h4 class="number-stat">{{ nbArticleByOrder }}</h4>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" style="height: 100%">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">
              Menus Populaires
            </h4>
            <div class="card-container">
              <ArticleCard
                class="article-card"
                v-for="menu in menus"
                :key="menu.name"
                :menu="menu"
                type="stats"
              >
                <template v-slot:article-image>
                  <v-img :src="menu.image"></v-img>
                </template>
              </ArticleCard>
            </div>
          </v-card>
        </v-col>
        <v-col class="nb-col" cols="12" md="4" style="height: 50%">
          <v-card class="mx-auto" elevation="10" width="100%" color="#CA6B3E">
            <h4 class="text-center mt-2 py-2" style="color: white">
              Prix moyen par commande
            </h4>
            <div class="number-stats-container">
              <h4 class="number-stat">
                {{ Number.parseFloat(meanPriceByOrder).toFixed(2) }} €
              </h4>
            </div></v-card
          >
        </v-col>
        <!-- <v-container class="restaurant-stats-container" style="height: 100%">
      <v-row class="restaurant-stats-row" style="height: 100%">
        <v-col cols="12" md="8" style="height: 40%">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">
              Menus Populaires
            </h4>
            <div class="flex-container">
              <ArticleCard
                class="article-card"
                v-for="menu in menus"
                :key="menu.name"
                :menu="menu"
                type="stats"
              >
                <template v-slot:article-image>
                  <v-img :src="menu.image"></v-img>
                </template>
              </ArticleCard>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" style="height: 40%">
          <v-card class="mx-auto" elevation="10" width="100%" color="#CA6B3E">
            <h4 class="text-center py-2" style="color: white">
              Articles en moyenne par Commande
            </h4>
            <div class="number-stats-container">
              <h4 class="number-stat">{{ nbArticleByOrder }}</h4>
            </div>
          </v-card></v-col
        >

        <v-col cols="12" md="8" class="pb-5" style="height: 40%">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center mt-2 py-2" style="color: white">
              Articles Populaires
            </h4>
            <div class="flex-container">
              <ArticleCard
                class="article-card"
                v-for="article in articles"
                :key="article.name"
                :article="article"
                type="stats"
              >
                <template v-slot:article-image>
                  <v-img :src="article.image"></v-img>
                </template>
              </ArticleCard>
            </div> </v-card
        ></v-col>
        <v-col cols="12" md="4" class="pb-5" style="height: 40%">
          <v-card class="mx-auto" elevation="10" width="100%" color="#CA6B3E">
            <h4 class="text-center mt-2 py-2" style="color: white">
              Prix moyen par commande
            </h4>
            <div class="number-stats-container">
              <h4 class="number-stat">
                {{ Number.parseFloat(meanPriceByOrder).toFixed(2) }} €
              </h4>
            </div></v-card
          ></v-col
        >
      </v-row>
    </v-container> -->
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleCard from "@/components/ArticleCard.vue";
import { Articles } from "@/shims-tsx";

@Component({
  components: {
    ArticleCard,
  },
})
export default class RestaurantStats extends Vue {
  private menus: Array<Articles.Menu> = [
    {
      name: "Menu 1",
      description: "Une menu complet.",
      articles: [
        {
          name: "CBO",
          description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
          type: "Burger",
          price: 6.2,
          quantity: 1,
          image: require("../assets/CBO.png"),
          restaurant: "McDonald's",
        },
        {
          name: "Coca Cola",
          description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
          type: "Boisson",
          price: 3.5,
          quantity: 1,
          image: require("../assets/coca_sans_sucre.png"),
          restaurant: "McDonald's",
        },
        {
          name: "Frite",
          description: "Une portion de frite pour accompagner ton plat.",
          type: "Accompagnement",
          price: 2.5,
          quantity: 1,
          image: require("../assets/frites.png"),
          restaurant: "McDonald's",
        },
      ],
      type: "Menu",
      price: 10.5,
      quantity: 1,
      image: require("../assets/frites.png"),
      restaurant: "McDonald's",
    },
    {
      name: "Menu 2",
      description: "Une menu complet.",
      articles: [
        {
          name: "CBO",
          description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
          type: "Burger",
          price: 6.2,
          quantity: 1,
          image: require("../assets/CBO.png"),
          restaurant: "McDonald's",
        },
        {
          name: "Coca Cola",
          description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
          type: "Boisson",
          price: 3.5,
          quantity: 1,
          image: require("../assets/coca_sans_sucre.png"),
          restaurant: "McDonald's",
        },
        {
          name: "Frite",
          description: "Une portion de frite pour accompagner ton plat.",
          type: "Accompagnement",
          price: 2.5,
          quantity: 1,
          image: require("../assets/frites.png"),
          restaurant: "McDonald's",
        },
      ],
      type: "Menu",
      price: 10.5,
      quantity: 1,
      image: require("../assets/frites.png"),
      restaurant: "McDonald's",
    },
    {
      name: "Menu 3",
      description: "Une menu complet.",
      articles: [
        {
          name: "CBO",
          description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
          type: "Burger",
          price: 6.2,
          quantity: 1,
          image: require("../assets/CBO.png"),
          restaurant: "McDonald's",
        },
        {
          name: "Coca Cola",
          description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
          type: "Boisson",
          price: 3.5,
          quantity: 1,
          image: require("../assets/coca_sans_sucre.png"),
          restaurant: "McDonald's",
        },
        {
          name: "Frite",
          description: "Une portion de frite pour accompagner ton plat.",
          type: "Accompagnement",
          price: 2.5,
          quantity: 1,
          image: require("../assets/frites.png"),
          restaurant: "McDonald's",
        },
      ],
      type: "Menu",
      price: 10.5,
      quantity: 1,
      image: require("../assets/frites.png"),
      restaurant: "McDonald's",
    },
  ];

  private articles: Array<Articles.Article> = [
    {
      name: "Tripple Cheese",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      quantity: 1,
      image: require("../assets/triple_cheese.png"),
      restaurant: "McDonald's",
    },
    {
      name: "CBO",
      description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
      type: "Burger",
      price: 6.2,
      quantity: 1,
      image: require("../assets/CBO.png"),
      restaurant: "McDonald's",
    },
    {
      name: "Coca Cola",
      description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
      type: "Boisson",
      price: 3.5,
      quantity: 1,
      image: require("../assets/coca_sans_sucre.png"),
      restaurant: "McDonald's",
    },
  ];

  get nbArticleByOrder() {
    return 5;
  }

  get meanPriceByOrder() {
    return 10.5;
  }
}
</script>

<style scoped>
h3,
h4 {
  font-weight: normal;
}

/* .article-card {
    width: 100% !important;
} */

.first-row {
  height: 50%;
}

.restaurant-stats-container {
  /* height: 100% !important; */
  width: 100% !important;
  padding: 2em !important;
}
.restaurant-stats-row {
  height: 50%;
}

.card-container {
  height: 80%;
  overflow-y: auto;
}

.number-stats-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.number-stat {
  font-size: 4em;
  color: white;
}

.number-subtitle {
  color: white;
}

@media screen and (max-width: 1300px) {
  .number-stat {
    font-size: 3em;
  }
}

@media screen and (max-width: 960px) {
  .nb-col {
    height: 30% !important;
  }
}
</style>