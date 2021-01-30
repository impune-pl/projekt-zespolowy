<template>
  <ion-item-sliding :ref="id" v-on:ionDrag='setIcon(id)'>
      <ion-item style="pointer-events: auto;">
        <ion-label>{{email}}</ion-label>
        <ion-label>{{phone}}</ion-label>
        <ion-label position="fixed" @click='flipSlider(id)'><ion-icon :icon='icon' /></ion-label>
      </ion-item>
      <ion-item-options side="end" >
        <ion-item-option color="success" @click='$emit("refresh")'>Zaproś</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
</template>

<script>
import { IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonLabel, IonIcon } from '@ionic/vue';
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
export default {
  name: 'FriendToRequest',
  props:{
    id: String,
    email: String,
    phone: String,
  },
  emits:{
    refresh: null,
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