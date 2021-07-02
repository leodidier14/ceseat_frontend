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
      sort-desc.sync="true"
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
import Socket from "@/store/socket";

@Component
export default class ClientOrders extends Vue {
  private userModule = getModule(User, this.$store);
  private dialog: boolean = false;
  private currentDialogItem: any = [];
  private socketModule = getModule(Socket, this.$store);
  private apiGetRoute: string =
    "http://172.16.44.43:3000/order/user/" + this.userModule.userId;
  private apiDeleteRoute: string = "http://172.16.44.43:3000/order/user/";

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
        if (res.data) {
          this.orders = res.data;
          this.orders.reverse();
        }
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
    this.socketModule.socket.on(
      "UpdateStatement" + this.userModule.userId,
      (info: { status: string; id: number }) => {
        console.log(info);
        var message = "";
        switch (info.status) {
          case "pendingValidation":
            message = "en attente de validation.";
            break;
          case "pendingRealization":
            message = "en attente de réalisation.";
            break;
          case "realization":
            message = "en cours de réalisation.";
            break;
          case "pendingDelivery":
            message = "en attente de livraison.";
            break;
          case "delivery":
            message = "en cours livraison.";
            break;
        }
        this.$root.$emit(
          "update-statement",
          info,
          "La commande N°" + info.id + " est " + message
        );
      }
    );
    this.$root.$on(
      "update-statement",
      (info: { status: string; id: number }, message: string) => {
        var order = this.orders.findIndex(
          (w) => w.number == info.id.toString()
        );
        this.orders[order].status = info.status;
      }
    );
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
