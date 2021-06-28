<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Nombre de requêtes par jour - micro-services
    </h3>
    <v-data-table
      :headers="headers"
      :items="stats"
      :header-props="headerProps"
      :footer-props="footerProps"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de stats disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.date }}</td>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.description }}</td>
          <td>{{ row.item.requestNumber }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Stats } from "@/shims-tsx";
import axios from "axios";

@Component
export default class BusinessStats extends Vue {
  private dialog: boolean = false;
  private currentDialogItem: any = [];

  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Stats par page",
  };

  private headers: object = [
    {
      text: "Date",
      value: "date",
    },
    {
      text: "Micro-service",
      value: "name",
    },
    {
      text: "Description",
      value: "description",
    },
    {
      text: "Nombre de requêtes",
      value: "requestNumber",
    },
  ];

  private stats: Array<Stats.microserviceRequest> = [];
  //   {
  //     id: 1,
  //     date: "25/06/2021",
  //     name: "API Auth",
  //     description: "API de connexion pour le client",
  //     requestNumber: 15,
  //   },
  // ];

  private apiGetBusinessStats: string = "api/business-stats/";

  mounted() {
    axios
      .get(this.apiGetBusinessStats)
      .then((res: any) => {
        //Perform Success Action
        this.stats = res.stats
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
