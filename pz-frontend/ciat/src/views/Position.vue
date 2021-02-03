<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click='pushTo("/")'>
        <i class="far fa-comments fa-5x primary-color"></i>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="location()" color="secondary">
          <ion-icon name="locate-outline"></ion-icon>
        </ion-button>
        <i @click="openMenu()" class="fa fa-bars fa-3x primary-color" style="margin-right: .5em;margin-left: .5em;"></i>
      </ion-buttons>
        <ion-title>Pozycja GPS {{remoteInfo.email}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">GPS</ion-title>
        </ion-toolbar>
      </ion-header>
      
     here gps

  
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,  } from '@ionic/vue';


export default  {
  name: 'Position',
  methods:{
    
    
  },
  data() {
    return {
      id: -1,
      contactId: -1,
      remoteInfo: {},
    }
  },
  components: {  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, },
  async ionViewWillEnter(){
    this.secured()
    this.id = this.$route.params.id
    this.contactId = this.$route.params.userId
    this.remoteInfo = await this.getUserById(this.contactId)
  },
  ionViewWillLeave(){
  }
}

</script>

<style scoped>

</style>