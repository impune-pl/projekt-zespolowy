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
    <ion-searchbar animated debounce="500" @ionChange="search"></ion-searchbar>

    <ion-list>
  <ion-list-header>
    <ion-label>Znalezieni użytkownicy</ion-label>
  </ion-list-header>
    <friend-to-request v-for="contact in found" :key="contact.id" :id="contact.id" :email="contact.email" :phone="contact.phoneNumber" @refresh="dismissModal()"/>
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
    parent: Object,

  },
  data() {
    return {
      found: [],
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonSearchbar, FriendToRequest, IonLabel, IonListHeader, IonList },
  methods:{
    dismissModal(){
      this.parent.dismissModal()
      
    },
    search(event){
      let phrase = event.target.value
      
      if(phrase.length > 0){
          this.found=[]

          // by email
        this.getRequest('/contact/find/email/'+phrase,
      (res)=>{
        if(res.data.find_contact !== null && res.data.find_contact !== false){
          res.data.find_contact.forEach((contact)=>{
            this.found.push(contact)
          })
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Wyszukiwanie nie powiodło się!')
      })

      // by phone
      this.getRequest('/contact/find/number/'+phrase,
      (res)=>{
        if(res.data.find_contact !== null && res.data.find_contact !== false){
         // res.data.find_contact.forEach((contact)=>{
            this.found.push(res.data.find_contact)
        //  })
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Wyszukiwanie nie powiodło się!')
      })
      }
    }
  },
});
</script>