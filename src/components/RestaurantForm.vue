<template>
  <v-card
    class="restaurant-form-card mx-auto"
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
    <h3 v-if="formType === 'register'" class="text-center">
      Créer un restaurant
    </h3>
    <h3 v-else class="text-center">Mon restaurant</h3>
    <v-form
      class="mx-auto"
      ref="restaurantForm"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Nom"
              v-model="restaurant.name"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="E-mail"
              v-model="restaurant.email"
              :rules="emailRules"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Numéro de siret"
              v-model="restaurant.siretNumber"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Téléphone"
              v-model="restaurant.phoneNumber"
              :rules="phoneNumberRules"
              required
            />

            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Site Web"
              v-model="restaurant.website"
              required
            />

            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Image"
              v-model="restaurant.image"
              :rules="[rules.required]"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <div class="double-input mx-auto">
              <div class="text-center" style="width: 50%">
                <v-dialog v-model="dialogDescription" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#CA6B3E"
                      style="color: white"
                      v-bind="attrs"
                      v-on="on"
                      width="100%"
                    >
                      Description
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5">
                      Ajoutez une description
                    </v-card-title>

                    <v-card-text>
                      <v-textarea v-model="restaurant.description" color="teal">
                        <template v-slot:label>
                          <div>Description</div>
                        </template>
                      </v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="#CA6B3E"
                        text
                        @click="dialogDescription = false"
                      >
                        Ajouter
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>

              <div class="half-input-field"></div>

              <v-select
                class="half-input-field"
                color="#CA6B3E"
                label="Type"
                v-model="restaurant.country"
                :items="types"
                :rules="[rules.required]"
                required
              />
            </div>

            <div class="double-input mx-auto">
              <div class="text-center" style="width: 50%">
                <v-dialog
                  ref="dialogOpen"
                  v-model="dialogOpenTime"
                  :return-value.sync="restaurant.openTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="restaurant.openTime"
                      label="Ouverture"
                      prepend-icon="mdi-clock-time-four-outline"
                      v-bind="attrs"
                      v-on="on"
                      color="#CA6B3E"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="dialogOpenTime"
                    v-model="restaurant.openTime"
                    full-width
                    format="24hr"
                    color="#CA6B3E"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="#CA6B3E" @click="dialogOpenTime = false">
                      Annuler
                    </v-btn>
                    <v-btn
                      text
                      color="#CA6B3E"
                      @click="$refs.dialogOpen.save(restaurant.openTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </div>
              <div class="half-input-field"></div>

              <div class="text-center" style="width: 50%">
                <v-dialog
                  ref="dialogClose"
                  v-model="dialogCloseTime"
                  :return-value.sync="restaurant.closeTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="restaurant.closeTime"
                      label="Fermeture"
                      prepend-icon="mdi-clock-time-four-outline"
                      v-bind="attrs"
                      v-on="on"
                      color="#CA6B3E"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="dialogCloseTime"
                    v-model="restaurant.closeTime"
                    full-width
                    format="24hr"
                    color="#CA6B3E"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="#CA6B3E"
                      @click="dialogCloseTime = false"
                    >
                      Annuler
                    </v-btn>
                    <v-btn
                      text
                      color="#CA6B3E"
                      @click="$refs.dialogClose.save(restaurant.closeTime)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </div>
            </div>

            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Adresse"
              v-model="restaurant.address"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Ville"
              v-model="restaurant.city"
              :rules="[rules.required]"
              required
            />
            <div class="double-input mx-auto">
              <v-text-field
                class="half-input-field"
                color="#CA6B3E"
                label="Code postal"
                v-model="restaurant.zipCode"
                :rules="zipCodeRules"
                required
              />

              <div class="half-input-field"></div>

              <v-select
                class="half-input-field"
                color="#CA6B3E"
                label="Pays"
                v-model="restaurant.country"
                :items="countries"
                :rules="[rules.required]"
                required
              />
            </div>
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              readonly="true"
              label="Lien de parrainage"
              v-model="restaurant.sponsorshipLink"
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
          <span v-if="formType == 'register'">Ouvrir mon restaurant</span>
          <span v-else>Sauvegarder</span>
        </v-btn>
        <v-btn
          class="form-button mt-2"
          color="white"
          style="color: #ca6b3e"
          @click="deleteRestaurant"
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

@Component
export default class RestaurantForm extends Vue {
  @Prop({ required: true })
  private formType!: string;

  private valid: boolean = true;

  private dialogDescription: boolean = false;
  private dialogSchedule: boolean = false;
  private dialogOpenTime: boolean = false;
  private dialogCloseTime: boolean = false;

  private restaurant = {
    name: "",
    email: "",
    siretNumber: "",
    phoneNumber: "",
    website: "",
    description: "",
    type: "",
    openTime: "",
    closeTime: "",
    image: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    sponsorshipLink: "https://vuetifyjs.com/en/api/v-text-field/#props",
  };

  /* input rules,style and selectItem */

  private email: string = "";
  private strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

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
    (zipCode: string) => !!zipCode || "Le code postal est obligatoire.",
    (zipCode: string) =>
      /[0-9]{5}/g.test(zipCode) || "Le code postal doit être valide.",
  ];
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private countries = ["France"];

  private types = ["Hamburger", "Japonais", "Kebab"];

  //api call to post data
  public submitForm(): void {
    let route = "";
    if (this.formType == "register") {
      route = "/restaurant";
    } else {
      route = "/restaurant/id";
    }

    if (
      (
        this.$refs.restaurantForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      axios
        .post(route, this.restaurant)
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

  public deleteRestaurant(): void {
    axios
      .delete("/restaurant/id")
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