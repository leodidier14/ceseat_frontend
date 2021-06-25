<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">Historique</h3>
    <v-data-table
      :headers="headers"
      :items="getOrdersHistory()"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de commandes disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.number }}</td>
          <td>{{ row.item.date }}</td>
          <td>{{ row.item.clientName }}</td>
          <td>{{ row.item.deliveryManName }}</td>
          <td>{{ row.item.price }}€</td>
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
          Numéro : {{ currentDialogItem.number }}
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
              <div
                v-for="article in currentDialogItem.articles"
                :key="article.name"
              >
                <v-list-item-subtitle>
                  {{ article.name }} x {{ article.quantity }}:
                  {{ article.price }}€</v-list-item-subtitle
                >
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Commentaire : </v-list-item-title>
              <v-list-item-subtitle>{{
                currentDialogItem.comment
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total</v-list-item-title>
              <v-list-item-subtitle>
                {{ currentDialogItem.price }}€</v-list-item-subtitle
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
import { Orders } from "@/shims-tsx";

@Component
export default class RestaurantHistory extends Vue {
  private dialog: boolean = false;
  private currentDialogItem: any = [];
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

  private orders: Array<Orders.RestaurantOrder> = [
    {
      number: "Commande1",
      clientName: "Léo DIDIER",
      deliveryManName: "Romain Kauf",
      price: "10.00",
      comment: "Ajoutez des cornichons",
      status: "delivered",
      date: "14h45 24/06/21",
      articles: [
        {
          name: "menu",
          price: 10,
          quantity: 1,
        },
        {
          name: "Hamburger",
          quantity: 2,
          price: 2,
        },
      ],
    },
    {
      number: "Commande2",
      clientName: "Léo DIDIER",
      deliveryManName: "Romain Kauf",
      price: "20.00",
      date: "14h45 16/04/21",
      comment: "Ajoutez des cornichons",
      status: "realization",
      articles: [
        {
          name: "menu",
          price: 10,
          quantity: 1,
        },
        {
          name: "Hamburger",
          quantity: 2,
          price: 2,
        },
      ],
    },
    {
      number: "Commande3",
      clientName: "Léo DIDIER",
      deliveryManName: "Romain Kauf",
      price: "20.00",
      date: "14h45 17/03/21",
      comment: "Ajoutez des cornichons",
      status: "delivered",
      articles: [
        {
          name: "menu",
          price: 10,
          quantity: 1,
        },
        {
          name: "Hamburger",
          quantity: 2,
          price: 2,
        },
      ],
    },
  ];

  getOrdersHistory() {
    return this.orders.filter((i) => i.status === "delivered");
  }

  public showDialog(item: Orders.RestaurantOrder) {
    this.dialog = true;
    this.currentDialogItem = item;
  }

  public deleteOrder(item: Orders.RestaurantOrder) {
    const index = this.orders.indexOf(item);
    this.orders.splice(index, 1);
    //axios delete
  }
}
</script>
