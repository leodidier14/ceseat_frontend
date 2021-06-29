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
  private apiSubmitRoute: string = "http://localhost:3000/deliveryman";
  private createDeliveryMan(deliveryMan: DeliveryMen.DeliveryMan) {
    axios
          .post(this.apiSubmitRoute, deliveryMan, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res: any) => {
            console.log(res);
            localStorage.setItem("deliverymanId", res.data.id);
            //Perform Success Action
          })
          .catch((error: any) => {
            console.log(error)
            // error.response.status Check status code
          })
          .finally(() => {
            //Perform action in always
          });
  }
}
</script>
