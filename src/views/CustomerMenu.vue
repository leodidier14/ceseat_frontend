<template>
  <ArticleList menuType="customer" :articles="articles" :menus="menus" :restaurantId="$route.params.id" :restaurantName="$route.params.name"/>
</template>

 <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleList from "../components/ArticleList.vue";
import { Articles } from "@/shims-tsx";
import axios from "axios";
const lodash = require("lodash");

@Component({
  components: {
    ArticleList,
  },
})
export default class CustomerMenu extends Vue {
  private currentType: string = "";
  private currentRestaurant: string = "McDonald's";

  private apiGetRoute: string = "http://localhost:3000/restaurantboard/"+ this.$route.params.id

  private articles: Array<Articles.Article> = []
  private menus: Array<Articles.Menu> = []


  mounted() {
    axios
      .get(this.apiGetRoute,{
        headers:{
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res: any) => {
        console.log(res.data)
        this.articles = res.data.ArticleList;
        this.menus = res.data.MenuList;
      
      })
      .catch((error: any) => {
        console.log(error)
        //this.$router.go(0);
      })
      .finally(() => {});
  }

  getArticleTypeMap() {
    //let types: Array<string> = this.articles.map((article) => article.type);
    //return types.filter((type, i) => types.indexOf(type) === i);
    let typeMap = lodash.groupBy(this.articles, "type");
    // let typeArray = [];
    // for(let type in Object.keys(typeMap)) {
    //   typeArray.push(typeMap[type]);
    // }
    console.log(typeMap);
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
  text-align: start;
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