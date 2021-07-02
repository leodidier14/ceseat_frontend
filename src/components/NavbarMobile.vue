<template>
  <v-app-bar app color="white">
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="70"
        />
      </router-link>
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
              <router-link to="/">
                <v-img
                  alt="Vuetify Logo"
                  class="shrink mr-2 mt-1"
                  contain
                  src="@/assets/logo.png"
                  transition="scale-transition"
                  width="70"
                  @click="dialog = false"
                />
              </router-link>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="dialog = false">
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list dense color="#CA6B3E">
            <v-list-item-group v-model="selectedItem" color="white">
              <v-list-item
                class="text-center"
                v-if="this.userModule.roleType == 'businessman'"
              >
                <v-list-item-content>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text color="white" v-bind="attrs" v-on="on"
                        ><span class="mr-2">Commercial</span></v-btn
                      >
                    </template>
                    <v-list>
                      <router-link
                        to="/business-orders-monitor"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Suivi de commandes</span
                        ></router-link
                      >
                      <router-link
                        to="/business-stats"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Statistiques</span
                        ></router-link
                      >
                    </v-list>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="text-center"
                v-if="this.userModule.roleType == 'technician'"
              >
                <v-list-item-content>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text color="white" v-bind="attrs" v-on="on"
                        ><span class="mr-2">Technicien</span></v-btn
                      >
                    </template>
                    <v-list>
                      <router-link
                        to="/technician-components"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Composants</span
                        ></router-link
                      >
                      <router-link
                        to="/technician-connexion-logs"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Logs de connexions</span
                        ></router-link
                      >
                      <router-link
                        to="/technician-components-logs"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Logs de composants</span
                        ></router-link
                      >
                      <router-link
                        to="/login"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false"
                          >Se déconnecter</span
                        ></router-link
                      >
                    </v-list>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="text-center" v-if="this.userModule.devId">
                <v-list-item-content>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text color="white" v-bind="attrs" v-on="on"
                        ><span class="mr-2">Développeur</span></v-btn
                      >
                    </template>
                    <v-list>
                      <router-link
                        to="/developer-profile"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Mon profil</span
                        ></router-link
                      >
                      <router-link
                        to="/developer-components"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Composants</span
                        ></router-link
                      >
                      <router-link
                        to="/developer-logout"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="devLogout"
                          >Se déconnecter</span
                        ></router-link
                      >
                    </v-list>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="text-center"
                v-if="this.userModule.roleType == 'deliveryman'"
              >
                <v-list-item-content>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text color="white" v-bind="attrs" v-on="on"
                        ><span class="mr-2">Livreur</span></v-btn
                      >
                    </template>
                    <v-list>
                      <router-link
                        to="/deliveryman-profile"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Profil</span
                        ></router-link
                      >
                      <router-link
                        to="/deliveryman-orders"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Commandes</span
                        ></router-link
                      >
                    </v-list>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="text-center"
                v-if="this.userModule.roleType == 'restaurant'"
              >
                <v-list-item-content>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text color="white" v-bind="attrs" v-on="on"
                        ><span class="mr-2">Mon restaurant</span></v-btn
                      >
                    </template>
                    <v-list>
                      <router-link
                        to="/restaurant-profile"
                        class="router-mobile-link text-center mr-2"
                        ><span @click="dialog = false"
                          >Profil</span
                        ></router-link
                      >
                      <router-link
                        to="/restaurant-menu"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false">Carte</span></router-link
                      >
                      <router-link
                        to="/restaurant-orders"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false"
                          >Commandes</span
                        ></router-link
                      >
                      <router-link
                        to="/restaurant-history"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false"
                          >Historique</span
                        ></router-link
                      >
                      <router-link
                        to="/restaurant-stats"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false"
                          >Statistiques</span
                        ></router-link
                      >
                    </v-list>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="text-center"
                v-if="
                  this.userModule.userId &&
                  this.userModule.roleType != 'technician'
                "
              >
                <v-list-item-content>
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn text color="white" v-bind="attrs" v-on="on"
                        ><span class="mr-2">Mon compte</span></v-btn
                      >
                    </template>
                    <v-list>
                      <router-link
                        to="/client-orders"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false"
                          >Mes commandes</span
                        ></router-link
                      >
                      <router-link
                        to="/client-profile"
                        class="router-mobile-link text-center"
                        ><span @click="dialog = false"
                          >Mon profil</span
                        ></router-link
                      >
                      <router-link
                        to="/login"
                        class="router-mobile-link text-center"
                        ><span @click="logout"
                          >Se déconnecter</span
                        ></router-link
                      >
                    </v-list>
                  </v-menu>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                class="text-center"
                v-if="
                  this.userModule.userId &&
                  this.userModule.roleType != 'technician'
                "
              >
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
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";
@Component({
  components: {
    ShoppingCart,
  },
})
export default class NavbarMobile extends Vue {
  private userModule = getModule(User, this.$store);
  private name: string = "NavbarMobile";
  private dialog: boolean = false;
  private selectedItem: number = 0;

  private apilogout: string = "http://172.16.44.43:3000/logout";
  private apiDevlogout: string = "http://172.16.44.43:3000/dev-logout";

  public logout(): void {
    axios
      .post(this.apilogout, "", {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        console.log(res);
        this.userModule.set_token("").then((token: string) => {
          localStorage.clear();
          window.location.href = "http://172.16.44.43:8080/client-login";
        });

        // this.$router.push({ name: "ClientLogin" });
      })
      .catch((error: any) => {
        console.log(error);
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  public devLogout(): void {
    axios
      .post(this.apiDevlogout, "", {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        this.userModule.set_token("").then((token: string) => {
          localStorage.clear();
          window.location.href = "http://172.16.44.43:8080/developer-login";
        });
      })
      .catch((error: any) => {
        console.log(error);
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }
}
</script>

<style scoped>
.item-list {
  font-size: 18px !important;
  color: white;
}

a {
  text-decoration: none;
  color: black !important;
}

.router-link-exact-active {
  font-weight: bold;
}

.router-mobile-link {
  display: block;
  padding: 10px;
}

.home {
  color: white;
}
</style>