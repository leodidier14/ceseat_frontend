<template>
  <v-card
    class="mt-5 mx-auto"
    color="#FFF5F0"
    width="95%"
    v-if="article.quantity > 0"
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5" v-text="article.name"></v-card-title>

        <v-card-subtitle v-text="article.description"></v-card-subtitle>

        <v-card-actions>
          <span
            class="ml-2 mt-5"
            v-text="Number.parseFloat(article.price).toFixed(2) + ' €'"
          ></span>
          <v-btn
            class="ml-10 mt-5"
            fab
            icon
            height="30px"
            width="30px"
            @click="article.quantity -= 1"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span class="ml-2 mt-5" v-text="article.quantity"></span>
          <v-btn
            class="ml-2 mt-5"
            fab
            icon
            height="30px"
            width="30px"
            @click="article.quantity += 1"
          >
            <v-icon>mdi-plus</v-icon>
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
import { ArticleChoice1 } from "@/shims-tsx";
@Component
export default class CartArticle extends Vue {
  @Prop({ required: true }) private article!: ArticleChoice1.Article;
  private count: number = 1;
}
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .img-article {
    display: none;
  }
}
</style>