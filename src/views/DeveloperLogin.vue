<template>
  <v-card
    class="login-card mx-auto pt-16"
    width="40%"
    height="100%"
    elevation="10"
  >
    <v-img
      class="mx-auto"
      src="@/assets/logo_typo.png"
      alt="Logo Ces'Eat"
      contain
      width="150"
    ></v-img>
    <h3 class="text-center mt-5">Se connecter à Ces'Eat - Développeur</h3>

    <v-form
      class="login-form mx-auto my-5"
      ref="loginForm"
      v-model="valid"
      lazy-validation
    >
      <v-alert
        class="textfield mx-auto"
        :value="errorPopup"
        dense
        outlined
        type="error"
      >
        Erreur à la connexion du compte
      </v-alert>
      <v-text-field
        class="textfield mx-auto"
        v-model="login.email"
        :rules="emailRules"
        label="E-mail"
        color="#CA6B3E"
        required
      >
      </v-text-field>

      <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="showPassword ? 'text' : 'password'"
        v-model="login.password"
        name="passwordInput"
        label="Mot de passe"
        color="#CA6B3E"
        class="input-group--focused textfield mx-auto"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <div class="form-buttons">
        <v-btn
          class="form-button mt-5"
          color="#CA6B3E"
          style="color: white"
          @click="submitForm"
          :disabled="!valid"
        >
          Se connecter
        </v-btn>
        <v-btn
          class="form-button mt-5"
          color="#CA6B3E"
          outlined
          href="/developer-register"
        >
          <span class="new-on-ceseat-message">Nouveau sur Ces'Eat ?&nbsp;</span>
          S'inscrire ici
        </v-btn>
        <v-btn
          class="form-button mt-5"
          color="#CA6B3E"
          outlined
          href="/client-login"
        >
          Client ?
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
export default class DeveloperLogin extends Vue {
  private valid: boolean = true;
  private userModule = getModule(User, this.$store);
  private errorPopup: boolean = false;

  private login = {
    email: "",
    password: "",
  };

  /* input rules,style  */
  private showPassword: boolean = false;
  private email: string = "";
  private emailRules = [
    (mail: string) => !!mail || "L'adresse mail est obligatoire",
    (mail: string) =>
      /.+@.+\..+/.test(mail) || "L'adresse mail doit être valide",
  ];
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private apiSubmitRoute: string = "http://172.16.44.43:3000/dev-login";

  //api call to post data
  public submitForm(): void {
    if (
      (this.$refs.loginForm as Vue & { validate: () => boolean }).validate()
    ) {
      axios
        .post(this.apiSubmitRoute, this.login)
        .then((res: any) => {
          this.userModule.set_token("Bearer " + res.data.token);
          this.userModule.set_devId(res.data.id);
          //Perform Success Action
          this.$router.push({ name: "DeveloperComponents" });
        })
        .catch((error: any) => {
          // error.response.status Check status code
          // this.$router.go(0);
          this.errorPopup = true;
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }
}
</script>

<style scoped>
h3 {
  font-weight: normal;
}

.textfield {
  width: 50%;
}

.form-button {
  width: 50%;
}

.form-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1580px) {
  .new-on-ceseat-message {
    display: none;
  }
}

@media screen and (max-width: 1400px) {
  .textfield {
    width: 70%;
  }
  .form-button {
    width: 70%;
  }
}

@media screen and (max-width: 768px) {
  .login-card {
    width: 90% !important;
  }
  .textfield {
    width: 80%;
  }
  .form-button {
    width: 80%;
  }
  .login-card {
    padding-top: 40px !important;
  }
}
</style>