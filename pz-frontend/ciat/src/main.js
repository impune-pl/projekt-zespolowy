import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue, menuController, alertController, toastController } from '@ionic/vue';

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

    var apiUrl = 'https://ciat.local/api'

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
        if(!this.isLoggedIn())
        return
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
          if(err.response.status === 401 || err.response.status === 403){
            this.logout()
          }
        });
      },
      postRequest(path, args, success, failure){
        var options = { headers: {}}
        if(this.isLoggedIn()){
          options.headers.token = localStorage.token
        }
        axios.post(apiUrl+path, args, options)
        .then((response) =>{
          success(response)
        })
        .catch((err) =>{
          failure(err)
          if(err.response.status === 401 || err.response.status === 403){
            this.logout()
          }
        });
      },
      logout(){
        this.postRequest('/logout',
        {},
      ()=>{
        console.log('Logout')
      },
      (err)=>{
        console.log(err)
      })
        localStorage.removeItem('token')
        menuController.close('main-menu')
        router.push({ path: '/unauth/login' })
        window.location.reload()
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
      return new Promise(
        (resolve, reject) => {
          this.getRequest('/user',
          (res)=>{
            if(res.data.current_user !== null){
              resolve(res.data.current_user)
            }
            else{
              reject(null)
              this.showEror('Ładowanie danych nie powiodło się!')
            }
          },
          (err)=>{
            console.log(err)
            reject(null)
            this.showEror('Ładowanie danych nie powiodło się!')
          })
        }
      )
    },
    async getUserById(id){
      return new Promise(
        (resolve, reject) => {
          this.getRequest('/user/'+id,
          (res)=>{
            if(res.data.user_details !== null){
              resolve(res.data.user_details)
            }
            else{
              reject(null)
              this.showEror('Ładowanie danych nie powiodło się!')
            }
          },
          (err)=>{
            console.log(err)
            reject(null)
            this.showEror('Ładowanie danych nie powiodło się!')
          })
        }
      )
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