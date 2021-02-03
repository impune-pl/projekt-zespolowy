<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" @click='pushTo("/")'>
        <i class="far fa-comments fa-5x primary-color"></i>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button v-if="isLocationShared === true" @click="location()" color="secondary">
          <ion-icon name="locate-outline"></ion-icon>
        </ion-button>
        <i @click="openMenu()" class="fa fa-bars fa-3x primary-color" style="margin-right: .5em;margin-left: .5em;"></i>
      </ion-buttons>
        <ion-title>Konwersacja z {{remoteInfo.email}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="medium">{{remoteInfo.email}}</ion-title>
        </ion-toolbar>
      </ion-header>
      
     
<ion-infinite-scroll disabled="true" position="top" @ionInfinite="loadData($event)"  threshold="100px" id="infinite-scroll" ref="infinite-scroll">
        <ion-infinite-scroll-content ref="infinite-scroll-content" loading-spinner="bubbles" loading-text="Ładowanie wiadomości...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
<ion-list>
  

  <message v-for="message in messages" :ref="message.id" :key="message.id" :content="message.content" :type="message.type" :id="message.id" :email="remoteInfo.email" :own="message.sender === ownInfo.id ? true : false"/>
  
  </ion-list>

  
    </ion-content>

     <ion-footer>
    <ion-toolbar>
    <ion-textarea placeholder="Wpisz wiadomość" v-model="messageContent"></ion-textarea>
      <ion-button slot="end" @click="send()" color="primary">
          <ion-icon name="send-outline"></ion-icon>
        </ion-button>
    </ion-toolbar>
  </ion-footer>
  </ion-page>
</template>

<script>
//:own="message.sender === this.ownInfo.id ? true : false"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,  IonList,  IonIcon,  IonFooter, IonButton, IonTextarea,  IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { sendOutline, locateOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import Message from '../components/Message.vue';

addIcons({
  "send-outline": sendOutline,
  "locate-outline": locateOutline
});

export default  {
  name: 'Messages',
  methods:{
    loadInitalMessages(){
      this.messages = []
      this.getRequest('/messages/'+this.id,
      (res)=>{
        if(res.data.messages !== null){
          res.data.messages.forEach((mess)=>{
              this.messages.unshift(mess)
          })
          this.scrollToLast()      
          this.loaded = true
        }
        else{
          this.showEror('Ładowanie danych nie powiodło się!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Ładowanie danych nie powiodło się!')
      })
    },
    scrollToLast(){
      setTimeout(()=>{
        this.$refs[this.messages[this.messages.length-1].id].$el.scrollIntoView()
      },200)
    },
    loadMessageTypes(){
      this.getRequest('/message/types',
      (res)=>{
        if(res.data.message_types !== null){
          this.messageTypes = res.data.message_types
        }
        else{
          this.showEror('Ładowanie danych nie powiodło się!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Ładowanie danych nie powiodło się!')
      })
    },
    loadMoreMessages(since){
      this.getRequest('/messages/'+this.id+'/'+since,
      (res)=>{
        if(res.data.messages !== null && res.data.messages !== false){
          res.data.messages.forEach((mess)=>{
            if(this.messages[this.messages.length-1].id !== mess.id)
              this.messages.push(mess)
          })
          this.scrollToLast()
        }
        else{
          this.showEror('Ładowanie danych nie powiodło się!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Ładowanie danych nie powiodło się!')
      })
    },
    checkNewMessages(){
      if(this.messages.length > 0 && this.loaded === true){
        let lastMessage = this.messages[this.messages.length-1].id
        this.getRequest('/message/'+this.id+'/'+lastMessage+'/new',
      (res)=>{
        if(res.data.new_messages === true){
          this.loadMoreMessages(lastMessage)
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Ładowanie danych nie powiodło się!')
        this.stopMessageCheck()
      })
      }
    },
    loadData(event){
      event.target.complete()
    },
    send(){
      if(this.messageContent.length > 0){
        this.isSending = true
        this.postRequest('/message/'+this.id+'/send',
        {
          content: this.messageContent,
          type: 'TEXT'
        },
      (res)=>{
        if(res.data.message_send !== false && res.data.message_send !== null){
          this.messageContent = ''
          this.checkNewMessages()
          this.isSending = false
        }
        else{
          this.showEror('Wysyłanie nie powiodło się!')
          this.isSending = false
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Wysyłanie nie powiodło się!')
        this.isSending = false
      })
      }
    },
    checkLocationShare(){
      this.getRequest('/contacts',
      (res)=>{
        if(res.data.friends_list !== null){
          res.data.friends_list.forEach((friend)=>{
            if(friend.isAccepted === true && friend.contact.id == this.contactId){
              this.isLocationShared = friend.isLocationShared
            }
          })
        }
      },
      (err)=>{
        console.log(err)
      })
    },
    stopMessageCheck(){
      clearInterval( this.messageLoader )
    }
  },
  data() {
    return {
      id: -1,
      contactId: -1,
      messageTypes: ['TEXT', 'IMAGE'],
      messages: [],
      ownInfo: {},
      remoteInfo: {},
      messageLoader: null,
      loaded: false,
      messageContent: '',
      isLocationShared: false,
      isSending: false
    }
  },
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage,  IonButtons, IonList,  IonIcon, IonFooter, IonButton, IonTextarea, IonInfiniteScroll, IonInfiniteScrollContent, Message },
  async ionViewWillEnter(){
    this.secured()
    this.messageContent = ''
    this.loaded = false
    this.id = this.$route.params.id
    this.contactId = this.$route.params.userId
    this.ownInfo = await this.getmMyUserInfo()
    this.remoteInfo = await this.getUserById(this.contactId)
    //this.loadMessageTypes()
    this.loadInitalMessages()
    this.checkLocationShare()
    this.messageLoader =  setInterval(
        ()=>{
          if(!this.isSending){
            this.checkNewMessages()
          }
        }, 2000)
  },
  ionViewWillLeave(){
    this.stopMessageCheck()
  }
}

/*
<ion-card class="message-remote">
    <ion-card-header>
      <ion-card-subtitle>mnowak@exmaple.com</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Hej
    </ion-card-content>
  </ion-card>
  <ion-card class="message-own">
    <ion-card-header>
      <ion-card-subtitle>Ty</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      Siema 😃
    </ion-card-content>
  </ion-card>
*/
</script>

<style scoped>

</style>