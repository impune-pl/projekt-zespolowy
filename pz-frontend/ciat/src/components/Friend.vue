<template>
  <ion-item-sliding :ref="id" v-on:ionDrag='setIcon(id)'>
      <ion-item style="pointer-events: auto;">
        <ion-label @click="showConversation()">{{email}}</ion-label>
        <ion-label @click="showConversation()">{{phone}}</ion-label>
        <ion-label position="fixed" @click='flipSlider(id)'><ion-icon :icon='icon' /></ion-label>
      </ion-item>
      <ion-item-options side="end" >
        <ion-item-option color="danger" @click='block()'>{{ isBlocked ? 'Odblokuj': 'Zablokuj'}}</ion-item-option>
        <ion-item-option color="secondary" @click='shareLocation()'>{{isLocationShared ? 'Udostępnij GPS': 'Zablokuj GPS'}}</ion-item-option>
        <ion-item-option color="success" @click='showLocation()'>GPS</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
</template>

<script>
import router from '../router'
import { IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonIcon } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
export default {
  name: 'Friend',
  props:{
    id: String,
    email: String,
    phone: String,
    isBlocked: Boolean,
    isLocationShared: Boolean
  },
  emits:{
    refresh: null
  },
  setup() {
    return {
      chevronBackOutline,
      chevronForwardOutline
    }
  },
  data() {
    return {
      icon: chevronBackOutline
    }
  },
  components: { IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonIcon },
  methods:{
    block(){
      if(this.isBlocked === true){
        // unblock
        
      }
      else{
        // block
        this.postRequest('/block/user/'+this.id,
      {},
      (res)=>{
        if(res.body.block_user === true){
          this.$emit("refresh")
          this.showToast('Zablokowano '+this.email)
        }
        else{
          this.showEror('Blokowanie nie powiodło się!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Blokowanie nie powiodło się!')
      })
      }
    },
    shareLocation(){
      if(this.isLocationShared === true){
        // location block
        this.postRequest('/block/location/'+this.id,
      {},
      (res)=>{
        if(res.body.disable_location === true){
          this.$emit("refresh")
          this.showToast('Wyłączono udostępnianie lokalizacji dla '+this.email)
        }
        else{
          this.showEror('Wyłączenie lokalizacji nie powiodło się!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Wyłączenie lokalizacji  nie powiodło się!')
      })
      }
      else{
        // share location
        this.$emit("refresh")
      }
    },
    showLocation(){
      // show location on gmaps
    },
    async showConversation(){
      if(! await this.isOpen(this.id))
        router.push({ path: '/messages/'+this.id })
    },
    async isOpen(id){
    let amount = await this.$refs[id].$el.getOpenAmount()
     if(amount > 0)
        return true
      else
        return false
    },
    async flipSlider(id){
      let amount = await this.$refs[id].$el.getOpenAmount()
      if(amount > 0){
        await this.$refs[id].$el.close()
        this.setIcon(id)
      }
      else{
        await this.$refs[id].$el.open()
        this.setIcon(id)
      }
    },
    async setIcon(id){
      setTimeout(async ()=>{
        let result = await this.isOpen(id)
      if(result)
        this.icon = chevronForwardOutline
      else
        this.icon = chevronBackOutline
      },50)
    },
  }
}
</script>