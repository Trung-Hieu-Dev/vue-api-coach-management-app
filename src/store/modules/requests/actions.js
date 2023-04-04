export default {
  //Post HTTP
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

  //Fetch HTTP
  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;

    //authenticated register coach
    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-api-coach-management-app-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Fail to fetch request!');
      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        email: responseData[key].email,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
