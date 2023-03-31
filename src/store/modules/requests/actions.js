export default {
  contactCoach(context, payload) {
    const newRequest = {
      id: new Date().toISOString,
      coachId: payload.id,
      email: payload.email,
      message: payload.message,
    };
    context.commit('addRequest', newRequest);
  },
};
