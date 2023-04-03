export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    //send coach to database on backend server
    const response = await fetch(
      `https://vue-api-coach-management-app-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
      }
    );

    // const responseData = response.json();

    if (!response.ok) {
      //error...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    }); // pass updated data to mutations
  },
};
