<template>
  <v-card
    class="deliveryman-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5">Mes commandes</h3>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 30px;
      "
    >
      <span class="mr-2">Disponible ?</span>
      <v-switch color="green" v-model="deliveryManState"></v-switch>
    </div>
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
            <h4 class="text-center py-2" style="color: white">
              Nouvelles commandes
            </h4>
            <div class="flex-container">
              <DeliveryManOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getPendingOrders()"
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
            <div class="flex-container">
              <DeliveryManOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getTakingOrders()"
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

@Component({
  components: {
    DeliveryManOrderCard,
  },
})
export default class RestaurantsOrders extends Vue {
  private deliveryManState: boolean = true;
  private orders: Array<Orders.Order> = [];

  private apiPutRoute: string =
    "http://localhost:3000/orders/statement/delivered";
  private apiGetRoute: string =
    "http://localhost:3000/order/deliveryman/" +
    localStorage.getItem("deliverymanId");

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res: any) => {
        //Perform Success Action
        this.orders = res.data;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });

    this.$root.$on("update-order-status", (status: string) =>
      this.putStatus(status)
    );
  }

  private putStatus(status: string) {
    axios
      .post(this.apiPutRoute, { status: status })
      .then((res: any) => {
        this.orders = res;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  getPendingOrders() {
    return this.orders.filter(
      (i) =>
        (i.status === "pendingRealization" || i.status === "realization") &&
        i.deliveryManId === 0
    );
  }

  getTakingOrders() {
    console.log(
      this.orders.filter((i) => i.deliveryManId != 0)[0].restaurantAddress[0]
    );
    return this.orders.filter((i) => i.deliveryManId != 0);
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
