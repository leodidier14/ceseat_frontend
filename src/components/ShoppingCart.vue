<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="black" text v-bind="attrs" v-on="on">
        <span class="mr-2">Panier ({{nbArticles}})</span></v-btn
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
          <H1 class="ml-10" id="title" v-text="restaurant"></H1>
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
        class="mx-auto payment-bar"
        elevation="10"
        width="80%"
        height="70%"
        max-height="80%"
      >
        <v-container height="70%" max-height="80%">
          <v-row no-gutters>
            <v-toolbar-title style="color: black"
              >Total : {{ total }}</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn color="#CA6B3E">
              Payer ma commande
              <!-- <v-icon>mdi-credit-card-outline</v-icon> -->
            </v-btn>
          </v-row>
        </v-container>
      </v-toolbar>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CartArticle from "@/components/CartArticle.vue";
import { Articles } from "@/shims-tsx";

@Component({
  components: {
    CartArticle,
  },
})
export default class ShoppingCart extends Vue {
  private dialog: boolean = false;
  private nbArticles: number = 0
  private articles: Array<Articles.Article> = [];
  private restaurant: string = "";

  mounted() {
    this.$root.$on("add-to-cart", (articleData: [Articles.Article, string]) => {
      this.restaurant = articleData[1];
      let article = articleData[0]
      let newArticle: Articles.Article =  this.articles.filter(art => art.name === article.name)[0];
      if(newArticle) {
        newArticle.quantity += article.quantity;
      } else {
        this.articles.push(article)
        this.nbArticles += article.quantity;
      }
    })
  }

  get total() {
    let total = 0;
    this.articles.forEach((item) => {
      total += item.price * item.quantity;
    });
    return Number.parseFloat(String(total)).toFixed(2) + " €";
  }
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

@media screen and (max-width: 500px) {
  .cart-list {
    margin-top: 20px;
  }
  .payment-bar {
    padding-bottom: 10px;
  }
}
</style>