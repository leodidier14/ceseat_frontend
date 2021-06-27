<template>
  <ArticleList menuType="restaurant" :articles="articles" :menus="menus" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleList from "../components/ArticleList.vue";
import axios from "axios";
import { Articles } from "@/shims-tsx";
import ArticleCard from "@/components/ArticleCard.vue";

@Component({
  components: {
    ArticleList,
  },
})
export default class RestaurantMenu extends Vue {
  private apiGetRoute: string = "api/restaurant/id/menu";
  private apiArticleRoute: string = "api/article/id";
  private apiMenuRoute: string = "api/menu/id";

  private articles: Array<Articles.Article> = [];
  private menus: Array<Articles.Menu> = [];

  mounted() {
    axios
      .get(this.apiGetRoute)
      .then((res: any) => {
        this.articles = res.articles;
        this.menus = res.menus;
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});

    this.$root.$on("delete-article", (article: Articles.Article) => {
      this.deleteArticle(article);
    });

    this.$root.$on("delete-menu", (menu: Articles.Menu) => {
      this.deleteMenu(menu);
    });

    this.$root.$on("add-article", (article: Articles.Article) => {
      this.addArticle(article);
    });
  }

  private deleteArticle(article: Articles.Article) {
    axios
      .delete(this.apiArticleRoute)
      .then((res: any) => {
        this.$router.go(0);
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
  }

  private deleteMenu(menu: Articles.Menu) {
    axios
      .delete(this.apiMenuRoute)
      .then((res: any) => {
        this.$router.go(0);
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
  }

  private addArticle(article: Articles.Article) {
    let existingArticle: Articles.Article = this.articles.filter(
      (previousArticle: Articles.Article) =>
        previousArticle.name == article.name
    )[0];
    if (existingArticle != null) {
      axios
        .put(this.apiArticleRoute, article)
        .then((res: any) => {
          this.$router.go(0);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    } else {
      axios
        .post(this.apiArticleRoute, article)
        .then((res: any) => {
          this.$router.go(0);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    }
  }

  private addMenu(menu: Articles.Menu) {
    let existingMenu: Articles.Menu = this.menus.filter(
      (previousMenu: Articles.Menu) => previousMenu.name == menu.name
    )[0];
    if (existingMenu != null) {
      axios
        .put(this.apiMenuRoute, menu)
        .then((res: any) => {
          this.$router.go(0);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    } else {
      axios
        .post(this.apiMenuRoute, menu)
        .then((res: any) => {
          this.$router.go(0);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    }
  }
}
</script>