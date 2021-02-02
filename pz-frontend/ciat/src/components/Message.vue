<template>
  <ion-card :class='own ? "message-own" : "message-remote"'>
    <ion-card-header>
      <ion-card-subtitle>{{own? 'Ty': email}}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <span v-if='type === "TEXT"'>
        {{content}}
      </span>
       <ion-img v-if='type === "IMAGE"' :src="content"></ion-img>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/vue';
export default {
  name: 'Message',
  props:{
    id: String,
    email: String,
    content: String,
    type: String,
    own: Boolean
  },
  setup() {
    return {
      
    }
  },
  data() {
    return {
      
    }
  },
  components: { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonImg},
  methods:{
  }
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