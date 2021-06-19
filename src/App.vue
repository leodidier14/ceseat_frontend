<template>
   <v-app>
      <div v-if="isMobile()">
        <NavbarMobile/>
      </div>
      <div v-else>
        <Navbar/>
      </div>
      <v-main>
         <!-- <router-view/> -->
         <RestaurantsList/>
      </v-main>
      <template>
         <v-footer
            color="#CA6B3E"
            padless
            >
            <v-row
               justify="center"
               no-gutters
               >
               <v-btn
                  color="white"
                  text
                  rounded
                  class="my-2"
                  >
                  Accueil
               </v-btn>
               <v-btn
                  color="white"
                  text
                  rounded
                  class="my-2"
                  >
                  Conditions d'utilisation
               </v-btn>
               <v-btn
                  color="white"
                  text
                  rounded
                  class="my-2"
                  >
                  L'équipe
               </v-btn>
               <v-btn
                  color="white"
                  text
                  rounded
                  class="my-2"
                  >
                  A propos
               </v-btn>
               <v-col
                  class="#CA6B3E lighten-2 py-4 text-center white--text"
                  cols="12"
                  >
                  {{ new Date().getFullYear() }} — <strong>Ces'Eat</strong>
               </v-col>
            </v-row>
         </v-footer>
      </template>
   </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue'
import NavbarMobile from '@/components/NavbarMobile.vue'
import RestaurantsList from '@/components/restaurants-list/RestaurantsList.vue'

export default Vue.extend({
  name: 'App',

  components : {
    Navbar,
    NavbarMobile,
    RestaurantsList
  },

  data: () => ({
  }),

  methods : {
  isMobile() {
    return this.$vuetify.breakpoint.smAndDown;
  }
  }
});
</script>

<style>
/* html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
} */
</style>