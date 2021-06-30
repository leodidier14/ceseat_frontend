<template>
  <v-card
    class="dev-profile-card mx-auto"
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
    <h3 class="text-center">Mon profil - Développeur</h3>
    <v-form
      class="mx-auto"
      ref="devProfileForm"
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
              v-model="devProfile.email"
              :rules="emailRules"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Mot de passe"
              v-model="devProfile.password"
              :rules="passwordRules"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Confirmez votre mot de passe"
              v-model="devProfile.confirmedPassword"
              :rules="confirmedPasswordRules"
              :append-icon="showConfirmedPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirmedPassword ? 'text' : 'password'"
              @click:append="showConfirmedPassword = !showConfirmedPassword"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Nom de l'entreprise"
              v-model="devProfile.companyName"
              :rules="[rules.required]"
              required
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
export default class DeveloperProfile extends Vue {
  private valid: boolean = true;

  private devProfile = {
    id: 1,
    email: "",
    password: "",
    confirmedPassword: "",
    companyName: "",
  };

  private userModule = getModule(User, this.$store);
  /* input rules,style and selectItem */
  private showPassword: boolean = false;
  private showConfirmedPassword: boolean = false;
  private email: string = "";
  private strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  private passwordRules = [
    /*(password: string) => !!password || "Le mot de passe est obligatoire.",
    (password: string) =>
      this.strongRegex.test(password) ||
      "Le mot de passe doit contenir au moins 8 caractères (dont : 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiffre) .",*/
  ];

  private confirmedPasswordRules = [
    /*(confirmedPassword: string) =>
      !!confirmedPassword || "Confirmation de mot de passe obligatoire.",
    (confirmedPassword: string) =>
      this.devProfile.password == confirmedPassword ||
      "Les mots de passes doivent être identiques",*/
  ];

  private emailRules = [
    (mail: string) => !!mail || "L'adresse mail est obligatoire.",
    (mail: string) =>
      /.+@.+\..+/.test(mail) || "L'adresse mail doit être valide.",
  ];
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private apiDeleteRoute: string =
    "http://localhost:3000/dev/" + this.userModule.devId;
  private apiSubmitRoute: string =
    "http://localhost:3000/dev/" + this.userModule.devId;
  private apiGetRoute: string =
    "http://localhost:3000/dev/" + this.userModule.devId;

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
          this.userModule.set_token("").then((token: string) => {
            localStorage.clear();

            window.location.href = "http://localhost:8080/developer-register";
          });
        })
        .catch((error: any) => {
          // error.response.status Check status code
          // this.$router.go(0);
        })
        .finally(() => {
          //Perform action in always
        });
    }
  }

  public submitForm(): void {
    if (
      (
        this.$refs.devProfileForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      axios
        .put(this.apiSubmitRoute, this.devProfile, {
          headers: {
            Authorization: this.userModule.token,
          },
        })
        .then((res: any) => {
          //Perform Success Action
          //this.$router.go(0);
        })
        .catch((error: any) => {
          // error.response.status Check status code
          // this.$router.go(0);
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
        //Perform Success Action
        this.devProfile = res.data;
      })
      .catch((error: any) => {
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