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
    }
  },
  async mounted(){
    
  },
  ionViewWillEnter(){
    this.locationUpdater = setInterval(
        ()=>{
            this.updateLocation()
        }, 10000)
  },
  ionViewWillLeave(){
    if(this.locationUpdater !== null)
      clearInterval( this.locationUpdater )
  }
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