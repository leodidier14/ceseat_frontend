<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="mode == 'create'"
        class="ml-5"
        rounded
        large
        v-bind="attrs"
        v-on="on"
        ><v-icon class="mr-2">mdi-plus</v-icon>Menu</v-btn
      >
      <v-icon v-if="mode == 'edit'" class="ml-10 mt-5" v-bind="attrs" v-on="on"
        >mdi-square-edit-outline</v-icon
      >
    </template>

    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="#ca6b3e" dark>Ajouter un menu à la carte</v-toolbar>

        <v-card-text>
          <v-form class="mx-auto" ref="addMenuForm" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    color="#ca6b3e"
                    label="Nom"
                    v-model="menu.name"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="#ca6b3e"
                    label="Prix"
                    v-model="menu.price"
                    append-icon="mdi-currency-eur"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                  <v-text-field
                    color="#ca6b3e"
                    label="Image"
                    v-model="menu.image"
                    append-icon="mdi-camera"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-textarea
                    outlined
                    color="#ca6b3e"
                    name="input-7-4"
                    label="Description"
                    v-model="menu.description"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col cols="12" sm="5">
                  <v-select
                    color="#ca6b3e"
                    item-color="#ca6b3e"
                    :items="categories"
                    v-model="category"
                    label="Categorie"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="5">
                  <v-select
                    color="#ca6b3e"
                    item-color="#ca6b3e"
                    :items="categoryArticles"
                    v-model="articleName"
                    label="Article"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-btn
                    color="#ca6b3e"
                    dark
                    small
                    rounded
                    @click="addArticle()"
                    >Ajouter</v-btn
                  >
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Article</th>
                          <th class="text-left">Categorie</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="article in menu.articles"
                          :key="article.name"
                        >
                          <td>{{ article.name }}</td>
                          <td>{{ article.type }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn text @click="dialog.value = false">Annuler</v-btn>
          <v-btn
            text
            color="#ca6b3e"
            v-text="mode == 'create' ? 'Ajouter' : 'Sauvegarder'"
            @click="
              () => {
                addMenu();
                dialog.value = false;
              }
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Articles } from "@/shims-tsx";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AddMenu extends Vue {
  @Prop({
    default: "create",
    validator: (value: string) => ["create", "edit"].includes(value),
  })
  private mode!: string;

  @Prop({
    default: () => {
      return {
        name: "",
        articles: [],
        description: "",
        type: "",
        price: 0,
        image: "",
        quantity: 1,
        restaurant: "",
      };
    },
  })
  private menu!: Articles.Menu;

  private category: string = "";
  private articleName: string = "";

  private articles: Array<Articles.Article> = [
    {
      name: "Tripple Cheese",
      description:
        "Pain, Triple steack haché, Triple fromage, Sauce, Cornichon",
      type: "Burger",
      price: 5.0,
      quantity: 1,
      image: require("../assets/triple_cheese.png"),
      restaurant: "McDonald's",
    },
    {
      name: "CBO",
      description: "Pain, Poisson pané, Salade, Sauce, Cornichon",
      type: "Burger",
      price: 6.2,
      quantity: 1,
      image: require("../assets/CBO.png"),
      restaurant: "McDonald's",
    },
    {
      name: "Coca Cola",
      description: "50cl de pure fraicheur. Et tout cela, sans sucre !",
      type: "Boisson",
      price: 3.5,
      quantity: 1,
      image: require("../assets/coca_sans_sucre.png"),
      restaurant: "McDonald's",
    },
    {
      name: "Frite",
      description: "Une portion de frite pour accompagner ton plat.",
      type: "Accompagnement",
      price: 2.5,
      quantity: 1,
      image: require("../assets/frites.png"),
      restaurant: "McDonald's",
    },
  ];

  private addedArticles: Array<Articles.Article> = [];

  private addArticle() {
    this.menu.articles.push(this.selectedArticle);
  }

  get categories() {
    let categories: Array<string> = [];
    this.articles.forEach((article: Articles.Article) =>
      categories.push(article.type)
    );
    return categories;
  }

  get categoryArticles() {
    return this.articles
      .filter((article: Articles.Article) => article.type == this.category)
      .map((article: Articles.Article) => article.name);
  }

  get selectedArticle() {
    return this.articles.filter(
      (article: Articles.Article) => article.name == this.articleName
    )[0];
  }

  private addMenu() {
    this.$root.$emit("add-menu", this.menu);
  }

  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };
}
</script>