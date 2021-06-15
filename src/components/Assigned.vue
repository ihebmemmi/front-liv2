<template>
  <q-list
  dense
  padding
   >   
    <div >  
    <base-card>
    <q-item         
          v-for="ass in commandes"
          v-if="ass.etatLivraison=='Non Livrer'"
          :key="ass._id"
          class="col"
          clickable
          dense
          @click="show_dialog = true;
                  productToShow = ass.produits;"
          :style="styles" 
          >
        <q-item-section side top>
            <q-circular-progress
              :value="value"
              size="30px"
              :thickness="0.22"
              color="orange"
              track-color="grey-3"
              class="q-ma-xs"
            />
        </q-item-section>

        <q-item-section 
           v-if="ass.dateLivraison"
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
          	<span><b> {{ ass.dateLivraison.slice(0,15) }} </b></span>
            </q-item-label>
            <q-item-label
          	class="row justify-end"
          	caption>
          	<span><small>{{ ass.dateLivraison.slice(16,24) }}</small></span>
          </q-item-label>
	       	</div>
    	</div>
    </q-item-section>
    <q-item-section >
          <div class="row">
	    	    <div class="column">
        
            <q-item-label
          	class="row justify-end"
            caption
          	>
          <q-btn
           style="background: green; color: white"
            icon-right="person"
            label="Client"
            no-caps 
            dense
            glossy
            @click.stop="client_dialog=true;
                        client = ass.client;"
            />
           </q-btn>
            </q-item-label>
	       	</div>
    	</div>
    </q-item-section>

          <q-item-section side>
            <q-btn
              @click.stop="confirm_dialog=true;
                        comm = ass;"
              icon="local_shipping"
              dense
              round
              outline
              :style="style"
              no-caps>
            </q-btn>
            <q-space/>
            <q-btn
            style="background: goldenrod; color: white"
            icon="attach_money" 
            dense
            glossy
            @click.stop="money_dialog=true;
                        money = ass._id;"
            round/>
           </q-btn>
           <!-- <q-btn
              v-show="ass.value===50"
              @click.stop="promptPick(ass.id)"
              icon="local_laundry_service"
              round
              dense
              outline           
              :style="style"
              no-caps>
            </q-btn>-->
            
          </q-item-section>
        </q-item>
        </base-card>
    </div>
    <q-dialog v-if="show_dialog" v-model="show_dialog" >
      <cloth-infos :produit="productToShow"
        @closeDialog="show_dialog = false"
        />
    </q-dialog>
    <q-dialog v-if="money_dialog" v-model="money_dialog" >
      <money-infos :Money="money"
        @closeDialog="money_dialog = false"
        />
    </q-dialog>
        <q-dialog v-if="client_dialog" v-model="client_dialog" >
          <client-infos :Client="client"
        @closeDialog="client_dialog = false"
        />
    </q-dialog>
    <q-dialog v-if="confirm_dialog" v-model="confirm_dialog" >
          <comm-infos :Comm="comm"
        @closeDialog="confirm_dialog = false"
        />
    </q-dialog>
    </q-list>
    
    
</template>
<script>
import BaseCard from 'components/UI/BaseCard.vue';
import ClothInfos from 'components/ClothInfos.vue';
import MoneyInfos from 'components/MoneyInfos.vue';
import ClientInfos from 'components/ClientInfos.vue';
import CommInfos from 'components/CommInfos.vue';
export default {
  
  components: { 
    'base-card' : require('components/UI/BaseCard.vue').default,
    ClothInfos, MoneyInfos, ClientInfos, CommInfos },
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
      dat:null,
      show_dialog: false,
      money_dialog:false,
      client_dialog:false,
      confirm_dialog:false,
      comm: [],
      client: null,
      money:null,
      commandeCopy:{},
      productToShow: null,
      commandes: [],
      NomClients: [],
      PrenomClients: [],
      VilleClients: [],
      
      
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
    promptDeliver(x) {
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
          this.onEdit(x);
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
    async getAllVilleClients() {
      let res = await this.$axios.get("/client");
      let VilleClients = {};
      res.data.forEach(el => {
        VilleClients[el._id] = el.ville;
      });
      this.VilleClients = { ...VilleClients };
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
    async created() {
    await this.getAll();
    await this.getAllNomClients();
    await this.getAllPrenomClients();
    await this.getAllVilleClients();
    console.log(this.commandes);
    }
}
</script>
<style scoped>
base-card{
  box-shadow:none;
}
span{
  font-family: monospace;
  font-size: 12px;
}
.q-item{
  font-family: monospace;
  font-size: 11px;
  height: 100px;
}
.dark{
  background-color: #edd2ff;
}
</style>