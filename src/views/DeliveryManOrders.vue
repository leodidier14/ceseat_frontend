<template>
  <v-card
    class="deliveryman-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5 pb-5">Mes commandes</h3>

    <v-container class="deliveryman-orders-container">
      <v-row class="deliveryman-orders-row">
        <v-col cols="12" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center pt-2" style="color: white">
              Nouvelles commandes
            </h4>
            <div class="flex-container" v-if="getOrdersLength()">
              <DeliveryManOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getTakingOrders()"
                :key="order.number"
              />
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">
              Commande à livrer
            </h4>

            <div class="flex-container" v-if="getOrdersLength()">
              <DeliveryManOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getPendingOrders()"
                :key="order.number"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DeliveryManOrderCard from "@/components/DeliveryManOrderCard.vue";
import { Orders } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";
import Socket from "@/store/socket";
@Component({
  components: {
    DeliveryManOrderCard,
  },
})
export default class RestaurantsOrders extends Vue {
  private userModule = getModule(User, this.$store);
  private deliveryManState: boolean = true;
  private orders: Array<Orders.Order> = [];
  private socketModule = getModule(Socket, this.$store);
  private apiPutDelivredRoute: string =
    "http://172.16.44.43:3000/orders/statement/delivered/";
  private apiPutAcceptedRoute: string =
    "http://172.16.44.43:3000/orders/statement/deliverymanaccept/";
  private apiGetRoute: string =
    "http://172.16.44.43:3000/order/deliveryman/" + this.userModule.roleId;

  created() {
    this.socketModule.socket.on(
      "NewOrderToDelivery",
      (newOrder: Orders.Order) => {
        if (!this.orders.find((o) => o.number == newOrder.number)) {
          this.$root.$emit(
            "update-statement",
            {
              status: "Attente de Validation",
              id: newOrder.number,
            },
            "Nouvelle commande en attente de validation"
          );
          this.orders.push(newOrder);
        }
      }
    );
  }

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        //console.log(res);
        if (res.data != "") {
          this.orders = res.data;
        }
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });

    this.$root.$on(
      "update-order-status",
      (info: { status: string; id: number }) => this.putStatus(info)
    );
  }

  private putStatus(info: { status: string; id: number }) {
    switch (info.status) {
      case "deniedDelivery":
        var index = this.orders
          .map((x) => {
            return x.number;
          })
          .indexOf(info.id.toString());
        this.orders.splice(index, 1);
        break;
      case "AcceptDelivery":
        axios
          .put(this.apiPutAcceptedRoute + info.id, info, {
            headers: {
              Authorization: this.userModule.token,
            },
          })
          .then((res: any) => {
            this.$router.go(0);
          })
          .catch((error: any) => {
            // error.response.status Check status code
            this.$router.go(0);
          })
          .finally(() => {
            //Perform action in always
          });
        break;
      case "delivered":
        axios
          .put(this.apiPutDelivredRoute + info.id, info, {
            headers: {
              Authorization: this.userModule.token,
            },
          })
          .then((res: any) => {
            this.$router.go(0);
          })
          .catch((error: any) => {
            // error.response.status Check status code
            this.$router.go(0);
          })
          .finally(() => {
            //Perform action in always
          });
        break;
    }
  }

  getPendingOrders() {
    return this.orders.filter(
      (i) =>
        (i.status == "pendingRealization" ||
          i.status == "realization" ||
          i.status == "pendingDelivery" ||
          i.status == "delivery") &&
        i.deliveryManId == this.userModule.roleId
    );
  }

  getTakingOrders() {
    return this.orders.filter((i) => i.deliveryManId == null);
  }

  getOrdersLength() {
    return this.orders.length > 0;
  }
}
</script>

<style scoped>
h3,
h4 {
  font-weight: normal;
}

.deliveryman-orders-container {
  height: 100% !important;
  padding: 0 !important;
}
.deliveryman-orders-row {
  height: 80%;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 80%;
}

@media screen and (max-width: 965px) {
  .deliveryman-orders-card {
    width: 100% !important;
  }
}
</style>
