 <template>
  <v-app-bar app color="white">
    <router-link to="/">
      <v-btn target="_blank" text color="white">
        <v-img
          alt="Ces'Eat logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="80"
        />
        <v-img alt="Ces'Eat nom" contain src="@/assets/typo.png" width="100" />
      </v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Commercial</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/business-orders-monitor"
            class="router-mobile-link text-center mr-2"
            >Suivi de commandes</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/business-stats"
            class="router-mobile-link text-center mr-2"
            >Statistiques</router-link
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Technicien</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/technician-components"
            class="router-mobile-link text-center mr-2"
            >Composants</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link to="/technician-connexion-logs"
            >Logs de connexions</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link to="/technician-components-logs"
            >Logs de composants</router-link
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Développeur</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link to="/developer-profile">Mon profil</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/developer-components">Composants</router-link>
        </v-list-item>
        <v-list-item>
          <v-btn @click="devLogout" >Se déconnecter</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Livreur</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link to="/deliveryman-profile">Profil</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/deliveryman-orders">Commandes</router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Mon restaurant</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link to="/restaurant-profile">Profil</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/restaurant-menu">Carte</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/restaurant-orders">Commandes</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/restaurant-history">Historique</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/restaurant-stats">Statistiques</router-link>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Mon compte</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link to="/client-orders">Mes commandes</router-link>
        </v-list-item>
        <v-list-item>
          <router-link to="/client-profile">Mon profil</router-link>
        </v-list-item>
        <v-list-item>
          <v-btn @click="logout">Se déconnecter</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <ShoppingCart />
  </v-app-bar>
</template>
 
 <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ShoppingCart from "@/components/ShoppingCart.vue";
import axios from "axios";

@Component({
  components: {
    ShoppingCart,
  },
})
export default class Navbar extends Vue {
  private name: string = "Navbar";

  private apilogout: string = "http://localhost:3000/logout";
  private apiDevlogout: string = "http://localhost:3000/dev-logout";


  public logout() : void {
    axios
        .post(this.apilogout,'',{headers : {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: localStorage.getItem('token')
          }})
        .then((res: any) => {
          //Perform Success Action
          console.log(res)
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          this.$router.push({ name: "ClientLogin" });
        })
        .catch((error: any) => {
          console.log(error)
          // error.response.status Check status code
          //this.$router.go(0);
        })
        .finally(() => {
          //Perform action in always
        });
  }

  public devLogout() : void {
    axios
        .post(this.apiDevlogout,'',{headers : {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authorization: localStorage.getItem('token')
          }})
        .then((res: any) => {
          //Perform Success Action
          console.log(res)
          localStorage.removeItem('token')
          localStorage.removeItem('devId')
          this.$router.push({ name: "DeveloperLogin" });
        })
        .catch((error: any) => {
          console.log(error)
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
a {
  text-decoration: none;
  color: black !important;
}

.router-link-exact-active {
  font-weight: bold;
}
</style>