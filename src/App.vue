<template>
  <v-app>
    <div v-if="this.userModule.token != ''">
      <div v-if="isMobile()">
        <NavbarMobile />
      </div>
      <div v-else>
        <Navbar />
      </div>
    </div>
    <v-main class="main">
      <v-snackbar v-model="notification">
        {{ message }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <router-view />
    </v-main>
    <template>
      <v-footer color="#CA6B3E" padless>
        <v-row justify="center" no-gutters>
          <v-btn color="white" text rounded class="my-2"> Accueil </v-btn>
          <v-btn color="white" text rounded class="my-2">
            Conditions d'utilisation
          </v-btn>
          <v-btn color="white" text rounded class="my-2"> L'équipe </v-btn>
          <v-btn color="white" text rounded class="my-2"> A propos </v-btn>
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
import { Component, Prop, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import NavbarMobile from "@/components/NavbarMobile.vue";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";
import Socket from "@/store/socket";

@Component({
  components: {
    Navbar,
    NavbarMobile,
  },
})
export default class App extends Vue {
  private notification: boolean = false;
  private isAuthenticated: boolean = false;
  private message: String = "";
  private socketModule = getModule(Socket, this.$store);

  private userModule = getModule(User, this.$store);

  private isMobile() {
    return this.$vuetify.breakpoint.smAndDown;
  }

  created() {
    this.socketModule.createConnection();

    this.$root.$on(
      "update-statement",
      (info: { status: string; id: number }) => {
        this.notification = true;
        this.message = "Votre commande N° " + info.id + "a été mise à jour";
      }
    );
  }
}
</script>

<style>
.main {
  margin-top: 50px;
  margin-bottom: 50px;
}
html {
  overflow-y: auto !important;
}
</style>