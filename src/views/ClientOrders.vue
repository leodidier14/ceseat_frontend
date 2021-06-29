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
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component
export default class ClientOrders extends Vue {
  private userModule = getModule(User, this.$store);
  private dialog: boolean = false;
  private currentDialogItem: any = [];

  private apiGetRoute: string =
    "http://localhost:3000/order/user/" + this.userModule.userId;
  private apiDeleteRoute: string = "http://localhost:3000/order/user/";

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

  public orders: Array<Orders.Order> = [];

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        this.orders = res.data;
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
        .delete(this.apiDeleteRoute + item.number, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          const index = this.orders.indexOf(item);
          this.orders.splice(index, 1);
        })
        .catch((error: any) => {
          //this.$router.go(0);
        })
        .finally(() => {});
    }
  }
}
</script>
