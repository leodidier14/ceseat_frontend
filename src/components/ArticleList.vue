<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <div id="banner">
      <h2 class="ml-10" id="title" v-text="currentRestaurant"></h2>
      <span class="mr-10" v-if="menuType == 'restaurant'">
        <AddArticle />
        <AddMenu />
      </span>
    </div>

    <v-tabs v-model="currentType" light color="#CA6B3E" show-arrows>
      <v-tabs-slider color="#CA6B3E"></v-tabs-slider>

      <v-tab v-if="menus.length > 0"> Menu </v-tab>
      <v-tab v-for="type in getArticleTypeMap.keys()" :key="type">
        {{ type }}
      </v-tab>
    </v-tabs>
    <v-tabs-items class="articles-list" v-model="currentType">
      <v-tab-item v-if="menus.length > 0">
        <div id="article-card-layout" v-for="menu in menus" :key="menu.name">
          <ArticleCard :menu="menu" :type="menuType">
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
          :key="article.name"
        >
          <ArticleCard :article="article" :type="menuType">
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

  private currentType: string = "";
  private currentRestaurant: string = "McDonald's";

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
    {
      name: "Frite",
      description: "Une portion de frite pour accompagner ton plat.",
      type: "Accompagnement",
      price: 2.5,
      quantity: 1,
      image: require("../assets/frites.png"),
      restaurant: "McDonald's",
    },
  ];

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
  ];

  mounted() {
    this.$root.$on("add-article", (article: Articles.Article) => {
      this.articles.push(article);
    });

    this.$root.$on("add-menu", (menu: Articles.Menu) => {
      let existingMenu: Articles.Menu = this.menus.filter(
        (previousMenu: Articles.Menu) => previousMenu.name == menu.name
      )[0];
      if (existingMenu != null) {
        this.menus.splice(this.menus.indexOf(existingMenu), 1, menu);
      } else {
        this.menus.push(menu);
      }
    });

    this.$root.$on("delete-article", (article: Articles.Article) => {
      this.articles.splice(this.articles.indexOf(article), 1);
    });

    this.$root.$on("delete-menu", (menu: Articles.Menu) => {
      this.menus.splice(this.menus.indexOf(menu), 1);
    });
  }

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
</style>