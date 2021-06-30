<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <div id="banner">
      <h2 class="ml-10" id="title" v-text="restaurantName"></h2>
      <span class="mr-10" id="add-buttons" v-if="menuType == 'restaurant'">
        <AddArticle />
        <AddMenu :articles="articles" />
      </span>
    </div>

    <v-tabs v-model="currentType" light color="#CA6B3E" show-arrows>
      <v-tabs-slider color="#CA6B3E"></v-tabs-slider>

      <v-tab v-if="menus"> Menu </v-tab>
      <v-tab v-for="type in getArticleTypeMap.keys()" :key="type">
        {{ type }}
      </v-tab>
    </v-tabs>
    <v-tabs-items class="articles-list" v-model="currentType">
      <v-tab-item v-if="menus">
        <div id="article-card-layout" v-for="menu in menus" :key="menu.id">
          <ArticleCard
            :menu="menu"
            :type="menuType"
            :articles="articles"
            :restaurantId="restaurantId"
          >
            <template v-slot:article-image>
              <v-img :src="menu.image"></v-img>
            </template>
          </ArticleCard>
        </div>
      </v-tab-item>
      <v-tab-item
        v-for="entry of Array.from(getArticleTypeMap.entries())"
        :key="entry[0]"
      >
        <div
          id="article-card-layout"
          v-for="article in entry[1]"
          :key="article.id"
        >
          <ArticleCard
            :article="article"
            :type="menuType"
            :restaurantId="restaurantId"
          >
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
import AddArticle from "@/components/AddArticle.vue";
import AddMenu from "@/components/AddMenu.vue";
import { Articles } from "@/shims-tsx";
const lodash = require("lodash");

@Component({
  components: {
    ArticleCard,
    AddArticle,
    AddMenu,
  },
})
export default class ArticleChoice extends Vue {
  @Prop({
    default: "customer",
    validator: (value: string) => ["customer", "restaurant"].includes(value),
  })
  menuType!: string;

  @Prop({ required: true })
  private articles!: Array<Articles.Article>;

  @Prop({ required: true })
  private menus!: Array<Articles.Menu>;

  @Prop()
  private restaurantName!: string;

  @Prop()
  private restaurantId!: number;

  private currentType: string = "";

  get getArticleTypeMap(): Map<string, Array<Articles.Article>> {
    let typeMap: Map<string, Array<Articles.Article>> = new Map<
      string,
      Array<Articles.Article>
    >();
    // if (this.menus.length > 0) {
    //   typeMap.set("Menu", this.menus);
    // }

    let articleMap: Map<string, Array<Articles.Article>> = lodash.groupBy(
      this.articles,
      "type"
    );
    for (let entry of Object.entries(articleMap)) {
      typeMap.set(entry[0], entry[1]);
    }

    return typeMap;
  }
}
</script>


<style scoped>
.articles-list {
  height: 400px;
  overflow-y: auto;
}

#article-card-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#title {
  color: white;
}

#banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 12em;
  background: url("https://img.bfmtv.com/i/0/0/d0496/352d3eefcf45ef141370f002903.jpeg")
    center center no-repeat;
  background-size: cover;
}

#add-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

h2 {
  font-size: 50px;
  font-weight: normal;
  margin-left: 50px;
}

@media screen and (max-width: 500px) {
  #title {
    font-size: 40px;
  }
}

@media screen and (max-width: 813px) {
  #title {
    font-size: 40px;
    margin-top: 50px;
  }

  #add-buttons {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
  }

  #banner {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }
}
</style>