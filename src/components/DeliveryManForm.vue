<template>
  <v-card
    class="develiryman-card mx-auto"
    elevation="10"
    width="40%"
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
      Créer un compte livreur
    </h3>
    <h3 v-else class="text-center">Mon profil livreur</h3>
    <v-form
      class="mx-auto"
      ref="deliverymanForm"
      v-model="valid"
      lazy-validation
    >
      <v-container>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              label="Numéro de siret"
              v-model="deliveryMan.siret"
              :rules="[rules.required]"
              required
            />
            <v-text-field
              class="input-field mx-auto"
              color="#CA6B3E"
              disabled
              label="Lien de parrainage"
              v-model="deliveryMan.sponsorshipLink"
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
          <span v-if="formType == 'register'">Devenir livreur</span>
          <span v-else>Sauvegarder</span>
        </v-btn>
        <v-btn
          class="form-button mt-2"
          color="white"
          style="color: #ca6b3e"
          @click="deleteDeliveryMan"
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
import { DeliveryMen } from "@/shims-tsx";

@Component
export default class DeliveryManForm extends Vue {
  @Prop({ required: true })
  private formType!: string;

  private valid: boolean = true;

  private deliveryMan = {
    siret: "",
    sponsorshipLink: "",
  };

  /* input rules,style and selectItem */
  private rules = {
    required: (value: string) => !!value || "Ce champ est obligatoire.",
  };

  private apiSubmitRoute: string = "http://localhost:3000/deliveryman";
  private apiGetRoute: string =
    "http://localhost:3000/deliveryman/" +
    localStorage.getItem("deliverymanId");
  private apiDeleteRoute: string =
    "http://localhost:3000/deliveryman/" +
    localStorage.getItem("deliverymanId");
  private apiUpdateRoute: string =
    "http://localhost:3000/deliveryman/" +
    localStorage.getItem("deliverymanId");

  mounted() {
    axios
      .get(this.apiGetRoute, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res: any) => {
        console.log(res.data);
        //Perform Success Action
        this.deliveryMan = res.data;
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

  //api call to post data
  public submitForm(): void {
    if (this.formType == "register") {
      if (
        (
          this.$refs.deliverymanForm as Vue & { validate: () => boolean }
        ).validate()
      ) {
        axios
          .post(this.apiSubmitRoute, this.deliveryMan, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res: any) => {
            console.log(res);
            localStorage.setItem("deliverymanId", res.data.id);
            //Perform Success Action
          })
          .catch((error: any) => {
            // error.response.status Check status code
          })
          .finally(() => {
            //Perform action in always
          });
      }
    } else {
      if (
        (
          this.$refs.deliverymanForm as Vue & { validate: () => boolean }
        ).validate()
      ) {
        axios
          .put(this.apiUpdateRoute, this.deliveryMan, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
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
  }

  public deleteDeliveryMan(): void {
    if (
      confirm(
        "Etes-vous sûr de vouloir supprimer votre status de livreur de manière définitive ?"
      )
    ) {
      axios
        .delete(this.apiDeleteRoute, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res: any) => {
          localStorage.removeItem("deliverymanId");
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
  .develiryman-card {
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