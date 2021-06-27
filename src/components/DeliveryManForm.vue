<template>
  <v-card
    class="develiryman-card mx-auto"
    elevation="10"
    width="40%"
    height="100%"
  >
    <v-img
      class="logo mx-auto"
      src="@/assets/logo_typo.png"
      alt="Logo Ces'Eat"
      contain
      width="150"
    ></v-img>
    <h3 v-if="formType === 'register'" class="text-center">
      Créer un compte livreur
    </h3>
    <h3 v-else class="text-center">Mon profil livreur</h3>
    <v-form
      class="mx-auto"
      ref="deliverymanForm"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Numéro de siret"
              v-model="deliveryMan.siretNumber"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              disabled
              label="Lien de parrainage"
              v-model="deliveryMan.sponsorshipLink"
              v-if="formType == 'profile'"
            />
          </v-col>
        </v-row>
      </v-container>
      <div class="form-buttons mx-auto">
        <v-btn
          class="form-button mt-2"
          color="#CA6B3E"
          style="color: white"
          @click="submitForm"
          :disabled="!valid"
        >
          <span v-if="formType == 'register'">Devenir livreur</span>
          <span v-else>Sauvegarder</span>
        </v-btn>
        <v-btn
          class="form-button mt-2"
          color="white"
          style="color: #ca6b3e"
          @click="deleteDeliveryMan"
          v-if="formType == 'profile'"
        >
          Supprimer
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { DeliveryMen } from "@/shims-tsx";

@Component
export default class DeliveryManForm extends Vue {
  @Prop({ required: true })
  private formType!: string;

  private valid: boolean = true;

  private deliveryMan: DeliveryMen.DeliveryMan = {
    id: 0,
    siretNumber: "",
    sponsorshipLink: "https://vuetifyjs.com/en/api/v-text-field/#props",
  };

  /* input rules,style and selectItem */
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  //api call to post data
  public submitForm(): void {
    if (
      (
        this.$refs.deliverymanForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      if (this.formType == "register") {
        this.$root.$emit("create-delivery-man", this.deliveryMan);
      } else {
        this.$root.$emit("update-delivery-man", this.deliveryMan);
      }
    }
  }

  public deleteDeliveryMan(): void {
    if (
      confirm(
        "Etes-vous sûr de vouloir supprimer votre status de livreur de manière définitive ?"
      )
    ) {
      this.$root.$emit("delete-delivery-man", this.deliveryMan.siretNumber);
    }
  }
}
</script>
<style scoped>
.logo {
  padding-top: 50px;
}
h3 {
  font-weight: normal;
}
.input-field {
  width: 80%;
}
.form-button {
  width: 30%;
}
.form-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

@media screen and (max-width: 960px) {
  .develiryman-card {
    width: 80% !important;
  }
  .textfield {
    width: 80%;
  }
  .form-button {
    width: 80%;
  }
}
</style>