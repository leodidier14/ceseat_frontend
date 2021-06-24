 <template>
  <v-app-bar app color="white">
    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      text
      color="white"
    >
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
    <v-spacer></v-spacer>
    <v-btn href="#" text color="black">
      <span class="mr-2">Mon restaurant</span>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="black" v-bind="attrs" v-on="on"
          ><span class="mr-2">Mon compte</span></v-btn
        >
      </template>
      <v-list>
        <v-list-item>
          <a href="/profile">Mon profil</a>
        </v-list-item>
        <v-list-item>
          <a href="/logout">Se déconnecter</a>
        </v-list-item>
      </v-list>
    </v-menu>
    <ShoppingCart />
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
export default class Navbar extends Vue {
  private name: string = "Navbar";
}
</script>