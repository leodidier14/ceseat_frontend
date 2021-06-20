<template>
  <v-card
    class="mx-auto restaurant-card"
    width="95%"
    height="100%"
    v-bind:style="{ 'background-image': 'url(' + restaurant.image + ')' }"
    color="black"
    href="#"
  >
    <div class="item-restaurant">
      <h2 style="color: white">{{ restaurant.name }}</h2>
    </div>
    <div class="item-restaurant infos-restaurant">
      <v-btn elevation="2" rounded small class="info-restaurant">{{
        restaurant.city
      }}</v-btn>
      <v-btn elevation="2" rounded small class="info-restaurant">{{
        restaurant.schedule
      }}</v-btn>
      <v-btn elevation="2" rounded small class="info-restaurant">{{
        restaurant.type
      }}</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Restaurants } from "@/shims-tsx";

@Component
export default class Restaurant extends Vue {
  @Prop({ required: true })
  private restaurant!: Restaurants.Restaurant;
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 50px;
  font-weight: normal;
  margin-left: 50px;
  text-shadow: black 20px 0 20px;
}

.restaurant-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  background-repeat: no-repeat;
  background-size: auto;
  filter: grayscale(40%);
}

.restaurant-card:hover {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border: 1px solid white !important;
}

.infos-restaurant {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
}

.info-restaurant {
  margin-top: 5px;
  width: auto;
}

@media screen and (max-width: 960px) {
  h2 {
    font-size: 25px;
    margin-left: 20px;
  }

  .infos-restaurant {
    margin-right: 20px;
  }
}
</style>