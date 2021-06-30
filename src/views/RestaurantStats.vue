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
              Articles Populaires
            </h4>
            <div class="card-container">
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
            </div>
          </v-card>
        </v-col>
        <v-col class="nb-col" cols="12" md="4" style="height: 50%">
          <v-card class="mx-auto" elevation="10" width="100%" color="#CA6B3E">
            <h4 class="text-center py-2" style="color: white">
              Chiffre d'affaire transactionnel
            </h4>
            <div class="number-stats-container">
              <h4 class="number-stat">
                {{ Number.parseFloat(meanArticlesByOrder).toFixed(2) }} €
              </h4>
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
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleCard from "@/components/ArticleCard.vue";
import { Articles } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component({
  components: {
    ArticleCard,
  },
})
export default class RestaurantStats extends Vue {
  private menus: Array<Articles.Menu> = [];
  private articles: Array<Articles.Article> = [];
  private userModule = getModule(User, this.$store);
  private meanArticlesByOrder: number = 0;
  private meanPriceByOrder: number = 0;
  private apiGetRoute: string =
    "http://localhost:3000/stats/restaurant/" + this.userModule.roleId;

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        this.articles = res.data.articles;
        this.menus = res.data.menus;
        this.meanArticlesByOrder =
          res.data.meanArticlesByOrder.meanArticlesByOrder;
        this.meanPriceByOrder = res.data.meanPriceByOrder.meanPricePerOrder;
        console.log(this.articles);
        console.log(this.menus);
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  // get nbArticleByOrder() {
  //   return 5;
  // }

  // get meanPriceByOrder() {
  //   return 10.5;
  // }
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