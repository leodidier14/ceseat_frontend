<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="mode == 'create'"
        rounded
        :x-small="$vuetify.breakpoint.mdAndDown"
        :large="$vuetify.breakpoint.mdAndUp"
        v-bind="attrs"
        v-on="on"
        ><v-icon class="mr-2">mdi-plus</v-icon>Article</v-btn
      >
      <v-icon v-if="mode == 'edit'" class="ml-10 mt-5" v-bind="attrs" v-on="on"
        >mdi-square-edit-outline</v-icon
      >
    </template>

    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="#ca6b3e" dark
          >Ajouter un article à la carte</v-toolbar
        >

        <v-card-text>
          <v-form class="mx-auto" ref="addArticleForm" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="#ca6b3e"
                    label="Nom"
                    v-model="article.name"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="#ca6b3e"
                    label="Prix"
                    v-model="article.price"
                    append-icon="mdi-currency-eur"
                    :rules="priceRule"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="#ca6b3e"
                    label="Lien image"
                    append-icon="mdi-camera"
                    v-model="article.image"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    color="#ca6b3e"
                    item-color="#ca6b3e"
                    :items="categories"
                    label="Categorie"
                    v-model="article.type"
                    :rules="[rules.required]"
                    required
                  ></v-select>
                  <v-textarea
                    outlined
                    color="#ca6b3e"
                    v-model="article.description"
                    name="input-7-4"
                    label="Description"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Annuler</v-btn>
          <v-btn text color="#ca6b3e" @click="addArticle()">Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Articles } from "@/shims-tsx";

@Component
export default class AddArticle extends Vue {
  @Prop({
    default: "create",
    validator: (value: string) => ["create", "edit"].includes(value),
  })
  mode!: string;

  @Prop({
    default: () => {
      return {
        name: "",
        description: "",
        type: "",
        price: 0,
        image: "",
        quantity: 1,
        restaurant: "",
      };
    },
  })
  article!: Articles.Article;

  private categories: Array<string> = ["Burger", "Boisson", "Accompagnement", "Entrée", "Pizza", "Tacos", "Autre"];

  private dialog: boolean = false;

  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private priceRule = [
    (price: string) => !!price || "Le prix est obligatoire.",
    (price: string) =>
      /(\d+\.\d{1,2})/g.test(price) || "Le prix doit être valide.",
  ];

  private addArticle() {
    if (
      (
        this.$refs.addArticleForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      this.$root.$emit("add-article", JSON.parse(JSON.stringify(this.article)));
      this.dialog = false;
    }
  }
}
</script>