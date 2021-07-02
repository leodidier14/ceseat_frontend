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
            <v-alert
              class="input-field mx-auto"
              :value="errorPopup"
              dense
              outlined
              type="error"
            >
              Erreur à la sauvegarde du compte
            </v-alert>
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
              v-model="clientProfile.newPassword"
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
              disabled
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
          :disabled="
            userModule.roleType == 'restaurant' ||
            userModule.roleType == 'deliveryman'
          "
        >
          Supprimer
        </v-btn>

        <v-btn
          class="form-button mt-7"
          color="white"
          style="color: #ca6b3e"
          v-if="userModule.roleType == null || userModule.roleType == ''"
        >
          <router-link to="/restaurant-register" class="link">
            Devenir restaurateur
          </router-link>
        </v-btn>
        <v-btn
          v-if="userModule.roleType == null || userModule.roleType == ''"
          class="form-button mt-2"
          color="white"
          style="color: #ca6b3e"
          href="/deliveryman-register"
        >
          <router-link to="/deliveryman-register" class="link">
            Devenir livreur
          </router-link>
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { getModule } from "vuex-module-decorators";
import User from "@/store/user";

@Component
export default class ClientProfile extends Vue {
  private userModule = getModule(User, this.$store);
  private valid: boolean = true;

  private errorPopup: boolean = false;

  private clientProfile = {
    email: "",
    newPassword: "",
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
    // (password: string) =>
    //   this.strongRegex.test(password) ||
    //   "Le mot de passe doit contenir au moins 8 caractères (dont : 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiffre) .",
  ];

  private confirmedPasswordRules = [
    // (confirmedPassword: string) =>
    //   this.clientProfile.newPassword == confirmedPassword ||
    //   "Les mots de passes doivent être identiques",
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
    // (zipCode: string) =>
    //   /[0-9]{5}/g.test(zipCode) || "Le code postal doit être valide.",
  ];
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private countries = ["France"];

  private apiDeleteRoute: string =
    "http://localhost:3000/user/" + this.userModule.userId;
  private apiSubmitRoute: string =
    "http://localhost:3000/user/" + this.userModule.userId;
  private apiGetRoute: string =
    "http://localhost:3000/user/" + this.userModule.userId;

  //api call to post data

  public deleteAccount(): void {
    if (
      confirm(
        "Etes-vous sûr de vouloir supprimer votre compte de manière définitive ?"
      )
    ) {
      axios
        .delete(this.apiDeleteRoute, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          //Perform Success Action
          console.log(res);

          this.userModule.set_token("").then((token: string) => {
            localStorage.clear();
            window.location.href = "http://localhost:8080/client-register";
          });
        })
        .catch((error: any) => {
          // error.response.status Check status code
          this.userModule.set_token("").then((token: string) => {
            localStorage.clear();
            window.location.href = "http://localhost:8080/client-register";
          });
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }

  public submitForm(): void {
    if (
      (
        this.$refs.clientProfileForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      axios
        .put(this.apiSubmitRoute, this.clientProfile, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          console.log(res);
          this.errorPopup = false;
          //Perform Success Action
        })
        .catch((error: any) => {
          console.log(error);
          this.errorPopup = true;
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }

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
        this.clientProfile = res.data;
      })
      .catch((error: any) => {
        console.log(error);
        // error.response.status Check status code
        //this.$router.go(0);
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
.link {
  text-decoration: none;
  color: #ca6b3e;
}
</style>