<template>
  <DeliveryManForm formType="profile" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DeliveryManForm from "../components/DeliveryManForm.vue";
import axios from "axios";
import { DeliveryMen } from "@/shims-tsx";

@Component({
  components: {
    DeliveryManForm,
  },
})
export default class DeliveryManProfile extends Vue {
  private apiGetRoute = "api/delivery-man/id";
  private apiRootRoute = "api/delivery-man/";

  private deliveryMan: DeliveryMen.DeliveryMan = {
    id: 0,
    siretNumber: "",
    sponsorshipLink: "",
  };

  mounted() {
    axios
      .get(this.apiGetRoute)
      .then((res: any) => {
        //Perform Success Action
        this.deliveryMan = res;
      })
      .catch((error: any) => {
        // error.response.status Check status code
        // this.$router.go(0);
      })
      .finally(() => {
        //Perform action in always
      });

    this.$root.$on(
      "update-delivery-man",
      (newDeliveryMan: DeliveryMen.DeliveryMan) =>
        this.updateDeliveryMan(newDeliveryMan)
    );

    this.$root.$on("delete-delivery-man", (id: number) =>
      this.deleteDeliveryMan(id)
    );
  }

  private updateDeliveryMan(newDeliveryMan: DeliveryMen.DeliveryMan) {
    axios
      .put(this.apiRootRoute, newDeliveryMan)
      .then((res: any) => {
        this.deliveryMan = res;
      })
      .catch((error: any) => {
        // this.$router.go(0);
      })
      .finally(() => {
        this.$router.go(0);
      });
  }

  private deleteDeliveryMan(id: number) {
    axios
      .delete(this.apiRootRoute + id)
      .then((res: any) => {
        this.$router.push({ name: "DeliveryManRegister" });
      })
      .catch((error: any) => {
        // this.$router.go(0);
      })
      .finally(() => {});
  }
}
</script>