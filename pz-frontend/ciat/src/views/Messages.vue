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
        <ion-title>Konwersacja z mnowak@exmaple.com</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">mnowak@exmaple.com</ion-title>
        </ion-toolbar>
      </ion-header>
      
     
<ion-infinite-scroll disabled="true" position="top" @ionInfinite="loadData($event)"  threshold="100px" id="infinite-scroll">
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Ładowanie wiadomości...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
<ion-list>
  <ion-card class="message-remote">
    <ion-card-header>
      <ion-card-subtitle>mnowak@exmaple.com</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Hej
    </ion-card-content>
  </ion-card>
  <ion-card class="message-own">
    <ion-card-header>
      <ion-card-subtitle>Ty</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Siema 😃
    </ion-card-content>
  </ion-card>
  
  </ion-list>

  
    </ion-content>

     <ion-footer>
    <ion-toolbar>
    <ion-textarea placeholder="Wpisz wiadomość"></ion-textarea>
      <ion-button slot="end" @click="send()" color="primary">
          <ion-icon name="send-outline"></ion-icon>
        </ion-button>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,  IonList,  IonIcon,  IonFooter, IonButton, IonTextarea, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { sendOutline, locateOutline } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "send-outline": sendOutline,
  "locate-outline": locateOutline
});

export default  {
  name: 'Messages',
  methods:{
    loadInitalMessages(){

    },
    loadMoreMessages(){

    }
  },
  data() {
    return {
      contactId: -1,
      messages: [],
    }
  },
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage,  IonButtons, IonList,  IonIcon, IonFooter, IonButton, IonTextarea, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonInfiniteScroll, IonInfiniteScrollContent },
  ionViewWillEnter(){
    this.secured()
    this.loadInitalMessages()
  },
}
</script>

<style scoped>
ion-card {
  width: fit-content;
}

.message-own{
float: right;
}



</style>