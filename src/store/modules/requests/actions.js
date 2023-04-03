export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString,
      // coachId: payload.coachId,
      email: payload.email,
      message: payload.message,
    };

    //post the request to server
    const response = await fetch(
      `https://vue-api-coach-management-app-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POsT',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = response.json();

    // console.log(responseData);

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    if (!response.ok) {
      const error = new Error(response.message || 'Fail to send request!');
      throw error;
    }

    context.commit('addRequest', responseData);
  },
};
