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
    <v-menu offset-y v-if="this.userModule.roleType == 'businessman'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Commercial</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/business-orders-monitor"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Suivi de commandes</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/business-stats"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Statistiques</router-link
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="this.userModule.roleType == 'technician'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Technicien</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/technician-components"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Composants</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/technician-connexion-logs"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Logs de connexions</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/technician-components-logs"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Logs de composants</router-link
          >
        </v-list-item>
        <v-list-item>
          <v-btn text @click="logout">Se déconnecter</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="this.userModule.devId">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Développeur</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/developer-profile"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Mon profil</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/developer-components"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Composants</router-link
          >
        </v-list-item>
        <v-list-item>
          <v-btn text @click="devLogout">Se déconnecter</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="this.userModule.roleType == 'deliveryman'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Livreur</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/deliveryman-profile"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Profil</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/deliveryman-orders"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Commandes</router-link
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="this.userModule.roleType == 'restaurant'">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Mon restaurant</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/restaurant-profile"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Profil</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/restaurant-menu"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Carte</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/restaurant-orders"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Commandes</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/restaurant-history"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Historique</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/restaurant-stats"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Statistiques</router-link
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu
      offset-y
      v-if="this.userModule.userId && this.userModule.roleType != 'technician'"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Mon compte</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <router-link
            to="/client-orders"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Mes commandes</router-link
          >
        </v-list-item>
        <v-list-item>
          <router-link
            to="/client-profile"
            class="
              v-btn v-list-item
              theme--light
              v-btn v-btn--text
              theme--light
              v-size--default
              text-center
              link
            "
            >Mon profil</router-link
          >
        </v-list-item>
        <v-list-item>
          <v-btn text @click="logout">Se déconnecter</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <ShoppingCart
      v-if="this.userModule.userId && this.userModule.roleType != 'technician'"
    />
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
export default class Navbar extends Vue {
  private name: string = "Navbar";

  private userModule = getModule(User, this.$store);

  private apilogout: string = "http://localhost:3000/logout";
  private apiDevlogout: string = "http://localhost:3000/dev-logout";

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
          window.location.href = "http://localhost:8080/client-login";
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
          window.location.href = "http://localhost:8080/developer-login";
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
.router-link-exact-active {
  font-weight: bold;
}

.link {
  letter-spacing: 0.0892857143em;
}
</style>