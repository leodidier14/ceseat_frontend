<template>
  <v-card class="mt-5 mx-auto" color="#FFF5F0" width="95%">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5" v-text="article.name"></v-card-title>

        <v-card-subtitle v-text="article.description"></v-card-subtitle>

        <v-card-actions>
          <span
            class="ml-2 mt-5"
            v-text="Number.parseFloat(article.price).toFixed(2) + ' €'"
          ></span>
          <span class="ml-10 mt-5" v-if="type != 'restaurant'">
            <v-btn
              fab
              icon
              height="30px"
              width="30px"
              :disabled="type == 'customer' ? article.quantity == 1 : false"
              @click="article.quantity == 1 ? cart.deleteArticle(article) : article.quantity--"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>

            <span class="ml-2" v-text="article.quantity"></span>

            <v-btn
              class="ml-2"
              fab
              icon
              height="30px"
              width="30px"
              @click="article.quantity++"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </span>

          <v-btn
            class="ml-2 mt-5"
            color="#CA6B3E"
            rounded
            small
            dark
            v-if="type == 'customer'"
            @click="addtoCart()"
          >
            Ajouter
          </v-btn>
        </v-card-actions>
      </div>

      <v-avatar class="ma-3 img-article" size="125" tile>
        <slot name="article-image">Image de l'article</slot>
      </v-avatar>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Articles } from "@/shims-tsx";
import { CartModule } from '@/store/cart'

@Component
export default class ArticleCard extends Vue {
  private cart = CartModule;

  @Prop({ required: true })
  private article!: Articles.Article;

  @Prop({
    default: "customer",
    validator: (value: string) => ["customer", "cart", "restaurant"].includes(value),
  })
  private type!: string;

  addtoCart() {
    this.cart.addArticle(this.article).then(() => this.article.quantity = 1);
  }
}
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .img-article {
    display: none;
  }
}
</style>