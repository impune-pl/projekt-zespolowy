<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click="openMenu()">
        <i class="far fa-comments fa-5x primary-color"></i>
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
    <ion-label>Wszyscy Znajomi</ion-label>
  </ion-list-header>
    <ion-item-sliding ref="test">
      <ion-item @click="showConversation(item)">
        <ion-label>jkowalki@exmaple.com</ion-label>
        <ion-label>+48 123 456 789</ion-label>
        <ion-label position="fixed"><ion-icon :icon="chevronBackOutline" @click='open("test")' /></ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="unread(item)">Zablokuj</ion-item-option>
        <ion-item-option color="warning" @click="unread(item)">Usuń</ion-item-option>
        <ion-item-option color="secondary" @click="unread(item)">Lokalizacja</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    <ion-item-sliding>
      <ion-item @click="showConversation(item)">
        <ion-label>jkowalki@exmaple.com</ion-label>
        <ion-label>+48 123 456 789</ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="unread(item)">Zablokuj</ion-item-option>
        <ion-item-option color="warning" @click="unread(item)">Usuń</ion-item-option>
        <ion-item-option color="secondary" @click="unread(item)">Lokalizacja</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    <ion-item-sliding>
      <ion-item @click="showConversation(item)">
        <ion-label>jkowalki@exmaple.com</ion-label>
        <ion-label>+48 123 456 789</ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="unread(item)">Zablokuj</ion-item-option>
        <ion-item-option color="warning" @click="unread(item)">Usuń</ion-item-option>
        <ion-item-option color="secondary" @click="unread(item)">Lokalizacja</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    <ion-item-sliding>
      <ion-item @click="showConversation(item)">
        <ion-label>jkowalki@exmaple.com</ion-label>
        <ion-label>+48 123 456 789</ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="danger" @click="unread(item)">Zablokuj</ion-item-option>
        <ion-item-option color="warning" @click="unread(item)">Usuń</ion-item-option>
        <ion-item-option color="secondary" @click="unread(item)">Lokalizacja</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>

  <ion-list>
  <ion-list-header>
    <ion-label>Prośby o dodanie</ion-label>
  </ion-list-header>
    <ion-item-sliding>
      <ion-item>
        <ion-label>jkowalki@exmaple.com</ion-label>
        <ion-label>+48 123 456 789</ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="success" @click="unread(item)">Zaakceptuj</ion-item-option>
        <ion-item-option color="warning" @click="unread(item)">Usuń</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    <ion-item-sliding>
      <ion-item>
        <ion-label>jkowalki@exmaple.com</ion-label>
        <ion-label>+48 123 456 789</ion-label>
      </ion-item>
      <ion-item-options side="end">
        <ion-item-option color="success" @click="unread(item)">Zaakceptuj</ion-item-option>
        <ion-item-option color="warning" @click="unread(item)">Usuń</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonItem, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonIcon, IonFab, IonFabButton, IonListHeader, modalController } from '@ionic/vue';
import { chevronBackOutline, addOutline } from "ionicons/icons";

import AddFriend from "../components/AddFriend"

export default  {
  name: 'Friends',
  setup() {
    return {
      addOutline,
      chevronBackOutline
    }
  },
  methods:{
    async showFriendAdder(){
      const modal = await modalController
        .create({
          component: AddFriend,
        })
        this.modal = modal
      return modal.present();
    },
    dismissModal(){
      this.modal.dismiss()
    },
    open(item){
      console.log(this.$refs[item].$el)
      this.$refs[item].$el.open()
     // console.log(this.$refs.test)
      
    }
  },
  data() {
    return {
      modal: null
    }
  },
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonButtons, IonList, IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonIcon, IonFab, IonFabButton, IonListHeader },
  
  mounted(){
    this.secured()
  }

}
</script>

<style scoped>

</style>