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
          <td>{{ row.item.time }}</td>
          <td>{{ row.item.type }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.version }}</td>
          <td>{{ row.item.idUser }}</td>
          <td>
            <v-btn
              class="mx-2"
              text
              small
              color="red"
              @click="deleteLog(row.item)"
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
import { Logs } from "@/shims-tsx";
import axios from "axios";

@Component
export default class TechnicianConnexionLogs extends Vue {
  private dialog: boolean = false;
  private currentDialogItem: any = [];

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
    {
      text: "Supprimer",
      sortable: false,
    },
  ];

  private logs: Array<Logs.componentLogs> = [];
  //   {
  //     time: "25/06/2021 18h13",
  //     idUser: 2,
  //     type: "npm",
  //     name: "Button",
  //     version: "1.0.1",
  //   },
  // ];

  private apiGetRoute: string = "api/components-logs/";

  mounted() {
    axios
      .get(this.apiGetRoute)
      .then((res: any) => {
        //Perform Success Action
        this.logs = res;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  public deleteLog(item: Logs.componentLogs) {
    if (confirm("Etes-vous sûr de vouloir supprimer ce log ?")) {
      // const index = this.logs.indexOf(item);
      // this.logs.splice(index, 1);
      //axios delete
      axios
        .delete(this.apiGetRoute)
        .then((res: any) => {
          //Perform Success Action
          this.logs = res;
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
}
</script>
