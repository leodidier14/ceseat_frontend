<template>
  <v-card
    class="deliveryman-orders-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <h3 class="text-center pt-5">Commandes</h3>
    <v-container class="deliveryman-orders-container">
      <v-row class="deliveryman-orders-row pt-5">
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
            color="#FFF5F0"
          >
            <h4 class="text-center py-2">Commande à livrer</h4>
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
  private orders: Array<Orders.DeliveryManOrder> = [
    {
      deliveryManId: 2,
      number: "Commande2",
      clientName: "Léo DIDIER",
      clientPhone: "056896562",
      clientAddress: {
        address: "5 avenue de l'Europe",
        city: "Brumath",
        zipCode: "67170",
        country: "France",
      },
      restaurantName: "MacDo",
      restaurantAddress: {
        address: "28 rue de l'anguille",
        city: "Strasbourg",
        zipCode: "67000",
        country: "France",
      },
      comment: "Porte 9",
      status: "realization",
      date: "14h45 26/06/21",
    },
    {
      deliveryManId: 0,
      number: "Commande1",
      clientName: "Léo DIDIER",
      clientPhone: "056896562",
      clientAddress: {
        address: "5 avenue de l'Europe",
        city: "Brumath",
        zipCode: "67170",
        country: "France",
      },
      restaurantName: "MacDo",
      restaurantAddress: {
        address: "28 rue de l'anguille",
        city: "Strasbourg",
        zipCode: "67000",
        country: "France",
      },
      comment: "Deuxième étage",
      status: "realization",
      date: "14h45 26/06/21",
    },
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
