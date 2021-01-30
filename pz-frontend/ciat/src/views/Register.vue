<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
        <i class="far fa-comments fa-5x primary-color"></i>
      </ion-buttons>
        <ion-title>Rejestracja</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Rejestracja</ion-title>
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
    <ion-label position="floating">E-mail</ion-label>
    <ion-input type="email" v-model="email" autocomplete="email"></ion-input>
  </ion-item>
      </ion-col>
      <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
      <ion-col size="6" size-lg>
        <ion-item>
    <ion-label position="floating">Nr. telefonu</ion-label>
    <ion-input type="tel" v-model="phone" autocomplete="tel"></ion-input>
  </ion-item>
      </ion-col>
      <ion-col size="3" size-lg>
      </ion-col>
</ion-row>

<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
<ion-col  size="6" size-lg>
  <ion-item >
    <ion-label position="floating" >Hasło</ion-label>
    <ion-input type="password" v-model="password" @ionFocus='setError(false)'></ion-input>
  </ion-item>
  </ion-col>
  <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
<ion-col  size="6" size-lg>
  <ion-item style="margin-bottom: .5em;" >
    <ion-label position="floating" >Powtórz hasło</ion-label>
    <ion-input type="password" v-model="passwordRep" @ionFocus='setError(false)'></ion-input>
  </ion-item>
  </ion-col>
  <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
<ion-col  size="6" size-lg>
  <ion-label :class="error" style="display: none; text-align: center;">{{error_text}}</ion-label>
        <ion-button expand="block" @click="submit()">Zarejestruj</ion-button>
  </ion-col>
  <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
 </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonButton } from '@ionic/vue';
import router from '../router'
export default  {
  name: 'Register',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonButton },
  data:() =>({
    email: '',
    phone: '',
    password: '',
    passwordRep: '',
    error: '',
    error_text: '',
  }),
  methods:{
    submit(){
      if(this.password !== this.passwordRep){
        this.setError(true)
        this.error_text = 'Podane hasła nie zgadzają się!'
        return
      }
      this.postRequest('/register',
      {
        email: this.email,
        number: this.phone,
        password: this.password 
      },
      (res)=>{
        if(res.data.register_successful === true){
          router.push({ path: '/unauth/login' })
        }
      },
      (err)=>{
        console.log(err)
      }
      )
    },
    setError(what){
      if(what){
        this.error='error-class'
      }
      else{
        this.error=''
      }
    },
  }

}
</script>

<style scoped>
  .error-class{
    display: initial !important;
    background-color: rgba(255, 28, 28, 0.3);
  }
</style>