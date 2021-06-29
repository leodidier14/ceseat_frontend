<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="restaurant-order-card mr-5 my-auto"
          elevation="10"
          width="300px"
          height="80%"
        >
          <v-container>
            <v-row class="order-card-row pt-7 text-center" no-gutters>
              <v-col cols="6" class="restaurant-order-col">
                <span style="font-weight: bold" v-bind="attrs" v-on="on"
                  ><v-icon>mdi-information</v-icon> {{ order.number }}</span
                >
                <v-btn
                  class="ml-2 mt-5"
                  color="white"
                  rounded
                  small
                  style="color: #ca6b3e"
                  v-if="
                    order.status == 'pendingValidation' &&
                    cardType == 'restaurant'
                  "
                  @click="declineOrder()"
                >
                  Refuser
                </v-btn>
              </v-col>
              <v-col cols="6">
                <span>{{ order.clientName }}</span>
                <v-btn
                  class="ml-2 mt-5"
                  color="#CA6B3E"
                  rounded
                  small
                  style="color: white"
                  v-if="
                    order.status == 'pendingValidation' &&
                    cardType == 'restaurant'
                  "
                  @click="acceptOrder()"
                >
                  Accepter
                </v-btn>
                <v-btn
                  class="ml-2 mt-5"
                  color="#CA6B3E"
                  rounded
                  small
                  style="color: white"
                  v-else-if="
                    order.status == 'pendingRealization' &&
                    cardType == 'restaurant'
                  "
                  @click="prepareOrder()"
                >
                  Préparer
                </v-btn>
                <v-btn
                  class="ml-2 mt-5"
                  color="#CA6B3E"
                  rounded
                  small
                  style="color: white"
                  v-else-if="
                    order.status == 'realization' && cardType == 'restaurant'
                  "
                  @click="ready()"
                >
                  Prête
                </v-btn>
                <v-btn
                  class="ml-2 mt-5"
                  color="#CA6B3E"
                  rounded
                  small
                  style="color: white"
                  v-else-if="
                    order.status == 'pendingDelivery' &&
                    cardType == 'restaurant'
                  "
                  @click="deliver()"
                >
                  Restituée
                </v-btn>
                <v-btn
                  class="ml-2 mt-5"
                  color="#CA6B3E"
                  rounded
                  small
                  style="color: white"
                  v-else-if="
                    order.status == 'delivery' && cardType == 'restaurant'
                  "
                >
                  Livraison...
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </template>
      <v-card>
        <v-card-title class="text-h5" style="color: #ca6b3e">
          Numéro : {{ order.number }}
        </v-card-title>

        <v-card-text>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Client</v-list-item-title>
              <v-list-item-subtitle>
                {{ order.clientName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Livreur</v-list-item-title>
              <v-list-item-subtitle>
                {{ order.deliveryManName }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Liste d'articles : </v-list-item-title>
              <div v-for="article in order.articles" :key="article.name">
                <v-list-item-subtitle>
                  {{ article.name }} x {{ article.quantity }}:
                  {{ article.price }}€</v-list-item-subtitle
                >
              </div>
              <div v-for="menu in order.menus" :key="menu.name">
                <v-list-item-subtitle>
                  {{ menu.name }} x {{ menu.quantity }}:
                  {{ menu.price }}€</v-list-item-subtitle
                >
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Commentaire : </v-list-item-title>
              <v-list-item-subtitle>
                {{ order.comment }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total</v-list-item-title>
              <v-list-item-subtitle> {{ order.price }}€ </v-list-item-subtitle>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Orders } from "@/shims-tsx";

@Component
export default class RestaurantOrderCard extends Vue {
  @Prop({ required: true })
  private order!: Orders.Order;

  @Prop({
    default: "restaurant",
    validator: (value: string) => ["restaurant", "business"].includes(value),
  })
  private cardType!: string;

  private dialog: boolean = false;

  private declineOrder() {
    this.$root.$emit("update-order-status", {
      status: "denied",
      id: this.order.number,
    });
  }

  private acceptOrder() {
    console.log({
      status: "pendingRealization",
      id: this.order.number,
    });
    this.$root.$emit("update-order-status", {
      status: "pendingRealization",
      id: this.order.number,
    });
  }

  private prepareOrder() {
    this.$root.$emit("update-order-status", {
      status: "realization",
      id: this.order.number,
    });
  }

  private ready() {
    this.$root.$emit("update-order-status", {
      status: "pendingDelivery",
      id: this.order.number,
    });
  }

  private deliver() {
    this.$root.$emit("update-order-status", {
      status: "delivery",
      id: this.order.number,
    });
  }
}
</script>

<style scoped>
.restaurant-order-card {
  flex: 0 0 auto;
  margin-left: 10px;
  overflow-y: hidden;
}

.restaurant-order-col {
  display: flex;
  flex-direction: column;
}

.order-card-row {
  height: 100%;
}

@media screen and (max-width: 965px) {
  .restaurant-order-card {
    margin-left: 0;
  }
  .order-card-row {
    padding-top: 0 !important;
    padding-bottom: 30px;
  }
}
</style>