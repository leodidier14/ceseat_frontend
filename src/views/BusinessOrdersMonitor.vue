<template>
  <v-card
    class="business-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <span id="header">
      <h3 id="title" class="ml-5 pt-5">
        <span class="hidden-md-and-down">Suivi de commandes : </span> &nbsp;
        {{ $route.params.restaurantId }}
      </h3>
      <h3 class="pt-5 pr-5">
        <span class="hidden-md-and-down">
          Chiffre d'affaire transactionnel :
        </span>
        &nbsp; {{ totalPrice }} €
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

@Component({
  components: {
    RestaurantOrderCard,
  },
})
export default class BusinessOrdersMonitor extends Vue {
  //'pendingRealization','realization','pendingDelivery','delivery','delivered'
  private orders: Array<Orders.Order> = []
  //   {
  //     number: "Commande1",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 0,
  //     price: 20.0,
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
  //     price: 20.0,
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
  //     number: "Commande3",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 20.0,
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
  //     number: "Commande4",
  //     clientName: "Leo Didier",
  //     clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
  //     clientPhone: "0633589362",
  //     restaurantName: "MacDo",
  //     restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
  //     deliveryManName: "Romain Kauf",
  //     deliveryManId: 1,
  //     price: 20.0,
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
  //   }
  // ];

  private apiGetRoute: string = "api/orders"

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
  }

  get totalPrice() {
    let total: number = 0;
    this.orders.forEach((order: Orders.Order) =>
      total += order.price
    );
    return total;
  }

  getPendingRealizationOrders() {
    return this.orders.filter((i) => i.status === "pendingRealization");
  }

  getRealizationOrders() {
    return this.orders.filter((i) => i.status === "realization");
  }

  getPendingDeliveryOrders() {
    return this.orders.filter((i) => i.status === "pendingDelivery");
  }

  getDeliveryOrders() {
    return this.orders.filter((i) => i.status === "delivery");
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
</style>
