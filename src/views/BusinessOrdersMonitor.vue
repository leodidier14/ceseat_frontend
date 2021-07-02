<template>
  <v-card
    class="business-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <span id="header">
      <router-link class="link ml-5 pt-5" to="/business-orders-monitor"
        ><v-icon>mdi-close </v-icon></router-link
      >

      <h3 id="title" class="ml-5 pt-5">
        <span class="hidden-md-and-down">Suivi de commandes : </span> &nbsp;
        {{ $route.params.restaurantId }}
      </h3>
      <h3 class="pt-5 pr-5">
        <span class="hidden-md-and-down">
          Chiffre d'affaire transactionnel :
        </span>
        &nbsp; {{ transac }} €
      </h3>
    </span>

    <v-container class="business-orders-container">
      <v-row class="business-order-row pt-5">
        <v-col cols="12" md="6" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">En attentes</h4>
            <div class="flex-container">
              <RestaurantOrderCard
                cardType="business"
                class="business-order-card"
                :order="order"
                v-for="order in getPendingRealizationOrders()"
                :key="order.number"
              />
            </div> </v-card
        ></v-col>
        <v-col cols="12" md="6" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center py-2" style="color: white">En cours</h4>
            <div class="flex-container">
              <RestaurantOrderCard
                cardType="business"
                class="business-order-card"
                :order="order"
                v-for="order in getRealizationOrders()"
                :key="order.number"
              />
            </div> </v-card
        ></v-col>

        <v-col cols="12" md="6" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="97%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center mt-2 py-2" style="color: white">
              En attentes de livraison
            </h4>
            <div class="flex-container">
              <RestaurantOrderCard
                cardType="business"
                class="business-order-card"
                :order="order"
                v-for="order in getPendingDeliveryOrders()"
                :key="order.number"
              />
            </div> </v-card
        ></v-col>
        <v-col cols="12" md="6" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="97%"
            height="100%"
            color="#CA6B3E"
          >
            <h4 class="text-center mt-2 py-2" style="color: white">
              Livraison
            </h4>
            <div class="flex-container">
              <RestaurantOrderCard
                cardType="business"
                class="business-order-card"
                :order="order"
                v-for="order in getDeliveryOrders()"
                :key="order.number"
              /></div></v-card
        ></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RestaurantOrderCard from "@/components/RestaurantOrderCard.vue";
import { Orders } from "@/shims-tsx";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component({
  components: {
    RestaurantOrderCard,
  },
})
export default class BusinessOrdersMonitor extends Vue {
  private orders: Array<Orders.Order> = [];
  private userModule = getModule(User, this.$store);
  private transac: number = 0;
  private apiGetRoute: string =
    "http://localhost:3000/order/restaurant/currentorder/" +
    this.$route.params.restaurantId;
  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        //Perform Success Action
        if (res.data[0]) {
          console.log(res.data[0]);
          this.orders = res.data[0].OrdersList;
          this.transac = res.data[0].transac;
        }
      })
      .catch((error: any) => {
        // error.response.status Check status code
        //this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  getPendingRealizationOrders() {
    if (this.orders) {
      return this.orders.filter((i) => i.status === "pendingRealization");
    }
  }

  getRealizationOrders() {
    if (this.orders) {
      return this.orders.filter((i) => i.status === "realization");
    }
  }

  getPendingDeliveryOrders() {
    if (this.orders) {
      return this.orders.filter((i) => i.status === "pendingDelivery");
    }
  }

  getDeliveryOrders() {
    if (this.orders) {
      return this.orders.filter((i) => i.status === "delivery");
    }
  }
}
</script>

<style scoped>
h3,
h4 {
  font-weight: normal;
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.business-orders-container {
  height: 100% !important;
  padding: 0 !important;
}
.business-order-row {
  height: 80%;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 80%;
}

@media screen and (max-width: 965px) {
  .business-orders-card {
    width: 100% !important;
  }
}

.link {
  text-decoration: none;
}
</style>


