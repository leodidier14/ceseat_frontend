<template>
  <v-card class="mx-auto" elevation="10" width="80%" height="100%">
    <h3 class="text-center pt-5" style="font-weight: normal">Mes commandes</h3>
    <v-data-table
      :headers="headers"
      :items="orders"
      :header-props="headerProps"
      :footer-props="footerProps"
      :items-per-page="5"
      class="elevation-1 pt-5"
      lang="fr"
    >
      <template slot="no-data">Désolé, pas de commandes disponibles</template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.number }}</td>
          <td>
            <span v-if="row.item.status == 'pendingValidation'">
              En attente d'acceptation
            </span>
            <span v-else-if="row.item.status == 'pendingRealization'">
              En attente de préparation
            </span>
            <span v-else-if="row.item.status == 'realization'"
              >En préparation
            </span>
            <span v-else-if="row.item.status == 'pendingDelivery'">
              En attente de livraison
            </span>
            <span v-else-if="row.item.status == 'delivery'">
              En cours de livraison
            </span>
            <span v-else-if="row.item.status == 'delivered'">Livrée</span>
            <span v-else-if="row.item.status == 'denied'">Refusée</span>
          </td>

          <td>{{ row.item.date }}</td>
          <td>{{ row.item.restaurantName }}</td>
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
              v-if="
                row.item.status == 'delivered' || row.item.status == 'denied'
              "
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
              <v-list-item-title>Restaurant</v-list-item-title>
              <v-list-item-subtitle
                >{{ currentDialogItem.restaurantName }}
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
import axios from "axios";

@Component
export default class ClientOrders extends Vue {
  private dialog: boolean = false;
  private currentDialogItem: any = [];

  private apiGetRoute: string = "api/customer/orders"

  private headerProps: object = {
    sortByText: "Trier par",
  };
  private footerProps: object = {
    "items-per-page-text": "Commandes par page",
  };

  private headers: object = [
    {
      text: "Numéro de commande",
      value: "orderNumber",
    },
    {
      text: "Status",
      value: "status",
    },
    {
      text: "Date",
      value: "date",
    },
    {
      text: "Restaurant",
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

  private orders: Array<Orders.Order> = []

  // private orders: Array<Orders.Order> = [
  //   {
  //     number: "Commande1",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 10.0,
  //     comment: "Ajoutez des cornichons",
  //     status: "pendingRealization",
  //     date: "04/03/2021 18h30",
  //     articles: [
  //       {
  //         name: "menu",
  //         description: "",
  //         image: "",
  //         type: "Menu",
  //         restaurant: "",
  //         price: 10,
  //         quantity: 1,
  //       },
  //       {
  //         name: "menu",
  //         description: "",
  //         image: "",
  //         type: "Menu",
  //         restaurant: "",
  //         price: 10,
  //         quantity: 1,
  //       },
  //     ],
  //   },
  //   {
  //     number: "Commande2",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 10.0,
  //     comment: "Ajoutez des cornichons",
  //     status: "delivered",
  //     date: "04/03/2021 18h30",
  //     articles: [
  //       {
  //         name: "menu",
  //         description: "",
  //         image: "",
  //         type: "Menu",
  //         restaurant: "",
  //         price: 10,
  //         quantity: 1,
  //       },
  //       {
  //         name: "menu",
  //         description: "",
  //         image: "",
  //         type: "Menu",
  //         restaurant: "",
  //         price: 10,
  //         quantity: 1,
  //       },
  //     ],
  //   },
  //   {
  //     number: "Commande3",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 10.0,
  //     comment: "Ajoutez des cornichons",
  //     status: "denied",
  //     date: "04/03/2021 18h30",
  //     articles: [
  //       {
  //         name: "menu",
  //         description: "",
  //         image: "",
  //         type: "Menu",
  //         restaurant: "",
  //         price: 10,
  //         quantity: 1,
  //       },
  //       {
  //         name: "menu",
  //         description: "",
  //         image: "",
  //         type: "Menu",
  //         restaurant: "",
  //         price: 10,
  //         quantity: 1,
  //       },
  //     ],
  //   }
  // ];

  mounted() {
    axios
      .get(this.apiGetRoute)
      .then((res: any) => {
        this.orders = res;
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
  }

  public showDialog(item: Orders.Order) {
    this.dialog = true;
    this.currentDialogItem = item;
  }

  public deleteOrder(item: Orders.Order) {
    if (
      confirm(
        "Etes-vous sûr de vouloir supprimer la commande '" +
          item.number +
          "' de l'historique ?"
      )
    ) {
      // const index = this.orders.indexOf(item);
      // this.orders.splice(index, 1);
      //axios delete
      axios
      .delete(this.apiGetRoute + item.number)
      .then((res: any) => {
        this.orders = res;
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
    }
  }
}
</script>
