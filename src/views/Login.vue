<template>
  <v-card class="mt-16 py-10" id="login" elevation="2" max-width="536">
    <img
      src="@/assets/logo_typo.png"
      alt="Logo Ces'Eat"
      width="205"
      height="147"
    />
    <span id="subtitle">Se connecter à Ces'Eat</span>

    <v-form id="login-form" class="mx-16 my-5" ref="loginForm" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required>
      </v-text-field>

      <v-text-field
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required]"
        :type="showPassword ? 'text' : 'password'"
        name="passwordInput"
        label="Mot de passe"
        class="input-group--focused"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <div id="form-buttons">
        <v-btn class="form-button" color="#CA6B3E" style="color: white" @click="submit">
          Se connecter
        </v-btn>
        <v-btn class="form-button" color="#CA6B3E" outlined @click="signup"
          >Nouveau sur Ces'Eat ? S'inscrire ici
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
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
#logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#subtitle {
  margin-top: 1em;
}
#form-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-button {
    margin-top: 1em;
    width: 30em;
}
</style>