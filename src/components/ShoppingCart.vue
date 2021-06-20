<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="black" text v-bind="attrs" v-on="on">
        <span class="mr-2">Panier (0)</span></v-btn
      >
    </template>
    <v-card
      class="mx-auto"
      elevation="10"
      width="80%"
      height="70%"
      max-height="80%"
    >
      <v-toolbar dark color="#CA6B3E">
        <v-toolbar-title>Panier</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card
        class="mx-auto cart-list"
        elevation="10"
        width="80%"
        height="70%"
        max-height="80%"
      >
        <div id="banner">
          <H1 class="ml-10" id="title">McDonald's</H1>
        </div>
        <div v-for="article in articles" :key="article.name">
          <CartArticle :article="article">
            <template v-slot:article-image>
              <v-img :src="article.image"></v-img>
            </template>
          </CartArticle>
        </div>
      </v-card>
      <v-toolbar
        dark
        color="white"
        class="mx-auto"
        elevation="10"
        width="80%"
        height="70%"
        max-height="80%"
      >
        <v-toolbar-title style="color: black"
          >Total commande : 50€</v-toolbar-title
        >
        <v-spacer></v-spacer>

        <v-btn color="#CA6B3E">
          Payer ma commande
          <!-- <v-icon>mdi-credit-card-outline</v-icon> -->
        </v-btn>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CartArticle from "@/components/CartArticle.vue";
import { ArticleChoice1 } from "@/shims-tsx";

@Component({
  components: {
    CartArticle,
  },
})
export default class ShoppingCart extends Vue {
  private dialog: boolean = false;
  private articles: Array<ArticleChoice1.Article> = [
    {
      name: "Tripple Cheese",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      image: require("../assets/triple_cheese.png"),
    },
    {
      name: "CBO",
      description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
      type: "Burger",
      price: 6.2,
      image: require("../assets/CBO.png"),
    },
    {
      name: "Coca Cola",
      description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
      type: "Boisson",
      price: 3.5,
      image: require("../assets/coca_sans_sucre.png"),
    },
    {
      name: "Frite",
      description: "Une portion de frite pour accompagner ton plat.",
      type: "Accompagnement",
      price: 2.5,
      image: require("../assets/frites.png"),
    },
  ];
}
</script>

<style scoped>
.cart-list {
  margin-top: 50px;
  overflow-y: auto;
}

#banner {
  color: white;
  display: flex;
  text-align: start;
  align-items: center;
  width: 100%;
  height: 20%;
  background-image: url("https://img.bfmtv.com/i/0/0/d0496/352d3eefcf45ef141370f002903.jpeg");
  background-size: cover;
}
</style>