<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Dodaj znajomego</ion-title>
      <ion-buttons slot="end">
        <ion-button onclick="dismissModal()">Zamknj</ion-button>
     </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-searchbar animated></ion-searchbar>

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
        <ion-item-option color="success" @click="unread(item)">Zaproś</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
    
  </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddFriend',
  data() {
    return {
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar }
});
</script>