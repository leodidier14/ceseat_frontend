<template>
  <v-card
    class="client-profile-card mx-auto"
    elevation="10"
    width="80%"
    height="100%"
  >
    <v-img
      class="logo mx-auto"
      src="@/assets/logo_typo.png"
      alt="Logo Ces'Eat"
      contain
      width="150"
    ></v-img>
    <h3 class="text-center">Mon profil</h3>
    <v-form
      class="mx-auto"
      ref="clientProfileForm"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="E-mail"
              v-model="clientProfile.email"
              :rules="emailRules"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Nouveau mot de passe"
              v-model="clientProfile.password"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Confirmez votre nouveau mot de passe"
              v-model="clientProfile.confirmedPassword"
              :rules="confirmedPasswordRules"
              :append-icon="showConfirmedPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmedPassword ? 'text' : 'password'"
              @click:append="showConfirmedPassword = !showConfirmedPassword"
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Téléphone"
              v-model="clientProfile.phoneNumber"
              :rules="phoneNumberRules"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Nom"
              v-model="clientProfile.lastName"
              :rules="[rules.required]"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Prénom"
              v-model="clientProfile.firstName"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Adresse"
              v-model="clientProfile.address"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Ville"
              v-model="clientProfile.city"
              required
            />
            <div class="double-input mx-auto">
              <v-text-field
                class="half-input-field"
                color="#CA6B3E"
                label="Code postal"
                v-model="clientProfile.zipCode"
                :rules="zipCodeRules"
                required
              />
              <div class="half-input-field"></div>

              <v-select
                class="half-input-field"
                color="#CA6B3E"
                label="Pays"
                v-model="clientProfile.country"
                :items="countries"
                required
              />
            </div>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              readonly="true"
              label="Lien de parrainage"
              v-model="clientProfile.sponsorshipLink"
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
          Sauvegarder
        </v-btn>
        <v-btn
          class="form-button mt-2"
          color="white"
          style="color: #ca6b3e"
          @click="deleteAccount"
        >
          Supprimer
        </v-btn>
        <v-btn
          class="form-button mt-7"
          color="white"
          style="color: #ca6b3e"
          href="/restaurant-register"
        >
          Devenir restaurateur
        </v-btn>
        <v-btn
          class="form-button mt-2"
          color="white"
          style="color: #ca6b3e"
          href="/deliveryman-register"
        >
          Devenir livreur
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ClientProfile extends Vue {
  private valid: boolean = true;

  private clientProfile = {
    email: "",
    password: "",
    confirmedPassword: "",
    phoneNumber: "",
    lastName: "",
    firstName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "France",
    sponsorshipLink: "https://vuetifyjs.com/en/api/v-text-field/#props",
  };

  /* input rules,style and selectItem */
  private showPassword: boolean = false;
  private showConfirmedPassword: boolean = false;
  private email: string = "";
  private strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  private passwordRules = [
    (password: string) => !!password || "Le mot de passe est obligatoire.",
    (password: string) =>
      this.strongRegex.test(password) ||
      "Le mot de passe doit contenir au moins 8 caractères (dont : 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiffre) .",
  ];

  private confirmedPasswordRules = [
    (confirmedPassword: string) =>
      !!confirmedPassword || "Confirmation de mot de passe obligatoire.",
    (confirmedPassword: string) =>
      this.clientProfile.password == confirmedPassword ||
      "Les mots de passes doivent être identiques",
  ];

  private phoneNumberRules = [
    (phoneNumber: string) => !!phoneNumber || "Le numéro est obligatoire.",
    (phoneNumber: string) =>
      /^((\+)33|0|0033)[1-9](\d{2}){4}$/g.test(phoneNumber) ||
      "Le numéro doit être valide.",
  ];

  private emailRules = [
    (mail: string) => !!mail || "L'adresse mail est obligatoire.",
    (mail: string) =>
      /.+@.+\..+/.test(mail) || "L'adresse mail doit être valide.",
  ];

  private zipCodeRules = [
    (zipCode: string) =>
      /[0-9]{5}/g.test(zipCode) || "Le code postal doit être valide.",
  ];
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private countries = ["France"];

  //api call to post data
  public submitForm(): void {
    if (
      (
        this.$refs.clientProfileForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      axios
        .post("/client/id", this.clientProfile)
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
  }

  public deleteAccount(): void {
    axios
      .delete("/client/id")
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

.double-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
}

.half-input-field {
  width: 20px;
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
  .textfield {
    width: 80%;
  }
  .form-button {
    width: 80%;
  }
}
</style>