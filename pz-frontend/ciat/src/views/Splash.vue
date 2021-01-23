<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        
        <ion-tab-button tab="login" href="/unauth/login">
          <ion-icon :icon="logInOutline" />
          <ion-label>Login</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="register" href="/unauth/register">
          <ion-icon :icon="personAddOutline" />
          <ion-label>Register</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { logInOutline, personAddOutline } from 'ionicons/icons';
import router from '../router'

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      personAddOutline,
      logInOutline
    }
  },
  mounted(){
    if(this.isLoggedIn){
        router.push({ path: '/friends' })
    }
  }
}
</script>