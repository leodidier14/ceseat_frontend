<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        id="button"
        v-if="mode == 'create'"
        class="ml-5"
        rounded
        :x-small="$vuetify.breakpoint.mdAndDown"
        :large="$vuetify.breakpoint.mdAndUp"
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
                    label="Lien image"
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
                  <v-data-table
                    v-if="renderComponent"
                    :headers="headers"
                    :items="menu.articles"
                    :hide-default-footer="true"
                    class="elevation-1 pt-5"
                    lang="fr"
                  >
                    <template slot="no-data">Aucun article</template>
                    <template v-slot:item="row">
                      <tr>
                        <td>{{ row.item.name }}</td>
                        <td>{{ row.item.type }}</td>
                        <td>
                          <v-btn
                            class="mx-2"
                            text
                            small
                            color="red"
                            @click="deleteArticle(row.item)"
                          >
                            <v-icon dark>mdi-delete</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
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
            @click="addMenu()"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { Articles } from "@/shims-tsx";
import { Component, Prop, Vue } from "vue-property-decorator";
import Vuetify from "vuetify/lib";

@Component
export default class AddMenu extends Vue {
  @Prop({
    default: "create",
    validator: (value: string) => ["create", "edit"].includes(value),
  })
  private mode!: string;
  public renderComponent: boolean = true;
  @Prop()
  private articles!: Array<Articles.Article>;

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

  private headers: object = [
    {
      text: "Article",
      value: "name",
    },
    {
      text: "Categorie",
      value: "type",
    },
    {
      text: "Supprimer",
      sortable: false,
    },
  ];
  mounted() {
    console.log("mounted");
    console.log(this.menu);
  }
  private dialog: boolean = false;

  private category: string = "";
  private articleName: string = "";

  private addArticle() {
    this.menu.articles.push(this.selectedArticle);
    if (!this.menu.articles) this.menu.articles = [];
    console.log(this.menu.articles);

    this.renderComponent = false;
    this.$nextTick(() => {
      // Add the component back in
      this.renderComponent = true;
    });
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

  private deleteArticle(item: Articles.Article) {
    const index = this.menu.articles.indexOf(item);
    this.menu.articles.splice(index, 1);
    this.renderComponent = false;
    this.$nextTick(() => {
      // Add the component back in
      this.renderComponent = true;
    });
  }

  private addMenu() {
    if (
      (this.$refs.addMenuForm as Vue & { validate: () => boolean }).validate()
    ) {
      this.$root.$emit("add-menu", this.menu);
      this.dialog = false;
    } else {
    }
  }

  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };
}
</script>

<style scoped>
@media screen and (max-width: 813px) {
  #button {
    margin-top: 10px;
  }
}
</style>