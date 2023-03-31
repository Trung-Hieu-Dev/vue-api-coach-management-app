<template>
  <base-card>
    <section>
      <h2>Register as Coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </section>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data); //pass data to vuex by calling actions to transform data before merging to array
      this.$router.replace('/coaches'); //navigate to /coaches
    },
  },
};
</script>
