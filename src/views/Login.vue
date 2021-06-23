<template>
  <v-card class="mt-16 py-10 mx-auto" width="50%" id="login-card" elevation="2">
    <v-img
      class="mx-auto"
      src="@/assets/logo_typo.png"
      alt="Logo Ces'Eat"
      contain
      width="200"
    ></v-img>
    <h3 class="text-center mt-5" id="subtitle">Se connecter à Ces'Eat</h3>

    <v-form
      id="login-form"
      class="mx-auto my-5"
      ref="loginForm"
      lazy-validation
    >
      <v-text-field
        class="textfield mx-auto"
        v-model="email"
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
        name="passwordInput"
        label="Mot de passe"
        color="#CA6B3E"
        class="input-group--focused textfield mx-auto"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <div id="form-buttons">
        <v-btn
          class="form-button mt-5"
          color="#CA6B3E"
          style="color: white"
          @click="submit"
        >
          Se connecter
        </v-btn>
        <v-btn
          class="form-button mt-5"
          color="#CA6B3E"
          outlined
          @click="signup"
          href="/register"
        >
          <span class="new-on-ceseat-message">Nouveau sur Ces'Eat ?</span>
          S'inscrire ici
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  private showPassword: boolean = false;
  private email: string = "";
  private emailRules = [
    (mail: string) => !!mail || "L'adresse mail est obligatoire",
    (mail: string) =>
      /.+@.+\..+/.test(mail) || "L'adresse mail doit être valide",
  ];
  private rules = {
    required: (value: string) => !!value || "Obligatoire.",
  };
}
</script>

<style scoped>
#subtitle {
  font-weight: normal;
}

.textfield {
  width: 50%;
}

.form-button {
  width: 50%;
}

#form-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 1280px) {
  .new-on-ceseat-message {
    display: none;
  }
}

@media screen and (max-width: 768px) {
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