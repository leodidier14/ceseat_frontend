<template>
  <DeliveryManForm formType="profile" :deliveryMan="deliveryMan"/>
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


  private deliveryMan: DeliveryMen.DeliveryMan = {
    siret: "",
    sponsorshipLink: "",
  };
  private apiGetRoute: string ="http://localhost:3000/deliveryman/" + localStorage.getItem("deliverymanId");
  private apiDeleteRoute: string ="http://localhost:3000/deliveryman/" +localStorage.getItem("deliverymanId");
  private apiUpdateRoute: string ="http://localhost:3000/deliveryman/" + localStorage.getItem("deliverymanId");
  mounted() {
   axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: localStorage.getItem("token"),
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
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res: any) => {
            //Perform Success Action
          })
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
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res: any) => {
          localStorage.removeItem("deliverymanId");
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