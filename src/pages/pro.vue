<template>
  <q-list
  dense
  padding
   >   
    <div >  
    <base-card>
    <q-item         
          v-for="ass in assignments"
          v-if="ass.status=='assigned'"
          :key="ass.id"
          class="col"
          clickable
          dense
          @click="showInfos()"
          :style="styles" 
          >
        <q-item-section side top>
            <q-circular-progress
              :value="ass.value"
              size="30px"
              :thickness="0.22"
              color="orange"
              track-color="grey-3"
              class="q-ma-xs"
            />
        </q-item-section>

        <q-item-section 
           v-if="ass.dueDate"
           side>
          <div class="row">
    	     	<div class="column justify-center">
		       	<q-icon 
		    		name="event"
		    		size="18px"
		    		class="q-mr-xs" />
    	    	</div>
	    	    <div class="column">
            <q-item-label 
          	class="row justify-end"
          	caption>
          	{{ ass.dueDate }}
            </q-item-label>
            <q-item-label
          	class="row justify-end"
          	caption>
          	<small>{{ ass.dueTime }}</small>
          </q-item-label>
	       	</div>
    	</div>
    </q-item-section>
    <q-item-section >
          <div class="row">
	    	    <div class="column">
            <q-item-label 
          	class="row justify-end"
          	>
           <b>{{ ass.adress }}</b>
            </q-item-label>
            <q-item-label
          	class="row justify-end"
            caption
          	>
          <b>	{{ ass.payment }} </b>
            </q-item-label>
	       	</div>
    	</div>
    </q-item-section>

          <q-item-section side>
            <q-btn
              v-show="ass.value===75"
              @click.stop="promptDeliver(ass.id)"
              icon="local_shipping"
              dense
              round
              outline
              :style="style"
              no-caps>
            </q-btn>

            <q-btn
              v-show="ass.value===50"
              @click.stop="promptPick(ass.id)"
              icon="local_laundry_service"
              round
              dense
              outline           
              :style="style"
              no-caps>
            </q-btn>
            
          </q-item-section>
        </q-item>
        </base-card>
    </div>
    <q-dialog v-if="infosDialog" v-model="infosDialog" >
      <cloth-infos :ass="assignments"/>
    </q-dialog>
    </q-list>
    
    
</template>
<script>
import BaseCard from 'components/UI/BaseCard.vue';
import ClothInfos from 'components/ClothInfos.vue';
export default {
  components: { ClothInfos },
	created() {
		this.dark = this.$q.dark.isActive;
	},
	watch: {
		'$q.dark.isActive' (val) {
			this.dark = val;
		}
	},
   data() {
    return {
      selectedTab:"",
      dark: null,
      value:75,
      infosDialog: false,
      commandes: [],
      
      assignments:[
        {
        id:'f',
        dueTime:'15:00-16:00',
        dueDate:'2021/05/12',
        adress:'kram,Tunis',
        payment:'90dt',
        value:75,
        status:'assigned'
      },
      {
         id:'d',
        dueTime:'13:00-14:00',
        dueDate:'2021/04/12',
        adress:'Rades,Tunis',
        payment:'80dt',
        value:50,
        status:'assigned'

      },
      {
         id:'g',
        dueTime:'13:00-14:00',
        dueDate:'2021/07/12',
        adress:'kram,Tunis',
        payment:'80dt',
        value:50,
        status:'assigned'

      }
      ]
      };
  },
  components: {
      'base-card' : require('components/UI/BaseCard.vue').default,
      'cloth-infos' : require('components/ClothInfos.vue').defaultClothInfos
    },
    methods:{
      showInfos() {
      this.infosDialog = true;
    },
      verif(){
        return document.querySelector('q-item');
      },
      setSelectedTab(tab) {
      this.selectedTab = tab;
    },
    router(){
      this.$router.push('/clothinfos');
    },
    deliver(id){
      for (let index = 0; index < this.assignments.length; index++) {
        const element = this.assignments[index];
        if (element.id==id) {
          element.status='completed';
          
        }
        
      }
    },
    pick(id){
      for (let index = 0; index < this.assignments.length; index++) {
        const element = this.assignments[index];
        if (element.id==id) {
          element.value=75;
          
        }
        
      }
    },
    promptDeliver(id) {
        this.$q.dialog({
          title: this.$t('confirm'),
          message: this.$t('deliver'),
          ok: {
            push: true
          },
          cancel: {
            color: 'negative'
          },
          persistent: true
        }).onOk(() => {
          this.deliver(id);
        })
      },
      promptPick(id) {
        this.$q.dialog({
          title: this.$t('confirm'),
          message: this.$t('pick'),
          ok: {
            push: true
          },
          cancel: {
            color: 'negative'
          },
          persistent: true
        }).onOk(() => {
          this.pick(id);
        })
      },
      async getAll() {
      let res = await this.$axios.get("/commande");
      this.commandes = res.data;
      console.log(this.commandes)
    },
    async getAllNomClients() {
      let res = await this.$axios.get("/client");
      let NomClients = {};
      res.data.forEach(el => {
        NomClients[el._id] = el.nom;
      });
      this.NomClients = { ...NomClients };
    },
    async getAllPrenomClients() {
      let res = await this.$axios.get("/client");
      let PrenomClients = {};
      res.data.forEach(el => {
        PrenomClients[el._id] = el.prenom;
      });
      this.PrenomClients = { ...PrenomClients };
    },

    },
    computed: {
    darkMode() {
      return this.$q.dark.isActive === 'true' ? null : 'dark';
    },
    styles () {
      if (this.dark) {
        //#78002f
        return { 'background': 'linear-gradient(to right, #000428, #004e92)', 
        'color':'antiquewhite' }
      }
      
      return {'background': 'linear-gradient(to right, #ba5370, #f4e2d8)','color':'black'}
    },
    style () {
      if (this.dark) {
        //#78002f
        return { 'color': 'antiquewhite' }
      }
      
      return {'color': '#FF0080'}
    }//linear-gradient(to right, #eecda3, #ef629f)
    },
    async mounted() {
    await this.getAll();
    await this.getAllNomClients();
    await this.getAllPrenomClients();
    console.log(this.commandes);
    }
}
</script>
<style scoped>
base-card{
  box-shadow:none;
}
.q-item{
  font-family: monospace;
  font-size: 11px;
}
.dark{
  background-color: #edd2ff;
}
</style>