<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <div id="banner">
      <H1 class="ml-10" id="title">McDonald's</H1>
    </div>

    <v-tabs v-model="currentType" light color="#CA6B3E" show-arrows>
      <v-tabs-slider color="#CA6B3E"></v-tabs-slider>

      <v-tab v-for="type in Object.keys(getArticleTypeMap())" :key="type">
        {{ type }}
      </v-tab>
    </v-tabs>
    <v-tabs-items class="articles-list" v-model="currentType">
      <v-tab-item v-for="key in Object.keys(getArticleTypeMap())" :key="key">
        <div
          id="restaurant-card-layout"
          v-for="article in getArticleTypeMap()[key]"
          :key="article.name"
        >
          <ArticleCard :article="article">
            <template v-slot:article-image>
              <v-img :src="article.image"></v-img>
            </template>
          </ArticleCard>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

 <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleCard from "@/components/ArticleCard.vue";
import { ArticleChoice1 } from "@/shims-tsx";
const lodash = require("lodash");

@Component({
  components: {
    ArticleCard,
  },
})
export default class ArticleChoice extends Vue {
  private currentType: string = "";

  private articles: Array<ArticleChoice1.Article> = [
    {
      name: "Tripple Cheese",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      quantity: 1,
      image: require("../assets/triple_cheese.png"),
    },
    {
      name: "Tripple Cheese 2",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      quantity: 1,
      image: require("../assets/triple_cheese.png"),
    },
    {
      name: "Tripple Cheese 3",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      quantity: 1,
      image: require("../assets/triple_cheese.png"),
    },
    {
      name: "Tripple Cheese 4",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      quantity: 1,
      image: require("../assets/triple_cheese.png"),
    },
    {
      name: "CBO",
      description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
      type: "Burger",
      price: 6.2,
      quantity: 1,
      image: require("../assets/CBO.png"),
    },
    {
      name: "Coca Cola",
      description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
      type: "Boisson",
      price: 3.5,
      quantity: 1,
      image: require("../assets/coca_sans_sucre.png"),
    },
    {
      name: "Frite",
      description: "Une portion de frite pour accompagner ton plat.",
      type: "Accompagnement",
      price: 2.5,
      quantity: 1,
      image: require("../assets/frites.png"),
    },
  ];

  getArticleTypeMap() {
    //let types: Array<string> = this.articles.map((article) => article.type);
    //return types.filter((type, i) => types.indexOf(type) === i);
    let typeMap = lodash.groupBy(this.articles, "type");
    // let typeArray = [];
    // for(let type in Object.keys(typeMap)) {
    //   typeArray.push(typeMap[type]);
    // }
    console.log(typeMap);
    return typeMap;
  }
}
</script>


<style scoped>
.articles-list {
  height: 400px;
  overflow-y: auto;
}

#restaurant-card-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#title {
  color: white;
  font-size: 5em;
}

#banner {
  display: flex;
  text-align: start;
  align-items: center;
  width: 100%;
  height: 12em;
  background: url("../assets/mcdonalds_banner.jpeg") center center no-repeat;
  background-size: cover;
}

h2 {
  font-size: 50px;
  font-weight: normal;
  margin-left: 50px;
}

.restaurant-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.infos {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
}

.t {
  margin-top: 5px;
  width: auto;
}
</style>