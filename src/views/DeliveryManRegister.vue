<template>
  <DeliveryManForm formType="register" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DeliveryManForm from "../components/DeliveryManForm.vue";

@Component({
  components: {
    DeliveryManForm,
  },
})
export default class DeliveryManRegister extends Vue {}
</script>
