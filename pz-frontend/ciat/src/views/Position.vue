<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click='pushTo("/")'>
        <i class="far fa-comments fa-5x primary-color"></i>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button @click="location()" color="secondary">
          <ion-icon name="locate-outline"></ion-icon>
        </ion-button>
        <i @click="openMenu()" class="fa fa-bars fa-3x primary-color" style="margin-right: .5em;margin-left: .5em;"></i>
      </ion-buttons>
        <ion-title>Pozycja GPS {{remoteInfo.email}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">GPS</ion-title>
        </ion-toolbar>
      </ion-header>
      <div  id='map' ref="mainContent" class="max-dimensions">
     <span v-if="location === null">Lokalizacja niedostępna</span>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, IonButton } from '@ionic/vue';


export default  {
  name: 'Position',
  methods:{
    loadLocation(){
      this.getRequest('/location/'+this.id,
      (res)=>{
        if(res.data.location !== null){
          this.location = res.data.location
          let coords = this.location.split(',')

          if(this.map !== null){
            if(this.marker === null){
            this.marker = window.L.mapquest.textMarker([coords[0], coords[1]], {
              text: 'Lokalizacja '+this.remoteInfo.email,
              position: 'top',
              type: 'marker',
              icon: {
                primaryColor: '#333333',
                secondaryColor: '#333333',
                size: 'sm'
              }
            }).addTo(this.map);
            }
            else{
              this.marker.setLatLng([coords[0], coords[1]])
            }
            this.map.setView([coords[0], coords[1]], 16);
          }
          
         }
        else{
          this.showToast('Lokalizacja użytkownika '+ this.remoteInfo.email+' niedostępna!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Ładowanie danych nie powiodło się!')
      })
    },
    loadMap(){
      if(this.map === null){
      window.L.mapquest.key = 'TQFyLtiwURRB2eLpL9yny7bKeqtw3c6h';
        var map = window.L.mapquest.map('map', {
          center: [52.2491151,20.9895349],
          layers: window.L.mapquest.tileLayer('map'),
          zoom: 16
        });
        map.addControl(window.L.mapquest.control());
        this.map = map
      }
    }
  },
  data() {
    return {
      id: -1,
      contactId: -1,
      remoteInfo: {},
      location: null,
      mapSrc: '',
      map: null,
      marker: null,
      locationUpdater: null
    }
  },
  computed:{
  },
  components: {  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon, IonButton },
  async ionViewWillEnter(){
    this.secured()
    this.id = this.$route.params.id
    this.contactId = this.$route.params.userId
    this.remoteInfo = await this.getUserById(this.contactId)
    this.loadMap()
    this.loadLocation()
    this.locationUpdater = setInterval(
        ()=>{
            if(this.isLoggedIn())
              this.loadLocation()
        }, 10000)
    
  },
  updated(){

  },
  ionViewWillLeave(){
    if(this.locationUpdater !== null)
      clearInterval( this.locationUpdater )
  }
}

</script>

<style scoped>
.max-dimensions{
  width: 100%;
  height: 100%;
}
</style>