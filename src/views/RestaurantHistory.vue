<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.orderNumber }}</td>
          <td>{{ row.item.date }}</td>
          <td>{{ row.item.clientName }}</td>
          <td>{{ row.item.deliveryManName }}</td>
          <td>{{ row.item.totalPrice }}€</td>
          <td>
            <v-btn
              class="mx-2"
              text
              small
              color="black"
              @click="showDialog(row.item)"
            >
              <v-icon dark>mdi-information</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn
              class="mx-2"
              text
              small
              color="red"
              @click="deleteOrder(row.item)"
            >
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5" style="color: #ca6b3e">
          Numéro : {{ currentDialogItem.orderNumber }}
        </v-card-title>

        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Client</v-list-item-title>
              <v-list-item-subtitle
                >{{ currentDialogItem.clientName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Livreur</v-list-item-title>
              <v-list-item-subtitle>{{
                currentDialogItem.deliveryManName
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Liste d'articles : </v-list-item-title>
              <div>
                <v-list-item-subtitle> </v-list-item-subtitle>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Commentaire : </v-list-item-title>
              <v-list-item-subtitle> </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total</v-list-item-title>
              <v-list-item-subtitle>
                {{ currentDialogItem.totalPrice }}€</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#ca6b3e" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class RestaurantHistory extends Vue {
  private dialog: boolean = false;
  private currentDialogItem: object = [];
  private selected: Array<any> = [];
  private headers: object = [
    {
      text: "Numéro de commande",
      value: "orderNumber",
    },
    {
      text: "Date",
      value: "date",
    },
    {
      text: "Client",
      value: "clientName",
    },
    {
      text: "Livreur",
      value: "deliveryManName",
    },
    {
      text: "Prix",
      value: "totalPrice",
    },
    {
      text: "Informations",
      sortable: false,
    },
    {
      text: "Supprimer",
      sortable: false,
    },
  ];

  private orders: Array<any> = [
    {
      orderNumber: "commande1",
      date: "19h50 25/06/21",
      clientName: "Dylan LAFARGE",
      deliveryManName: "Léo DIDIER",
      totalPrice: 50.0,
    },
    {
      orderNumber: "commande2",
      date: "19h50 21/06/21",
      clientName: "Dylan LAFARGE",
      deliveryManName: "Léo DIDIER",
      totalPrice: 10.0,
    },
  ];

  public showDialog(item: object) {
    this.dialog = true;
    this.currentDialogItem = item;
  }

  public deleteOrder(item: object) {
    for (var i = 0; i < this.selected.length; i++) {
      const index = this.orders.indexOf(this.selected[i]);
      this.orders.splice(index, 1);
    }
  }
}
</script>

<style scoped>
</style>
