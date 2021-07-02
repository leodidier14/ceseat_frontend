<template>
  <DeliveryManForm formType="profile" :deliveryMan="deliveryMan" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DeliveryManForm from "../components/DeliveryManForm.vue";
import axios from "axios";
import { DeliveryMen } from "@/shims-tsx";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component({
  components: {
    DeliveryManForm,
  },
})
export default class DeliveryManProfile extends Vue {
  private userModule = getModule(User, this.$store);
  private deliveryMan: DeliveryMen.DeliveryMan = {
    siret: "",
    sponsorshipLink: "",
  };
  private apiGetRoute: string =
    "http://172.16.44.43:3000/deliveryman/" + this.userModule.roleId;
  private apiDeleteRoute: string =
    "http://172.16.44.43:3000/deliveryman/" + this.userModule.roleId;
  private apiUpdateRoute: string =
    "http://172.16.44.43:3000/deliveryman/" + this.userModule.roleId;
  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log(res.data);
        //Perform Success Action
        this.deliveryMan = res.data;
      })
      .catch((error: any) => {
        console.log(error);
        // error.response.status Check status code
        //this.$router.go(0);
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
      .put(this.apiUpdateRoute, newDeliveryMan, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {})
      .catch((error: any) => {
        // error.response.status Check status code
      })
      .finally(() => {
        //Perform action in always
      });
  }

  private deleteDeliveryMan(id: number) {
    axios
      .delete(this.apiDeleteRoute, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        this.userModule.set_roleType("");
        this.userModule.set_roleId(0);
        this.$router.push({ name: "ClientProfile" });
        //Perform Success Action
      })
      .catch((error: any) => {
        // error.response.status Check status code
      })
      .finally(() => {
        //Perform action in always
      });
  }
}
</script>