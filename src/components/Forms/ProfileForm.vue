<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md" @reset="onCancel" ref="myForm">
      <q-input
        dense
        outlined
        color="secondary"
        v-model="userdataCopy.imageUrl"
        class="q-mb-md w"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="image"
            />
            <span>Image Url</span>
          </div>
        </template>
      </q-input>

      <q-space/>

      <q-input
        class="w"
        dense
        outlined
        color="secondary"
        v-model="userdataCopy.nom"
        :label="$t('name')"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Champ vide*']"
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
        outlined
        color="secondary"
        v-model="userdataCopy.prenom"
        :label="$t('first')"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Champs vide*']"
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
        outlined
        color="secondary"
        v-model="userdataCopy.date_naissance"
        type="date"
        :label="$t('birth')"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Champs vide*']"
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

      <q-select
        :label="$t('gender')"
        dense
        class="w"
        outlined
        color="secondary"
        v-model="userdataCopy.genre"
        :options="genreOptions"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="wc" />
          </div>
        </template>
      </q-select>
      <br />
      <label class="title"> {{ $t('adress') }}</label>
      <q-input
        class="w"
        dense
        outlined
        color="secondary"
        type="string"
        :offset="[0, 8]"
        v-model="userdataCopy.ville"
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
        color="secondary"
        type="string"
        :offset="[0, 8]"
        v-model="userdataCopy.rue"
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
        outlined
        color="secondary"
        type="string"
        :offset="[0, 8]"
        v-model="userdataCopy.code_postal"
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
        outlined
        color="secondary"
        type="mail"
        :offset="[0, 8]"
        :hint="$t('nah')"
        readonly
        v-model="userdataCopy.email"
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
        color="secondary"
        mask="## ### ###"
        unmasked-value
        v-model="userdataCopy.telephone"
        label=""
        lazy-rules
        :rules="[val => (val && val.length === 8) || 'Champs vide*']"
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
      <q-input
        class="w"
        dense
        :label="$t('status')"
        :hint="$t('no')"
        outlined
        readonly
        color="secondary"
        v-model="userdataCopy.etat"
        :options="etatOptions"
      >
        <template v-slot:prepend>
              <div class="row items-center all-pointer-events">
                <q-icon
                  class="q-mr-xs"
                  color="gray"
                  size="20px"
                  name="published_with_changes"
                />
              </div>
            </template>
      </q-input>
      <br />
      <div>
        <q-btn
          :label="$t('edit')"
          outline
          no-caps 
          glossy
          @click="onEdit()"
          class="q-mr-md"
          color="positive"
        />
        <q-btn
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
  props: ["userdata"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      userdataCopy: {}
    };
  },

  methods: {
    async onEdit() {
      //  this.$refs.myForm.validate().then(async success => {
      ////    if (success) {
      ////    let res = await this.$axios.post(`/client/`, {
      //...this.clientCopy
      //  });
      //  console.log(res);
      //   }
      //});
      //} else {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.patch(
            `/livreur/update/${this.userdata._id}`,
            {
              ...this.userdataCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");

          //this.getAll();
        }
      });
    },
    onCancel() {
      // this.$router.push("/client");
    }
  },
  mounted() {
    this.userdataCopy = { ...this.userdata };
  }
};
</script>
<style>
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