<template>
  <DeliveryManForm formType="profile" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import DeliveryManForm from "../components/DeliveryManForm.vue";

@Component({
  components: {
    DeliveryManForm,
  },
})
export default class DeliveryManProfile extends Vue {}
</script>