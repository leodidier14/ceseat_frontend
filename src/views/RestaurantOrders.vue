<template>
  <v-card
    class="restaurant-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5">Commandes</h3>
    <v-container class="restaurant-orders-container">
      <v-row class="restaurant-orders-row pt-5">
        <v-col cols="12" class="pb-5">
          <v-card
            class="mx-auto"
            elevation="10"
            width="100%"
            height="100%"
            color="#FFF5F0"
          >
            <h4 class="text-center py-2">Nouvelles commandes</h4>
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
            color="#FFF5F0"
          >
            <h4 class="text-center mt-2 py-2">En attentes</h4>
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
            color="#FFF5F0"
          >
            <h4 class="text-center mt-2 py-2">En cours</h4>
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
            color="#FFF5F0"
          >
            <h4 class="text-center mt-2 py-2">Prêtes</h4>
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
import RestaurantOrderCard from "@/components/RestaurantOrderCard.vue";
import { Orders } from "@/shims-tsx";

@Component({
  components: {
    RestaurantOrderCard,
  },
})
export default class RestaurantsOrders extends Vue {
  private orders: Array<Orders.RestaurantOrder> = [
    {
      number: "Commande1",
      clientName: "Léo DIDIER",
      deliveryManName: "Romain Kauf",
      price: "10.00",
      comment: "Ajoutez des cornichons",
      status: "pendingValidation",
      date: "14h45 26/06/21",
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
      price: "10.00",
      comment: "Ajoutez des cornichons",
      status: "pendingRealization",
      date: "14h45 26/06/21",
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
      price: "10.00",
      comment: "Ajoutez des cornichons",
      status: "realization",
      date: "14h45 26/06/21",
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
      number: "Commande4",
      clientName: "Léo DIDIER",
      deliveryManName: "Romain Kauf",
      price: "10.00",
      comment: "Ajoutez des cornichons",
      status: "pendingDelivery",
      date: "14h45 26/06/21",
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
      number: "Commande5",
      clientName: "Léo DIDIER",
      deliveryManName: "Romain Kauf",
      price: "10.00",
      comment: "Ajoutez des cornichons",
      status: "delivery",
      date: "14h45 26/06/21",
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
