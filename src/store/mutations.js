

export const mutations = {
  // changeFlagClassActive (state) {
  //   state.flagClassActive = !state.flagClassActive
  // }
  authCheck(state, data) {
    console.log('here we go');
    let avatar = (user) => {
      if (user.avatar) {
        return "../../public/uploads/" + user.avatar.filename
      }
      return ""
    }

    state.user.name = data.user.username;
    state.user.role = data.user.role
    state.user.avatarSrc = avatar(data.user)
    state.user.token = data.token

  }
}