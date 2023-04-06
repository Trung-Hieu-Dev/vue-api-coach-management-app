export default {
  //login
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  //Signup
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },

  //auth logic
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA-oB_MMNwul2RngQdCzIQpXMzUUIBDnQo';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA-oB_MMNwul2RngQdCzIQpXMzUUIBDnQo';
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    //server validation
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to Authenticated'
      );
      throw error;
    }

    //store token to local storage to prevent loosing login status when page reloaded
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },

  //Logout
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
