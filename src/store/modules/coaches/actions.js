export default {
  registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userID,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    context.commit('registerCoach', coachData); // pass updated data to mutations
  },
};
