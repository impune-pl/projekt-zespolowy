import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

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

var apiUrl = 'http://localhost:4000'

  app.mixin({
    methods:{
      secured(){
        if(!this.isLoggedIn){
          router.push({ path: '/unauth' })
        }
      },
      home(){
        router.push({ path: '/' })
      },
      getRequest(path, success, failure){
        axios.get(apiUrl+path,
        {
          params: {token: localStorage.token}
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
        var cfg = {}
        if(this.isLoggedIn){
          cfg.params = {token: localStorage.token}
        }
        axios.post(apiUrl+path, args, cfg)
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
        router.push({ path: '/' })
      },

    },

    computed:{
      isLoggedIn: ()=>{
        if (localStorage.token) {
        return true
      }else
        return false
      },
      token: ()=>{
        if (localStorage.token) {
        return localStorage.token
      }else
        return ''
      }
    }
    })

router.isReady().then(() => {
  app.mount('#app');
});