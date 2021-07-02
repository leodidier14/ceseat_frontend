<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-card
          class="deliveryman-order-card mr-5 my-auto"
          elevation="10"
          width="300px"
          height="80%"
        >
          <v-container>
            <v-row class="order-card-row pt-7 text-center" no-gutters>
              <v-col cols="6" class="deliveryman-order-col">
                <span style="font-weight: bold" v-bind="attrs" v-on="on"
                  ><v-icon>mdi-information</v-icon> {{ order.number }}</span
                >
                <v-btn
                  class="ml-2 mt-5"
                  color="white"
                  rounded
                  small
                  style="color: #ca6b3e"
                  v-if="order.deliveryManId == null"
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
                  v-if="order.deliveryManId == null"
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
                  v-else
                  @click="delivered()"
                >
                  Restituée
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
              <v-list-item-subtitle>
                {{ order.clientPhone }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.clientAddress.address }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.clientAddress.city }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.clientAddress.zipCode }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.clientAddress.country }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Restaurant</v-list-item-title>
              <v-list-item-subtitle>
                {{ order.restaurantName }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.restaurantPhone }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.restaurantAddress.address }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.restaurantAddress.city }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.restaurantAddress.zipCode }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ order.restaurantAddress.country }}
              </v-list-item-subtitle>
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
export default class DeliveryManOrderCard extends Vue {
  @Prop({ required: true })
  private order!: Orders.Order;

  @Prop({
    default: "pendingValidation",
    validator: (value: string) =>
      [
        "pendingValidation",
        "pendingRealization",
        "realization",
        "pendingDelivery",
      ].includes(value),
  })
  private status!: string;

  private dialog: boolean = false;

  private declineOrder() {
    this.$root.$emit("update-order-status", {
      status: "deniedDelivery",
      id: this.order.number,
    });
  }

  private acceptOrder() {
    this.$root.$emit("update-order-status", {
      status: "AcceptDelivery",
      id: this.order.number,
    });
  }

  private delivered() {
    this.$root.$emit("update-order-status", {
      status: "delivered",
      id: this.order.number,
    });
  }
}
</script>

<style lang="scss" scoped>
.deliveryman-order-card {
  flex: 0 0 auto;
  margin-left: 10px;
  overflow-y: hidden;
}

.deliveryman-order-col {
  display: flex;
  flex-direction: column;
}

.order-card-row {
  height: 100%;
}

@media screen and (max-width: 965px) {
  .deliveryman-order-card {
    margin-left: 0;
  }
  .order-card-row {
    padding-top: 0 !important;
    padding-bottom: 30px;
  }
}
</style>