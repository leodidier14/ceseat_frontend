<template>
  <v-app-bar app color="white">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="70"
      />
      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>
    <v-spacer></v-spacer>
    <template>
      <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="transparent" dark v-bind="attrs" v-on="on">
            <v-icon color="black">mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-card color="white">
          <v-toolbar dark color="white">
            <v-toolbar-items>
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="@/assets/logo.png"
                transition="scale-transition"
                width="70"
              />
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="dialog = false">
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list dense color="#CA6B3E">
            <v-list-item-group v-model="selectedItem" color="dark">
              <v-list-item class="text-center">
                <v-list-item-content>
                  <v-list-item-title class="item-list"
                    >Accueil</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="text-center">
                <v-list-item-content>
                  <v-list-item-title class="item-list"
                    >Mon restaurant</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="text-center">
                <v-list-item-content>
                  <v-list-item-title class="item-list"
                    >Mon compte</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="text-center">
                <v-list-item-content>
                  <v-list-item-title class="item-list"
                    ><ShoppingCart
                  /></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-dialog>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ShoppingCart from "@/components/ShoppingCart.vue";

@Component({
  components: {
    ShoppingCart,
  },
})
export default class NavbarMobile extends Vue {
  private name: string = "NavbarMobile";
  private dialog: boolean = false;
  private selectedItem: number = 0;
}
</script>

<style scoped>
.item-list {
  font-size: 18px !important;
  color: white;
}
</style>