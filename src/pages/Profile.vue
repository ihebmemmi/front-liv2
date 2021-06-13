<template>
  <q-page class="q-pa-md" :style="styles">
    <div class="text-h6 q-mt-sm q-mb-xs hi">{{ $t('welcome') }} {{ this.userdata.nom }} 
      <q-space/> 
      <span>
        <q-avatar
        class="absolute-top-right q-mt-xs q-mb-xs"
        size="70px"
        rounded
        >
        <q-img 
            
            v-if="!this.userdata.imageUrl"
            class=""
            src="https://i.skyrock.net/7045/53217045/pics/2749180896_small_1.png"
          />
          <q-img
            v-if="this.userdata.imageUrl"
            class="rounded-borders"
            :src="this.userdata.imageUrl"
          />
        </q-avatar>
        
      </span>
      
    
    </div>
    

    <q-card class="profilcard" :style="style">
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
                <span class="text1" :style="styl">{{ $t('name') }}</span> 
                 <q-input outlined readonly v-model="userdata.prenom" dense class="w">
                 <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="person"
                    />
                  </div>
                </template>
                 </q-input>
           
                <span class="text1" :style="styl">{{ $t('first') }}</span>
                <q-input outlined readonly v-model="userdata.nom" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="person"
                    />
                  </div>
                </template>
                </q-input>

                <span class="text1" :style="styl">{{ $t('birth') }}</span>
                <q-input outlined readonly v-model="userdata.date_naissance" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="today"
                    />
                  </div>
                </template>
                </q-input>

                <span class="text1" :style="styl">{{ $t('gender') }}</span>
                <q-input outlined readonly v-model="userdata.genre" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="wc"
                    />
                  </div>
                </template>
              </q-input>
                
                <span class="text1" :style="styl">Email:</span>
                <q-input outlined readonly v-model="userdata.email" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="mail"
                    />
                  </div>
                </template>
              </q-input>
                
                <span class="text1" :style="styl">{{ $t('adress') }}</span>
                <q-input outlined readonly v-model="userdata.rue" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="home"
                    />
                    <span class="s">{{ $t('town') }}</span>
                  </div>
                </template>
              </q-input>
              </br>
                <q-input outlined readonly v-model="userdata.ville" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="home"
                    />
                  <span class="s">{{ $t('road') }}</span>
                  </div>
                </template>
              </q-input>
              </br>
                <q-input outlined readonly v-model="userdata.code_postal" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="code"
                    />
                   <span class="s">{{ $t('code') }}</span> 
                  </div>
                </template>
              </q-input>


                
                <span  class="text1" :style="styl">{{ $t('tele') }}</span>
                <q-input outlined readonly v-model="userdata.telephone" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="phone"
                    />
                  </div>
                </template>
              </q-input>
                
                <span class="text1" :style="styl">{{ $t('status') }}</span>
                <q-input outlined readonly v-model="userdata.etat" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="published_with_changes"
                    />
                  </div>
                </template>
              </q-input>
              </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <q-btn
        glossy
        rounded
        dense
        style="margin-left:30px;margin-top:20px"
        icon="change_circle"
        icon-right="send"
        @click="EditUser()"
        v-close-popup
        :label="$t('edit')"
        color="blue-10"
        no-caps
      ></q-btn>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <profile-form :userdata="userdata" />
    </q-dialog>
       
  </q-page>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
import ProfileForm from "src/components/Forms/ProfileForm.vue";
export default {
  components: { ProfileForm },
  created() {
		this.dark = this.$q.dark.isActive;
        this.getUser();
        this.getUserData();
	},
  mounted(){
  },

	watch: {
		'$q.dark.isActive' (val) {
			this.dark = val;
		}
	},
  data() {
    return {
      user: [],
      userdata: [],
      editDialog: false,
      dark: null,
      };
  },
  computed:{
    styles () {
      if (this.dark) {
        return { 'background-color': '#171F24' }
      }
      return {'background-color': 'white'}
        },
    style() {
      if(this.dark){
        return {'background-color': '#171F24'}
      }
      return {'background-color': 'white'}
    },
    styl() {
      if(this.dark){
        return {'color': 'secondary'}
      }
      return {'color': 'grey-9'}
    }
      },
  methods:{
    EditUser() {
      this.editDialog = true;
    },
    async getUserData() {
      let res = await this.$axios.get(`/livreur/${this.userId}`);
      this.userdata = res.data;
      console.log(this.userdata);
    },
    /*logUserOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },*/
    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      console.log(this.user);
      this.userId = this.user._id;
      console.log(this.userId);
    },
   } 
} 

</script>
<style scoped>
.profilcard{
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  height: fit-content;
  width: 100%;
  max-width: 350px
}
.w{
  width:fit-content;
  font-family: monospace;
  font-size: 11px;
}
.s{
  font-family: monospace;
  font-size: 11px;
}
.hi{
  font-family: monospace;
   font-weight:bold;
}
.text1 {
  font-family: monospace;
  font-size: 12px;
  font-weight: bolder;
  width: fit-content;
}

.image {
  max-width: 270px;
  border: 5px solid #0d1647;
}
.poseimg{
  position: absolute;
  top:0;
  right: 0px;
  width: 10px;
  height: 10px;
}
</style>
