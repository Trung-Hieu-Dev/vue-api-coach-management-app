export default {
  registerCoach(state, payload) {
    state.coaches.unshift(payload);
  },
  // coaches server data
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
