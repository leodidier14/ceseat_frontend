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
              v-model="restaurant.siret"
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
              label="Lien image"
              v-model="restaurant.pictureLink"
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
                v-model="restaurant.type"
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
                  :return-value.sync="restaurant.openingTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="restaurant.openingTime"
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
                    v-model="restaurant.openingTime"
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
                      @click="$refs.dialogOpen.save(restaurant.openingTime)"
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
                  :return-value.sync="restaurant.closingTime"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="restaurant.closingTime"
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
                    v-model="restaurant.closingTime"
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
                      @click="$refs.dialogClose.save(restaurant.closingTime)"
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
              disabled
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
import { Restaurants } from "@/shims-tsx";

@Component
export default class RestaurantForm extends Vue {
  @Prop({ required: true })
  private formType!: string;

  @Prop({
    default: () => {
      return {
        id: 0,
        name: "",
        email: "",
        siret: "",
        phoneNumber: "",
        website: "",
        description: "",
        type: "",
        openingTime: "",
        closingTime: "",
        pictureLink: "",
        address: "",
        city: "",
        zipCode: "",
        country: "",
        sponsorshipLink: "",
      };
    },
  })
  private restaurant!: Restaurants.Restaurant;

  private valid: boolean = true;

  private dialogDescription: boolean = false;
  private dialogSchedule: boolean = false;
  private dialogOpenTime: boolean = false;
  private dialogCloseTime: boolean = false;

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

  private types = [
    "Fast food",
    "Japonais",
    "Chinois",
    "Pizza",
    "Burger",
    "Tacos",
    "Kebab",
    "Autre",
  ];

  private apiSubmitRoute: string = "http://172.16.44.43:3000/restaurant";
  private apiGetRoute: string =
    "http://172.16.44.43:3000/restaurant/" + localStorage.getItem("restaurantId");
  private apiDeleteRoute: string =
    "http://172.16.44.43:3000/restaurant/" + localStorage.getItem("restaurantId");
  private apiUpdateRoute: string =
    "http://172.16.44.43:3000/restaurant/" + localStorage.getItem("restaurantId");

  //api call to post data
  public submitForm(): void {
    if (
      (
        this.$refs.restaurantForm as Vue & { validate: () => boolean }
      ).validate()
    ) {
      if (this.formType == "register") {
        this.$root.$emit("create-restaurant", this.restaurant);
      } else {
        this.$root.$emit("update-restaurant", this.restaurant);
      }
    }
  }

  public deleteRestaurant(): void {
    if (
      confirm(
        "Etes-vous sûr de vouloir supprimer votre restaurant de manière définitive ?"
      )
    ) {
      this.$root.$emit("delete-restaurant", this.restaurant.id);
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