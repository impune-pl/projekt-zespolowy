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
    <ion-input type="email"></ion-input>
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
    <ion-input type="tel"></ion-input>
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
    <ion-input type="password"></ion-input>
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
    <ion-label position="floating">Powtórz hasło</ion-label>
    <ion-input type="password"></ion-input>
  </ion-item>
  </ion-col>
  <ion-col size="3" size-lg>
      </ion-col>
</ion-row>
<ion-row class="ion-align-items-center">
  <ion-col size="3" size-lg>
      </ion-col>
<ion-col  size="6" size-lg>
        <ion-button expand="block">Zarejestruj</ion-button>
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

export default  {
  name: 'Tab2',
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonItem, IonLabel, IonInput, IonGrid, IonRow, IonCol, IonButtons, IonButton }
}
</script>

<style scoped>

</style>