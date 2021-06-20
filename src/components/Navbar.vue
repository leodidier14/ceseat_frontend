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
    <v-btn href="#" text color="black">
      <span class="mr-2">Mon compte</span>
    </v-btn>
    <v-btn href="#" text color="black">
      <span class="mr-2">Panier ({{ count }})</span>
    </v-btn>
  </v-app-bar>
</template>
 
 <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  private name: string = "Navbar";
  private count: number = 0;

  mounted() {
    this.$root.$on("add-to-cart", (count: number) => {
      this.count += count;
    });
  }
}
</script>