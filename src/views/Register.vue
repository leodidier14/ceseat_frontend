<template>
  <v-card
    class="register-card mx-auto"
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
    <h3 class="text-center">S'inscrire à Ces'Eat</h3>
    <v-form class="mx-auto" ref="registerForm" lazy-validation>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-select
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Type de compte"
              v-model="register.accountType"
              :items="accountTypes"
              :rules="[rules.required]"
              required
            ></v-select>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="E-mail"
              v-model="register.email"
              :rules="emailRules"
              required
            >
            </v-text-field>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Mot de passe"
              v-model="register.password"
              :rules="[rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Confirmez votre mot de passe"
              v-model="register.confirmedPassword"
              :rules="[rules.required]"
              :append-icon="showConfirmedPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmedPassword ? 'text' : 'password'"
              @click:append="showConfirmedPassword = !showConfirmedPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Nom"
              v-model="register.lastName"
              :rules="[rules.required]"
              required
            >
            </v-text-field>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Prénom"
              v-model="register.firstName"
              :rules="[rules.required]"
              required
            >
            </v-text-field>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Téléphone"
              v-model="register.phoneNumber"
              :rules="[rules.required]"
              required
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <div id="form-buttons">
        <v-btn
          class="form-button mt-5"
          color="#CA6B3E"
          style="color: white"
          @click="submitForm"
        >
          S'inscrire
        </v-btn>
        <v-btn class="form-button mt-5" color="#CA6B3E" outlined>
          <span class="old-on-ceseat-message">Déjà un compte ?</span>
          Se connecter ici
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { required, minLength, between } from "vuelidate/lib/validators";

@Component
export default class Register extends Vue {
  /* post data */
  private register: object = {
    accountType: "Client",
    email: "",
    password: "",
    confirmedPassword: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
  };

  // private phoneNumber: string = "";

  // private test: string = "";

  // private validation: any = {
  //   phoneNumber: {
  //     required,
  //     minLength: minLength(4),
  //   },
  // };

  // get nameErrors() {
  //   const errors: string[] = [];
  //   if (!this.$v.phoneNumber.$dirty) return errors;
  //   // !this.$v.name.decimal && errors.push('Name must be a number')
  //   !this.$v.phoneNumber.maxLength &&
  //     errors.push("Name must be at most 10 characters long");
  //   !this.$v.phoneNumber.required && errors.push("Name is required.");
  //   return errors;
  // }

  /* input rules,style and selectItem */
  private showPassword: boolean = false;
  private showConfirmedPassword: boolean = false;
  private email: string = "";
  private emailRules = [
    (mail: string) => !!mail || "L'adresse mail est obligatoire",
    (mail: string) =>
      /.+@.+\..+/.test(mail) || "L'adresse mail doit être valide",
  ];
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private accountTypes = [
    "Client",
    "Livreur",
    "Restaurateur",
    "Développeur",
    "Commercial",
    "Technicien",
  ];

  public submitForm(): void {
    axios
      .post("/register", this.register)
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
.form-button {
  width: 30%;
}
#form-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}
@media screen and (max-width: 1280px) {
  .old-on-ceseat-message {
    display: none;
  }
}
@media screen and (max-width: 960px) {
  #login-card {
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