<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidation('email')"
      />
    </div>
    <div class="form-control" :class="{ errors: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        rows="5"
        id="message"
        v-model.trim="message.val"
        @blur="clearValidation('message')"
      />
    </div>
    <p
      v-if="!(email.isValid && message.isValid)"
      :class="{ errors: !(email.isValid && message.isValid) }"
    >
      Please enter a valid email and not empty message!
    </p>
    <div class="actions">
      <base-button type="submit">Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
    };
  },
  methods: {
    clearValidation(input) {
      if (this[input].val.length > 0) {
        this[input].isValid = true;
      }
    },
    submitForm() {
      this.formIsValid = true;
      if (
        this.email.val === '' ||
        !this.email.val.includes('@') ||
        this.message.val === ''
      ) {
        this.email.isValid = false;
        this.message.isValid = false;
        return;
      }
      this.$store.dispatch('requests/contactCoach', {
        email: this.email.val,
        message: this.message.val,
        coachId: this.$route.params.id,
      });
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
