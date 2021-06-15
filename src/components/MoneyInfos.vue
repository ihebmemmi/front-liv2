<template>
  <q-card class="profilcard" >
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
                <span class="text1" >{{ $t('prix avance') }}</span> 
                 <q-input outlined readonly v-model="moneydata.avance" dense class="w">
                 <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="attach_money"
                    />
                  </div>
                </template>
                 </q-input>
           
                <span class="text1" >{{ $t('reste à payer') }}</span>
                <q-input outlined readonly v-model="moneydata.rest" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="attach_money"
                    />
                  </div>
                </template>
                </q-input>

                <span class="text1" >{{ $t('prix total') }}</span>
                <q-input outlined readonly v-model="moneydata.prixTotal" dense class="w">
                  <template v-slot:prepend>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="20px"
                      name="attach_money"
                    />
                  </div>
                </template>
                </q-input>
        </q-card-section>
        </q-card-section>
        <div align="center">
        <q-btn
        glossy
        dense
        label="Fermer"
        style="width:100px"
        no-caps
        rounded
        color="red"
        @click="closeDialog()"
      />
    </div>
        </q-card>
</template>

<script>
export default {
  props: ["Money"],
  data() {
    return {
      moneydata:[],
      id:null
    };
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    onCancel() {
      // this.$router.push("/client");
    },
    async getMoneyData() {
      this.id=this.Money;
      let res = await this.$axios.get(`/commande/${this.id}`);
      this.moneydata = res.data;
      console.log(this.moneydata);
    },
  },
  async created() {
    this.getMoneyData();
  }
};
</script>
<style>
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
.mydialog {
  width: 350px;
  padding: 20px;
  height: 500px;
}
.w{
  width:fit-content;
  font-family: monospace;
  font-size: 11px;
}
.text1 {
  font-family: monospace;
  font-size: 12px;
  font-weight: bolder;
  width: fit-content;
}
.title{
  font-family: monospace;
  font-size: 11px;
  font-weight: bold;
}
span{
  font-family: monospace;
  font-size: 11px;

}
</style>
