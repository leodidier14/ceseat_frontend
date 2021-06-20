<template>
  <v-card class="mt-5" color="#FFF5F0" width="95%">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5" v-text="article.name"></v-card-title>

        <v-card-subtitle v-text="article.description"></v-card-subtitle>

        <v-card-actions>
          <span class="ml-2 mt-5" v-text="Number.parseFloat(article.price).toFixed(2) + ' €'"></span>
          <v-btn class="ml-10 mt-5" fab icon height="30px" width="30px" @click="count -= 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <span class="ml-2 mt-5" v-text="count"></span>
          <v-btn class="ml-2 mt-5" fab icon height="30px" width="30px" @click="count += 1">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

          <v-btn class="ml-2 mt-5" color="#CA6B3E" rounded small dark @click="addtoCart()">
            Ajouter
          </v-btn>
        </v-card-actions>
      </div>

      <v-avatar class="ma-3" size="125" tile>
          <slot name="article-image">Image de l'article</slot>
      </v-avatar>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ArticleChoice1 } from "@/shims-tsx";

@Component
export default class ArticleCard extends Vue {
  @Prop({ required: true }) private article!: ArticleChoice1.Article;

  private count: number = 1;

  addtoCart() {
    this.$root.$emit("add-to-cart", this.count);
    this.count = 1;
  }
}
</script>

<style scoped>
</style>
