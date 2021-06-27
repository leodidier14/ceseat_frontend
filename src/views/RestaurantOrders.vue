<template>
  <v-card
    class="restaurant-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5">Les commandes du restaurant</h3>
    <v-container class="restaurant-orders-container">
      <v-row class="restaurant-orders-row pt-5">
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
            <div class="flex-container">
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
            <div class="flex-container">
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
            <div class="flex-container">
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

@Component({
  components: {
    RestaurantOrderCard,
  },
})
export default class RestaurantsOrders extends Vue {
  private orders: Array<Orders.Order> = [];
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
  //     status: "pendingValidation",
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
  //     status: "realization",
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
  //     number: "Commande4",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 10.0,
  //     comment: "Ajoutez des cornichons",
  //     status: "pendingDelivery",
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
  //     number: "Commande5",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 10.0,
  //     comment: "Ajoutez des cornichons",
  //     status: "delivery",
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
  // ];

  private apiPutRoute: string = "api/orders/id";
  private apiGetRoute: string = "api/orders/";

  public putStatus(status: string): void {
    axios
      .post(this.apiPutRoute, { status: status })
      .then((res: any) => {
        //Perform Success Action
      })
      .catch((error: any) => {
        // error.response.status Check status code
        this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });
  }

  mounted() {
    axios
      .get(this.apiGetRoute)
      .then((res: any) => {
        //Perform Success Action
        this.orders = res;
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
  .restaurant-orders-card {
    width: 100% !important;
  }
}
</style>
