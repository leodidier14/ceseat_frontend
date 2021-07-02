<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">
      Nombre de requêtes aujourd'hui - micro-services
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
          <td>{{ row.item._id }}</td>
          <td>{{ row.item.count }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Stats } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component
export default class BusinessStats extends Vue {
  private dialog: boolean = false;
  private userModule = getModule(User, this.$store);
  private currentDialogItem: any = [];

  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Stats par page",
  };

  private headers: object = [
    {
      text: "Micro-service",
      value: "name",
    },
    {
      text: "Nombre de requêtes aujourd'hui",
      value: "requestNumber",
    },
  ];

  private stats: Array<Stats.microserviceRequest> = [];

  private apiGetBusinessStats: string =
    "http://172.16.44.43:3000/stats/components/";

  mounted() {
    axios
      .get(this.apiGetBusinessStats, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        console.log(res.data);
        this.stats = res.data;
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
