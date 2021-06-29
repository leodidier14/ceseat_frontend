<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Logs des téléchargements de composants
    </h3>
    <v-data-table
      :headers="headers"
      :items="logs"
      :header-props="headerProps"
      :footer-props="footerProps"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de logs disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.date + " " + row.item.heure }}</td>
          <td>{{ row.item.type }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.version }}</td>
          <td>{{ row.item.idUser }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Logs } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component
export default class TechnicianConnexionLogs extends Vue {
  private dialog: boolean = false;
  private currentDialogItem: any = [];
  private userModule = getModule(User, this.$store);

  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Logs par page",
  };

  private headers: object = [
    {
      text: "Date et heure",
      value: "time",
    },
    {
      text: "Type",
      value: "type",
    },
    {
      text: "Nom du composant",
      value: "name",
    },
    {
      text: "Version",
      value: "version",
    },
    {
      text: "ID utilisateur",
      value: "idUser",
    },
  ];

  private logs: Array<Logs.componentLogs> = [];

  private apiGetRoute: string =
    "http://localhost:3000/devTools/logs/components/";

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
        this.logs = res.data;
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
</script>
