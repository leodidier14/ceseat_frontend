<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">Composants npm</h3>
    <v-data-table
      :headers="headers"
      :items="components"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de composants disponibles</template>
      <template v-slot:item="row">
        <tr>
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
              href="https://github.com/leodidier14"
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

@Component
export default class DeveloperNpm extends Vue {
  private headers: object = [
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

  private components: Array<Components.npmComponent> = [
    {
      name: "Bouton",
      description: "Bouton aux couleur de Ces'Eat",
      version: "1.0.0",
      documentationLink: "https://github.com/leodidier14",
      downloadLink: "https://github.com/leodidier14",
    },
    {
      name: "NavBar",
      description: "NavBar aux couleur de Ces'Eat",
      version: "1.0.0",
      documentationLink: "https://github.com/leodidier14",
      downloadLink: "https://github.com/leodidier14",
    },
  ];
}
</script>
