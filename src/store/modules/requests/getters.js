export default {
  //get requests per coacher
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    console.log(coachId);
    return state.requests.filter((req) => req.coachId === coachId);
  },
  //check request per coacher
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
