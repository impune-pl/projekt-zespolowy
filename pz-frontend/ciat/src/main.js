import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue, menuController, alertController } from '@ionic/vue';

var axios = require('axios')

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';



const app = createApp(App)
  .use(IonicVue)
  .use(router);

    var apiUrl = 'http://192.168.1.64:4000'

  app.mixin({
    methods:{
      secured(){
        if(!this.isLoggedIn()){
          router.push({ path: '/unauth' })
        }
      },
      home(){
        router.push({ path: '/' })
      },
      getRequest(path, success, failure){
        axios.get(apiUrl+path,
        {
          headers: {"token": localStorage.token}
        }
        )
        .then((response) =>{
          success(response)
        })
        .catch((err) =>{
          failure(err)
         // if((err.response.status === 401 || err.response.status === 403) && err.response.data.loginFailure == null){
         //   this.logout()
         // }
        });
      },
      postRequest(path, args, success, failure){
        var headers = {}
        if(this.isLoggedIn()){
          headers.token = localStorage.token
        }
        axios.post(apiUrl+path, args, headers)
        .then((response) =>{
          success(response)
        })
        .catch((err) =>{
          failure(err)
          //if((err.response.status === 401 || err.response.status === 403) && err.response.data.loginFailure == null){
         //   this.logout()
         // }
        });
      },
      logout(){
        localStorage.removeItem('token')
        menuController.close('main-menu')
        router.push({ path: '/unauth/login' })
      },
      openMenu(){
        this.secured()
        if(this.isLoggedIn())
          menuController.open('main-menu')
      },
      pushTo(location){
        menuController.close('main-menu')
        router.push({ path: location })
      },
      isLoggedIn(){
        if (localStorage.token){
        return true
        }
      else{
        return false
      }
    },
    async showEror(message){
      const alert = await alertController
        .create({
          header: 'Alert',
          subHeader: 'Subtitle',
          message: message,
          buttons: ['OK'],
        });
      return alert.present();
    },
    async showToast(message){
      const toast = await toastController
        .create({
          message: message,
          duration: 1500
        })
      return toast.present();
    },
    async getmMyUserInfo(){
      this.getRequest('/user',
      {},
      (res)=>{
        if(res.body.current_user !== null){
          return res.body.current_user
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
    async getUserById(id){
      this.getRequest('/user/'+id,
      {},
      (res)=>{
        if(res.body.user !== null){
          return res.body.user
        }
        else{
          this.showEror('Ładowanie danych nie powiodło się!')
        }
      },
      (err)=>{
        console.log(err)
        this.showEror('Ładowanie danych nie powiodło się!')
      })
    }
    },

    computed:{
      token: ()=>{
        if (localStorage.token) {
        return localStorage.token
      }else
        return ''
      }
    },
    data() {
      return {
      }
    },
    })

router.isReady().then(() => {
  app.mount('#app');
});