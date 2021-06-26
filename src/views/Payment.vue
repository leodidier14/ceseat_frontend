<template>
  <v-card
    class="register-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <button @click="submit()">Pay now!</button>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

@Component({
  components: {
    StripeCheckout,
  },
})
export default class Payment extends Vue {
  private publishableKey: string =
    "pk_test_51J6WD0AZfkXa16bfAAisyaXuRm8cKyxWjjSkfPmi6zRiUAToIn4zdCUWg0HWwZk2lbtKvQG606gRfraZDJrJMWDn00EOQ5IW8L";
  private loading: boolean = false;
  private lineItems: object = [
    {
      price: "price_1J6Ye8AZfkXa16bfJq1Ou70N", // The id of the one-time price you created in your Stripe dashboard
      quantity: 1,
    },
  ];
  private successURL: string = "http://localhost:8080/payment";
  private cancelURL: string = "http://localhost:8080/payment";

  public submit() {
    // You will be redirected to Stripe's secure checkout page
    // this.$refs.checkoutRef as Vue & { redirectToCheckout: () => boolean };
    this.$refs.checkoutRef.redirectToCheckout();
  }
}
</script>
<style scoped>
</style>