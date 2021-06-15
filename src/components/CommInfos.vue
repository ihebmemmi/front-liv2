<template>
  <q-card class="profilcard" >
      <p>{{ $t('deliver') }}</p>
      
        <div align="center">
        <q-btn
        glossy
        dense
        label="Confirmer"
        style="width:100px"
        no-caps
        rounded
        color="red"
        @click="onEdit()"
      />
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
  props: ["Comm"],
  data() {
    return {
      Commandedata:[],
      id:null
    };
  },
  async created(){
      this.Commandedata = { ...this.Comm};
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
    onCancel() {
      // this.$router.push("/client");
    },
    async onEdit() {
          this.Commandedata.etatLivraison="Livrée";
          this.Commandedata.etatPaiement="Payée";
          let res = await this.$axios.patch(
            `/commande/update/${this.Comm._id}`,
            {
              ...this.Commandedata
            }
          );
          window.location.reload(true);
        // console.log(this.Commandedata);
    },
    closeDialog() {
      this.$emit("closeDialog");
    }
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