<template>
  <DeliveryManForm formType="register" />
</template>

<script lang="ts">
import { DeliveryMen } from "@/shims-tsx";
import { Component, Prop, Vue } from "vue-property-decorator";
import DeliveryManForm from "../components/DeliveryManForm.vue";
import axios from "axios";

@Component({
  components: {
    DeliveryManForm,
  },
})
export default class DeliveryManRegister extends Vue {
private apiRootRoute: string = "api/delivery-man/"

  mounted() {
    this.$root.$on("create-delivery-man", (deliveryMan: DeliveryMen.DeliveryMan) => this.createDeliveryMan(deliveryMan));
  }

  private createDeliveryMan(deliveryMan: DeliveryMen.DeliveryMan) {
    axios
      .post(this.apiRootRoute)
      .then((res: any) => {
        this.$router.push({name: "ClientLogin"});
      })
      .catch((error: any) => {
        //this.$router.go(0);
      })
      .finally(() => {});
  }
}
</script>
