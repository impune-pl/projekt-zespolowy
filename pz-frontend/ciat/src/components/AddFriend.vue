<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Dodaj znajomego</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal()">Zamknj</ion-button>
     </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-searchbar animated></ion-searchbar>

    <ion-list>
  <ion-list-header>
    <ion-label>Znalezieni użytkownicy</ion-label>
  </ion-list-header>
    <friend-to-request id="7" email="jghjfgsasdsdf@exmaple.com" phone="+48 123 456 789"/>
  </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar, IonLabel, IonListHeader, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';
import FriendToRequest from './FriendToRequest.vue';

export default defineComponent({
  name: 'AddFriend',
  props:{
    parent: Object
  },
  data() {
    return {
      
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar, FriendToRequest, IonLabel, IonListHeader, IonList },
  methods:{
    dismissModal(){
      this.parent.dismissModal()
      
    },
  }
});
</script>