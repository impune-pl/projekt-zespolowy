<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click='pushTo("/")'>
        <i class="far fa-comments fa-5x primary-color"></i>
      </ion-buttons>
      <ion-buttons slot="end" @click="openMenu()">
          <i class="fa fa-bars fa-3x primary-color" style="margin-right: .5em;margin-left: .5em;"></i>
      </ion-buttons>
        <ion-title>Znajomi</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Znajomi</ion-title>
        </ion-toolbar>
      </ion-header>
      
     <div class="center-container">
    <i class="fas fa-users fa-7x  primary-color"></i>
     </div>

<ion-list>
  <ion-list-header>
    <ion-label>Twoi Znajomi</ion-label>
  </ion-list-header>
    <friend id="1" email="fsfsdf@exmaple.com" phone="+48 123 456 789" @showConversation="showConversation"/>
    <friend id="2" email="sdfsgdrhgr@exmaple.com" phone="+48 123 456 789" @showConversation="showConversation"/>
    <friend id="3" email="fh@exmaple.com" phone="+48 123 456 789" @showConversation="showConversation"/>
    <friend id="4" email="fhjjtyjtyju@exmaple.com" phone="+48 123 456 789" @showConversation="showConversation"/>
    <friend id="5" email="ghjddfth@exmaple.com" phone="+48 123 456 789" @showConversation="showConversation"/>
    
  </ion-list>

  <ion-list>
  <ion-list-header>
    <ion-label>Otrzymane zaproszenia</ion-label>
  </ion-list-header>
    <friend-request-recieved id="6" email="fghfghfgh@exmaple.com" phone="+48 123 456 789"/>
    <friend-request-recieved id="7" email="jghjfgsasdsdf@exmaple.com" phone="+48 123 456 789"/>
  </ion-list>

  <ion-fab horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button @click="showFriendAdder" color="primary">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import router from '../router'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonList, IonLabel, IonIcon, IonFab, IonFabButton, IonListHeader, modalController } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline, addOutline } from "ionicons/icons";

import AddFriend from "../components/AddFriend"
import Friend from '../components/Friend.vue';
import FriendRequestRecieved from '../components/FriendRequestRecieved.vue';

export default  {
  name: 'Friends',
  setup() {
    return {
      addOutline,
      chevronBackOutline,
      chevronForwardOutline
    }
  },
  methods:{
    async showFriendAdder(){
      const modal = await modalController
        .create({
          component: AddFriend,
          componentProps:{
            parent: this
          }
        })
        this.modal = modal
      return modal.present();
    },
    dismissModal(){
      this.modal.dismiss()
    },
    
    showConversation(item){
        router.push({ path: '/messages/'+item })
    }
  },
  data() {
    return {
      iconTest: chevronBackOutline,
      modal: null
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonList, IonLabel, IonIcon, IonFab, IonFabButton, IonListHeader, Friend, FriendRequestRecieved },
 
  ionViewWillEnter(){
    this.secured()
  },
  mounted(){
    this.secured()
  }

}
</script>

<style scoped>

</style>