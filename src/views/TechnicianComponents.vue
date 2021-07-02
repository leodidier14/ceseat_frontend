<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center py-5" style="font-weight: normal">
      Composants disponibles
    </h3>
    <div style="display: flex; justify-content: flex-end">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-3"
            small
            rounded
            color="#CA6B3E"
            style="color: white"
            v-bind="attrs"
            v-on="on"
          >
            Ajouter
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="text-h5"> Ajoutez un composant </v-card-title>

          <v-card-text>
            <v-form v-model="valid" ref="componentForm">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      v-model="component.type"
                      :items="types"
                      label="Type"
                      :rules="[rules.required]"
                      required
                      color="#CA6B3E"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="component.name"
                      label="Nom"
                      :rules="[rules.required]"
                      required
                      color="#CA6B3E"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="component.description"
                      color="#CA6B3E"
                      :rules="[rules.required]"
                    >
                      <template v-slot:label>
                        <div>Description</div>
                      </template>
                    </v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="component.version"
                      label="Version"
                      color="#CA6B3E"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="component.documentationLink"
                      label="Lien documentation"
                      :rules="[rules.required]"
                      color="#CA6B3E"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="component.downloadLink"
                      label="Lien téléchargement"
                      color="#CA6B3E"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container> </v-form
          ></v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#CA6B3E" text @click="submitForm()">Ajouter</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <v-data-table
      :headers="headers"
      :items="components"
      :items-per-page="5"
      :header-props="headerProps"
      :footer-props="footerProps"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de composants disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.type }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.description }}</td>
          <td>{{ row.item.version }}</td>
          <td>
            <v-btn
              class="mx-2"
              text
              small
              color="black"
              v-bind:href="row.item.documentationLink"
            >
              <v-icon dark>mdi-information</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              class="mx-2"
              text
              small
              color="green"
              v-bind:href="row.item.downloadLink"
            >
              <v-icon dark>mdi-download</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              class="mx-2"
              text
              small
              color="red"
              @click="deleteComponent(row.item)"
            >
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Components } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component
export default class TechnicianComponents extends Vue {
  private dialog: boolean = false;
  private valid: boolean = true;
  private userModule = getModule(User, this.$store);

  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Composants par page",
  };

  private headers: object = [
    {
      text: "Type",
      value: "type",
    },
    {
      text: "Nom",
      value: "name",
    },
    {
      text: "Description",
      value: "description",
    },
    {
      text: "Version",
      value: "version",
    },
    {
      text: "Documentation",
      value: "documentationLink",
      sortable: false,
    },
    {
      text: "Télecharger",
      value: "downloadLink",
      sortable: false,
    },
    {
      text: "Supprimer",
      sortable: false,
    },
  ];

  private types: Array<string> = ["npm", "Micro-service"];

  private component: Components.component = {
    _id: 0,
    type: "",
    name: "",
    version: "",
    description: "",
    documentationLink: "",
    downloadLink: "",
  };

  private components: Array<Components.component> = [];

  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private apiGetRoute: string = "http://172.16.44.43:3000/devTools/components/";

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        console.log(res.data);
        this.components = res.data;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  public deleteComponent(item: Components.component) {
    if (
      confirm(
        "Etes-vous sûr de vouloir supprimer le composant '" + item.name + "' ?"
      )
    ) {
      //axios delete
      console.log(item);
      axios
        .delete(this.apiGetRoute + item._id, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          //Perform Success Action
          const index = this.components.indexOf(item);
          this.components.splice(index, 1);
        })
        .catch((error: any) => {
          // error.response.status Check status code
          //this.$router.go(0);
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }

  public submitForm() {
    if (
      (this.$refs.componentForm as Vue & { validate: () => boolean }).validate()
    ) {
      axios
        .post(this.apiGetRoute, this.component, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          this.components.push(JSON.parse(JSON.stringify(this.component)));
          this.component = {
            _id: 0,
            type: "",
            name: "",
            version: "",
            description: "",
            documentationLink: "",
            downloadLink: "",
          };
          this.dialog = false;
        })
        .catch((error: any) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }
}
</script>
