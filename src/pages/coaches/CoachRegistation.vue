<template>
  <base-card>
    <section>
      <h2>Register as Coach now!</h2>
      <coach-form></coach-form>
    </section>
  </base-card>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';

export default {
  components: {
    CoachForm,
  },
};
</script>
