<template>
    <v-card
    class="restaurants-list mx-auto"
    elevation="10"
    width="80%"
    height="80%"
    max-height="80%"
    
  >
  <v-toolbar
    color="white"
    style="padding-top:20px; padding-bottom:70px"
  >
  <v-text-field
            v-model="restaurantName"
            label="Nom du restaurant"
            color="#CA6B3E"
            class="mr-2"
          ></v-text-field>
          <v-text-field
            v-model="city"
            :rules="nameRules"
            label="Ville"
            color="#CA6B3E"
            class="mr-2"
          ></v-text-field>
            <v-spacer></v-spacer>
           <v-select
          :items="types"
          label="Type"
          class="mr-2"
          color="#CA6B3E"
        ></v-select>

         <v-select
          :items="state"
          label="Disponibilité"
          class="mr-2"
          color="#CA6B3E"
        ></v-select>

  
  </v-toolbar>

  <div style="height:80%; overflow-y: auto;">
    <v-card
    class="mx-auto restaurant-card"
    width="95%"
    height="30%"
    style="margin-top : 15px"
    color="black"
    >
    <div class="item-restaurant"> <h2 style="color:white">Quick</h2></div>
    <div class="item-restaurant infos">   
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Strasbourg</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
       class="t"
        >12h-22h</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Snack</v-btn></div>
   
          

    </v-card>
     <v-card
    class="mx-auto restaurant-card"
    width="95%"
    height="30%"
    style="margin-top : 15px"
    color="black"
    >
    <div class="item-restaurant"> <h2 style="color:white">Quick</h2></div>
    <div class="item-restaurant infos">   
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Strasbourg</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
       class="t"
        >12h-22h</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Snack</v-btn></div>
   
          

    </v-card>
     <v-card
    class="mx-auto restaurant-card"
    width="95%"
    height="30%"
    style="margin-top : 15px"
    color="black"
    >
    <div class="item-restaurant"> <h2 style="color:white">Quick</h2></div>
    <div class="item-restaurant infos">   
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Strasbourg</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
       class="t"
        >12h-22h</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Snack</v-btn></div>
   
          

    </v-card>
     <v-card
    class="mx-auto restaurant-card"
    width="95%"
    height="30%"
    style="margin-top : 15px"
    color="black"
    >
    <div class="item-restaurant"> <h2 style="color:white">Quick</h2></div>
    <div class="item-restaurant infos">   
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Strasbourg</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
       class="t"
        >12h-22h</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Snack</v-btn></div>
   
          

    </v-card>
     <v-card
    class="mx-auto restaurant-card"
    width="95%"
    height="30%"
    style="margin-top : 15px"
    color="black"
    >
    <div class="item-restaurant"> <h2 style="color:white">Quick</h2></div>
    <div class="item-restaurant infos">   
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Strasbourg</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
       class="t"
        >12h-22h</v-btn>
        <v-btn
        elevation="2"
        rounded
        small
        class="t"
        >Snack</v-btn></div>
   
          

    </v-card>
</div>
    </v-card>
</template>

 <script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'RestaurantsList',

    data: () => ({
        types: ['Snack', 'Asiatique', 'Hamburger', 'Tacos'],
        state: ['Tous', 'Ouverts', 'Fermés'],
    }),
  })
</script>


<style lang="scss" scoped>
    .restaurants-list {
        margin-top : 50px;
    }

    h2 {
        font-size: 50px;
        font-weight: normal;
         margin-left: 50px;
    }

    .restaurant-card {
        display: flex;
	    flex-direction: row;
        align-items: center;
        justify-content: space-between;
       
        
         
    }

    .item-restaurant {
        //  flex: 1 1 100%;
        //  text-align: center;
        

    }

    .infos {
        display: flex;
	    flex-direction: column;
        align-items: center;
        margin-right: 50px;
        
         
    }

    .t {
        margin-top: 5px;
        width: auto;
        
    }




</style>