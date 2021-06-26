<template>
    <ArticleList menuType="restaurant"/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ArticleList from "../components/ArticleList.vue";

@Component({
  components: {
    ArticleList,
  },
})
export default class RestaurantMenu extends Vue {}
</script>