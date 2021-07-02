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
    <h3 class="text-center">Paiement</h3>
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
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Prénom"
              v-model="clientProfile.firstName"
              :rules="[rules.required]"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Adresse"
              :rules="[rules.required]"
              v-model="clientProfile.address"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Ville"
              :rules="[rules.required]"
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
                :rules="[rules.required]"
                required
              />
            </div>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Numéro de carte"
              :rules="[rules.required]"
              v-model="clientProfile.cardNumber"
              required
            />
            <div class="double-input mx-auto">
              <v-text-field
                class="half-input-field"
                color="#CA6B3E"
                label="CVV"
                :rules="[rules.required]"
                v-model="clientProfile.cvv"
                required
              />
              <div class="half-input-field"></div>
              <v-text-field
                class="half-input-field"
                color="#CA6B3E"
                label="Expiration"
                :rules="[rules.required]"
                v-model="clientProfile.expirationDate"
                required
              />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="form-buttons mx-auto">
        <v-btn
          class="form-button mt-2"
          color="#CA6B3E"
          style="color: white"
          @click="PaidCart"
          :disabled="!valid"
        >
          Payer la commande
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
import CartModule from "@/store/cart";

@Component
export default class Payment extends Vue {
  private userModule = getModule(User, this.$store);
  private cartModule = getModule(CartModule, this.$store);
  private valid: boolean = true;

  private clientProfile = {
    email: "",
    phoneNumber: "",
    lastName: "",
    firstName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
  };

  /* input rules,style and selectItem */

  private email: string = "";

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

  private apiGetRoute: string =
    "http://172.16.44.43:3000/user/" + this.userModule.userId;

  //api call to post data

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

  private apiSubmitRoute: string = "http://172.16.44.43:3000/order/";

  public PaidCart(): void {
    console.log(this.cartModule.state);
    let body = {
      Articles: this.cartModule.articles,
      Menus: this.cartModule.menus,
      price: this.cartModule.totalPrice,
      restaurantId: this.cartModule.restaurantId,
      orderDate: Date.now(),
    };
    console.log(body);
    axios
      .post(this.apiSubmitRoute, body, {
        headers: {
          Authorization: this.userModule.token,
        },
      })
      .then((res: any) => {
        console.log("payment ok");
        console.log(res);
        this.cartModule.clearCart();
        this.$router.push({ name: "ClientOrders" });
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