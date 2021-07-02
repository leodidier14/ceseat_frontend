<template>
  <v-card class="mt-5 mx-auto" color="#FFF5F0" width="95%">
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-card-title class="text-h5" v-text="getCardItem.name"></v-card-title>

        <v-card-subtitle v-text="getCardItem.description"></v-card-subtitle>

        <v-card-actions>
          <span
            class="ml-2 mt-5"
            v-text="Number.parseFloat(getCardItem.price).toFixed(2) + ' €'"
          ></span>
          <span
            class="ml-10 mt-5"
            v-if="type != 'restaurant' && type != 'stats'"
          >
            <v-btn
              fab
              icon
              height="30px"
              width="30px"
              :disabled="type == 'customer' ? getCardItem.quantity == 1 : false"
              @click="decrementQuantity()"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>

            <span class="ml-2" v-text="getCardItem.quantity"></span>

            <v-btn
              class="ml-2"
              fab
              icon
              height="30px"
              width="30px"
              @click="incrementQuantity()"
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

          <span v-if="type == 'restaurant'">
            <AddArticle
              v-if="article != null"
              mode="edit"
              :article="JSON.parse(JSON.stringify(article))"
            />
            <AddMenu
              v-if="menu != null"
              mode="edit"
              :menu="lodash.cloneDeep(menu)"
              :articles="articles"
            />
            <v-icon class="ml-5 mt-5" color="red" @click="deleteArticle()"
              >mdi-delete</v-icon
            >
          </span>
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
import { getModule } from "vuex-module-decorators";
import CartModule from "@/store/cart";
import AddMenu from "@/components/AddMenu.vue";
import AddArticle from "@/components/AddArticle.vue";
import lodash from "lodash";

@Component({
  components: {
    AddMenu,
    AddArticle,
  },
})
export default class ArticleCard extends Vue {
  private lodash = lodash;
  private cartModule = getModule(CartModule, this.$store);
  @Prop()
  private articles!: Array<Articles.Article>;

  @Prop()
  private restaurantId!: number;

  @Prop()
  private article!: Articles.Article;

  @Prop()
  private menu!: Articles.Menu;

  @Prop({
    default: "customer",
    validator: (value: string) =>
      ["customer", "cart", "restaurant", "stats"].includes(value),
  })
  private type!: string;

  get getCardItem() {
    return this.article ? this.article : this.menu;
  }

  deleteArticle() {
    if (this.article) {
      if (
        confirm(
          "Etes-vous sûr de vouloir supprimer cet article : " +
            this.article.name
        )
      ) {
        this.$root.$emit("delete-article", this.article);
      }
    } else {
      if (
        confirm(
          "Etes-vous sûr de vouloir supprimer ce menu : " + this.menu.name
        )
      ) {
        this.$root.$emit("delete-menu", this.menu);
      }
    }
  }

  addtoCart() {
    if (this.article) {
      this.cartModule.addArticle(this.article).then(() => {
        this.getCardItem.quantity = 1;
      });
    } else {
      this.cartModule.addMenu(this.menu).then(() => {
        this.getCardItem.quantity = 1;
      });
    }
    this.cartModule.addRestaurantId(this.restaurantId);
  }

  incrementQuantity() {
    this.getCardItem.quantity++;
    if (this.type == "cart") {
      if (this.article) {
        this.cartModule.incrementArticleQuantity(this.article);
      } else {
        this.cartModule.incrementMenuQuantity(this.menu);
      }
    }
  }

  decrementQuantity() {
    this.getCardItem.quantity--;
    if (this.type == "cart") {
      if (this.article != null) {
        this.cartModule.decrementArticleQuantity(this.article);
      } else {
        this.cartModule.decrementMenuQuantity(this.menu);
      }
    }
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