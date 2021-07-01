<template>
  <v-card
    class="restaurant-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5">Les commandes du restaurant</h3>
    <v-container class="restaurant-orders-container" v-if="renderComponent">
      <v-row class="restaurant-orders-row pt-5">
        <v-col cols="12" class="pb-5">
          <v-card
            class="new-order-card mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">
              Nouvelles commandes
            </h4>
            <div class="flex-container" v-if="getOrdersLength()">
              <RestaurantOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getPendingValidationOrders()"
                :key="order.number"
              />
            </div> </v-card
        ></v-col>

        <v-col cols="12" md="4" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="97%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center mt-2 py-2" style="color: white">
              En attentes
            </h4>
            <div class="flex-container" v-if="getOrdersLength()">
              <RestaurantOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getPendingRealizationOrders()"
                :key="order.number"
              />
            </div> </v-card
        ></v-col>
        <v-col cols="12" md="4" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="97%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center mt-2 py-2" style="color: white">En cours</h4>
            <div class="flex-container" v-if="getOrdersLength()">
              <RestaurantOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getRealizationOrders()"
                :key="order.number"
              /></div></v-card
        ></v-col>
        <v-col cols="12" md="4" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="97%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center mt-2 py-2" style="color: white">Prêtes</h4>
            <div class="flex-container" v-if="getOrdersLength()">
              <RestaurantOrderCard
                class="restaurant-order-card"
                :order="order"
                v-for="order in getPendingDeliveryOrders()"
                :key="order.number"
              /></div></v-card
        ></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import RestaurantOrderCard from "@/components/RestaurantOrderCard.vue";
import { Orders } from "@/shims-tsx";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";
import Socket from "@/store/socket";

@Component({
  components: {
    RestaurantOrderCard,
  },
})
export default class RestaurantsOrders extends Vue {
  private userModule = getModule(User, this.$store);
  private socketModule = getModule(Socket, this.$store);
  private orders: Array<Orders.Order> = [];

  private renderComponent: boolean = true;

  private apiGetRoute: string =
    "http://localhost:3000/order/restaurant/currentorder/" +
    this.userModule.roleId;

  public putStatus(info: { status: string; id: number }): void {
    let apiPutRoute = "http://localhost:3000/order/statement/";
    switch (info.status) {
      case "pendingRealization":
        apiPutRoute += "validate/" + info.id;
        break;
      case "realization":
        apiPutRoute += "update/" + info.id;
        break;
      case "pendingDelivery":
        apiPutRoute += "update/" + info.id;
        break;
      case "delivery":
        apiPutRoute += "update/" + info.id;
        break;
      case "denied":
        apiPutRoute += "update/" + info.id;
        break;
    }

    axios
      .put(apiPutRoute, info, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        // this.renderComponent = false;
        // this.$nextTick(() => {
        //   // Add the component back in
        //   this.renderComponent = true;
        // });
        console.log("good");
        this.$router.go(0);
      })
      .catch((error: any) => {
        // error.response.status Check status code
        console.log("error");
      })
      .finally(() => {
        //Perform action in always
        console.log("finally");
      });
  }
  created() {
    this.socketModule.socket.on(
      "NewOrder" + this.userModule.roleId,
      (newOrder: Orders.Order) => {
        this.$root.$emit(
          "update-statement",
          newOrder,
          "Une nouvelle comande N°" +
            newOrder.number +
            " est en attente de validation."
        );
        this.orders.push(newOrder);
      }
    );
    this.socketModule.socket.on(
      "DeliveredOrder" + this.userModule.roleId,
      (orderId: number) => {
        var order = this.orders.findIndex(
          (w) => w.number == orderId.toString()
        );
        this.orders[order].status = "delivered";
        this.$root.$emit(
          "update-statement",
          order,
          "La commande N° : " + orderId + " a été livrée."
        );
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
        if (res.data[0].OrdersList) {
          this.orders = res.data[0].OrdersList;
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
      (info: { status: string; id: number }) => {
        this.$router.go(0);
        this.putStatus(info);
      }
    );
  }

  getPendingValidationOrders() {
    return this.orders.filter((i) => i.status === "pendingValidation");
  }

  getPendingRealizationOrders() {
    return this.orders.filter((i) => i.status === "pendingRealization");
  }

  getRealizationOrders() {
    return this.orders.filter((i) => i.status === "realization");
  }

  getPendingDeliveryOrders() {
    return this.orders.filter(
      (i) => i.status === "pendingDelivery" || i.status === "delivery"
    );
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

.restaurant-orders-container {
  height: 100% !important;
  padding: 0 !important;
}
.restaurant-orders-row {
  height: 80%;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 80%;
}

@media screen and (max-width: 965px) {
  .new-order-card {
    width: 97% !important;
  }
}
</style>
