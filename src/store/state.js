import jwt from 'jsonwebtoken';
import config from '../../config/development';
// const parseJwt = (token) => {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace('-', '+').replace('_', '/');
//   return JSON.parse(window.atob(base64));
// };
// const parseJwt = (token) => {

//   return jwt.verify(token, config.jwtSecret, (err, decoded) => {
//     if (err) {
//       return err
//     }
//     return decoded
//   })
// }

export const state = () => {
  try {
    let token = localStorage.token
    let decoded = jwt.verify(token, config.jwtSecret);
    let avatar = () => {
      if (decoded.avatar) {
        return ["../../public/uploads/" + decoded.avatar.filename]
      }
      return ""
    }
    return {
      user: {
        name: decoded.username, role: decoded.role, avatarSrc: avatar(), password: decoded.password, token: token
      }
    }
  }
  catch (err) {
    return { user: { name: '', role: "", avatarSrc: "", password: "", token: "" } }
  }



  // let token = localStorage.token
  // let identification = parseJwt(token)
  // if (identification.username) {
  //   return {
  //     user: { name: identification.username, role: identification.userRole, avatarSrc: identification.useravatar.filiname }
  //   }
  // }
  // return { user: { username: '', userRole: "", userAvatar: "", token: "" } }
}
