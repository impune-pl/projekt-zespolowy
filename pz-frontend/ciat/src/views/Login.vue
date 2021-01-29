<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click="openMenu()">
        <i class="far fa-comments fa-5x primary-color"></i>
      </ion-buttons>
        <ion-title>Logowanie</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Logowanie</ion-title>
        </ion-toolbar>
      </ion-header>
 <div class="center-container">
    <i class="far fa-user fa-7x  primary-color"></i>
      </div>
     <ion-grid>
     
       
<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
      <ion-col size="6" size-lg>
        <ion-item>
    <ion-label  position="floating">Nr. Telefonu</ion-label>
    <ion-input v-model="phone" type="tel"></ion-input>
  </ion-item>
      </ion-col>
      <ion-col size="3" size-lg>
      </ion-col>
</ion-row>

<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
<ion-col  size="6" size-lg>
  <ion-item>
    <ion-label position="floating">Hasło</ion-label>
    <ion-input v-model="password" type="password"></ion-input>
  </ion-item>
  </ion-col>
  <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
<ion-col  size="6" size-lg>
        <ion-button @click="login()" expand="block">Login</ion-button>
  </ion-col>
  <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
 </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script>
import router from '../router'
import { IonPage, IonHeader, IonToolbar, IonTitle, 
IonContent, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonButton} from '@ionic/vue';

export default  {
  
  name: 'Login',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonButton },
  data:() =>({
    phone: '',
    password: '',
  }),
  methods:{
    login(){
      this.postRequest('/login',
      {
        number: this.phone,
        password: this.password 
      },
      (res)=>{
        if(res.data.login_successful === true){
          localStorage.token = 'abc123'
          router.push({ path: '/' })
        }
      },
      (err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>