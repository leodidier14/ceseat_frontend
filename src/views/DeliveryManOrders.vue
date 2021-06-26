<template>
  <v-card
    class="deliveryman-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5">Mes commandes</h3>
    <v-container class="deliveryman-orders-container">
      <v-row class="deliveryman-orders-row pt-5">
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

@Component({
  components: {
    DeliveryManOrderCard,
  },
})
export default class RestaurantsOrders extends Vue {
  private orders: Array<Orders.Order> = [
    {
      number: "Commande1",
      clientName: "Leo Didier",
      clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
      clientPhone: "0633589362",
      restaurantName: "MacDo",
      restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
      deliveryManName: "Romain Kauf",
      deliveryManId: 0,
      price: 10.0,
      comment: "Ajoutez des cornichons",
      status: "pendingRealization",
      date: "04/03/2021 18h30",
      articles: [
        {
          name: "menu",
          description: "",
          image: "",
          type: "Menu",
          restaurant: "",
          price: 10,
          quantity: 1,
        },
        {
          name: "menu",
          description: "",
          image: "",
          type: "Menu",
          restaurant: "",
          price: 10,
          quantity: 1,
        },
      ],
    },
    {
      number: "Commande2",
      clientName: "Leo Didier",
      clientAddress: "9, Rue de la Croix, 68520, Burnhaupt-le-Bas",
      clientPhone: "0633589362",
      restaurantName: "MacDo",
      restaurantAddress: "15, Avenue de l'Europe, 68520, Burnhaupt-le-Bas",
      deliveryManName: "Romain Kauf",
      deliveryManId: 1,
      price: 10.0,
      comment: "Ajoutez des cornichons",
      status: "pendingDelivery",
      date: "04/03/2021 18h30",
      articles: [
        {
          name: "menu",
          description: "",
          image: "",
          type: "Menu",
          restaurant: "",
          price: 10,
          quantity: 1,
        },
        {
          name: "menu",
          description: "",
          image: "",
          type: "Menu",
          restaurant: "",
          price: 10,
          quantity: 1,
        },
      ],
    }
  ];

  getPendingOrders() {
    return this.orders.filter(
      (i) =>
        (i.status === "pendingRealization" || i.status === "realization") &&
        i.deliveryManId === 0
    );
  }

  getTakingOrders() {
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
