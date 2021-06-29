<template>
  <ArticleList menuType="restaurant" :articles="articles" :menus="menus" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleList from "../components/ArticleList.vue";
import axios from "axios";
import { Articles } from "@/shims-tsx";
import ArticleCard from "@/components/ArticleCard.vue";

import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component({
  components: {
    ArticleList,
  },
})
export default class RestaurantMenu extends Vue {
  private userModule = getModule(User, this.$store);
  private apiGetRoute: string =
    "http://localhost:3000/restaurantboard/" + this.userModule.roleId;
  private apiSubmitArticleRoute: string = "http://localhost:3000/article/";
  private apiArticleRoute: string = "http://localhost:3000/article/";
  private apiMenuRoute: string = "http://localhost:3000/menu/";

  private articles: Array<Articles.Article> = [];
  private menus: Array<Articles.Menu> = [];

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        this.articles = res.data.ArticleList;
        console.log(this.articles);

        this.menus = res.data.MenuList;
        console.log(this.menus);
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
    this.$root.$on("add-menu", (menu: Articles.Menu) => {
      this.addMenu(menu);
    });
  }

  private deleteArticle(article: Articles.Article) {
    axios
      .delete(this.apiArticleRoute + article.id, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log(res);
        this.$router.go(0);
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
  }

  private deleteMenu(menu: Articles.Menu) {
    axios
      .delete(this.apiMenuRoute + menu.id, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
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
        .put(this.apiSubmitArticleRoute + article.id, article, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          console.log(res);
          this.$router.go(0);
        })
        .catch((error: any) => {
          console.log(error);
          //this.$router.go(0);
        })
        .finally(() => {});
    } else {
      console.log("new menu");

      axios
        .post(this.apiSubmitArticleRoute, article, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          //this.$router.go(0);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    }
  }

  private addMenu(menu: Articles.Menu) {
    console.log(menu);
    console.log(this.menus);
    if (this.menus) {
      let existingMenu: Articles.Menu = this.menus.filter(
        (previousMenu: Articles.Menu) => previousMenu.id == menu.id
      )[0];
      console.log(existingMenu);
      if (existingMenu != null) {
        axios
          .put(this.apiMenuRoute + menu.id, menu, {
            headers: {
              Authorization: this.userModule.token,
            },
          })
          .then((res: any) => {
            this.$router.go(0);
          })
          .catch((error: any) => {
            //this.$router.go(0);
          })
          .finally(() => {});
      } else {
        axios
          .post(this.apiMenuRoute, menu, {
            headers: {
              Authorization: this.userModule.token,
            },
          })
          .then((res: any) => {
            console.log(res);
            this.$router.go(0);
          })
          .catch((error: any) => {
            //this.$router.go(0);
          })
          .finally(() => {});
      }
    } else {
      axios
        .post(this.apiMenuRoute, menu, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          console.log(res);
          //this.$router.go(0);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    }
  }
}
</script>