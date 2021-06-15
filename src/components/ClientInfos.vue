<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md" @reset="onCancel" ref="myForm">

      <q-space/>

      <q-input
        class="w"
        dense
        readonly
        outlined
        color="secondary"
        v-model="clientdata.nom"
        :label="$t('name')"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="person"
            />
          </div>
        </template>
      </q-input>
      <q-input
        class="w"
        dense
        readonly
        outlined
        color="secondary"
        v-model="clientdata.prenom"
        :label="$t('first')"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="person"
            />
          </div>
        </template>
      </q-input>
      <q-input
        class="w"
        dense
        readonly
        outlined
        color="secondary"
        v-model="clientdata.date_naissance"
        type="date"
        :label="$t('birth')"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="today"
            />
          </div>
        </template>
      </q-input>
      <!-- date -->

      <q-input
        :label="$t('gender')"
        dense
        class="w"
        outlined
        readonly
        color="secondary"
        v-model="clientdata.genre"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="wc" />
          </div>
        </template>
      </q-input>
      <br />
      <label class="title"> {{ $t('adress') }}</label>
      <q-input
        class="w"
        dense
        readonly
        outlined
        color="secondary"
        type="string"
        v-model="clientdata.ville"
        label=""
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="home" />
            <span>{{ $t('town') }}</span>
          </div>
        </template>
      </q-input>
      </br>
      <q-input
        class="w"
        dense
        outlined
        readonly
        color="secondary"
        type="string"
        v-model="clientdata.rue"
        label=""
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="home" />
            <span>{{ $t('road') }}</span>
          </div>
        </template>
      </q-input>
      </br>
      <q-input
        class="w"
        dense
        readonly
        outlined
        color="secondary"
        type="string"
        v-model="clientdata.code_postal"
        label=""
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="code" />
            <span>{{ $t('code') }}</span>
          </div>
        </template>
      </q-input>
      </br>

      <q-input
        class="w"
        dense
        readonly
        outlined
        color="secondary"
        type="mail"
        readonly
        v-model="clientdata.email"
        label=""
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="mail" />
            Email
          </div>
        </template>
      </q-input>
      <br />
      <q-input
        class="w"
        dense
        outlined
        readonly
        color="secondary"
        mask="## ### ###"
        unmasked-value
        v-model="clientdata.telephone"
        label=""
      >
        <template v-slot:label>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="phone"
            />
            <span>{{ $t('tele') }}</span>
            
          </div>
        </template>
      </q-input>
      <br />
      <div>
        <q-btn
         @click="closeDialog()"
         :label="$t('cancel')"
         outline
         no-caps
         glossy
         v-close-popup 
         color="negative" />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  props: ["Client"],
  data() {
    return {
      clientdata:[],
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
    async getClientData() {
      this.id=this.Client;
      let res = await this.$axios.get(`/client/${this.id}`);
      this.clientdata = res.data;
      console.log(this.clientdata);
    },
  },
  async created() {
    this.getClientData();
  },
  closeDialog() {
      this.$emit("closeDialog");
    }
};
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
   visibility: hidden;
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