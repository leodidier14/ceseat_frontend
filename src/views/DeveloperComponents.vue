<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Composants disponibles
    </h3>
    <v-data-table
      :headers="headers"
      :items="components"
      :header-props="headerProps"
      :footer-props="footerProps"
      :items-per-page="5"
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
              href="https://github.com/leodidier14"
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
              @click="logDl(row.item)"
            >
              <v-icon dark>mdi-download</v-icon>
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
export default class DeveloperComponent extends Vue {
  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Composants par page",
  };
  private userModule = getModule(User, this.$store);
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
  ];

  private components: Array<Components.component> = [];

  private apiGetRoute: string = "http://172.16.44.43:3000/devTools/components/";
  private apiSubmitLogRoute: string =
    "http://172.16.44.43:3000/devTools/logs/components/";

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        this.components = res.data;
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }
  public logDl(item: Components.component) {
    axios
      .post(this.apiSubmitLogRoute, item, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }
}
</script>
