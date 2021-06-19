 <template>
    <v-app-bar
            app
            color="white"
            >
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
                <v-img
                    alt="Ces'Eat nom"
                    contain
                    src="@/assets/typo.png"
                    width="100"
                    />
                </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                href="#"
                text
                color="black"
                >
                <span class="mr-2">Mon restaurant</span>
            </v-btn>
            <v-btn
                href="#"
                text
                color="black"
                >
                <span class="mr-2">Mon compte</span>
            </v-btn>
            <v-btn
                href="#"
                text
                color="black"
                >
                <span class="mr-2">Panier (0)</span>
            </v-btn>
        </v-app-bar>
</template>
 
 <script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Navbar',

    data: () => ({
    }),
  })
</script>