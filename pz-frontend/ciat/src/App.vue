<template>
  <ion-app>
    <ion-menu side="end" type="overlay" @ionWillOpen="loadUser()" menu-id="main-menu" content-id="main">
    <ion-header>
      <ion-toolbar color="primary">
        
        <ion-title><i class="far fa-2x fa-comments"></i> Ciat</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h3>Telefon: {{phone}}</h3>
      <h4>Email: {{email}}</h4>
      <ion-list>
        <ion-item @click='pushTo("/friends")'>
        <ion-icon :icon="peopleOutline" />
        <ion-label>Znajomi</ion-label>
        </ion-item>
        <ion-item @click="logout()">
          <ion-icon :icon="logOutOutline" />
          <ion-label>Wyloguj</ion-label>
          </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
    <ion-router-outlet id="main"/>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonContent, 
  IonHeader, 
  IonItem, 
  IonList, 
  IonMenu,
  IonTitle, 
  IonToolbar,
  IonIcon,
  IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import { logOutOutline, peopleOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonTitle, 
    IonToolbar,
    IonIcon,
    IonLabel
  },
  setup() {
    return {
      logOutOutline,
      peopleOutline,
    }
  },
  data() {
    return {
      email: '',
      phone: '',
      user: null,
      locationUpdater: null,
      permissionGranted: false
    }
  },
  methods:{
    async loadUser(){
      if(this.user !== null)
        return
      let user = await this.getmMyUserInfo()
      if(user !== null){
        this.user = user
        this.email = user.email
        this.phone = user.phoneNumber
      }
    },
    updateLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) =>{
          this.postRequest('/location',
          {
            location: position.coords.latitude+','+position.coords.longitude
          },
      (res)=>{
        if(res.data.update_location !== true){
          this.showToast("Aktualizacja lokalizacji nie powiodła się! :(")
        }
      },
      (err)=>{
        console.log(err)
      })
        }, (error)=>{
            switch(error.code) {
    case error.PERMISSION_DENIED:
      this.showToast("Nie przyznano uprawnień do lokalizacji!")
      break;
    case error.POSITION_UNAVAILABLE:
      this.showToast("Dane lokalizacyjne niedostępne!")
      break;
    case error.TIMEOUT:
      this.showToast("Czas oczekiwania na uprawnienia został przekroczony.")
      break;
    case error.UNKNOWN_ERROR:
      this.showToast("Wystąpił nieznany błąd pobierania lokalizacji.")
      break;
      }})
      } else { 
        this.showToast("Lokalizacja nie jest wspierana przez twoją przeglądarkę :(")
      }
    }
  },
  mounted(){
    
    this.locationUpdater = setInterval(
        ()=>{
            if(this.isLoggedIn())
              this.updateLocation()
        }, 10000)
    
  },
});
</script>

<style>
.primary-color{
  color: var(--ion-color-primary, #3880ff);
}

.center-container{
  padding-top: 2em;
  display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
}

h3, h4 {
  margin-left: .5em;
} 
</style>