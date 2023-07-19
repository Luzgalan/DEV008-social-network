import { P as Ph, G as GoogleAuthProvider, g as getAuth, a as app, h as signInWithPopup, i as signInWithEmailAndPassword, p as pf, _ as _h, R as Rl, b as bl, d as df } from "./firebase.4377bee5.js";
const db = Ph(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const createUser = (name, email, photoUrl) => {
  pf(_h(db, "usuarioPrueba"), {
    name,
    email,
    photoUrl
  }).catch((error) => {
    throw error;
  });
};
const getUserByEmail = (email) => {
  const q = Rl(_h(db, "usuarioPrueba"), bl("email", "==", email));
  return df(q).then((arrayConsulta) => {
    return arrayConsulta;
  }).catch((error) => {
    throw error;
  });
};
const loginWithGoogle = () => {
  return signInWithPopup(auth, provider).then((userCredential) => {
    const token = userCredential._tokenResponse.oauthIdToken;
    localStorage.setItem("accessToken", token);
    const user = userCredential.user;
    localStorage.setItem("email", userCredential.user.email);
    return getUserByEmail(user.email).then((consulta) => {
      if (consulta.docs.length === 0) {
        createUser(user.displayName, user.email, user.photoURL);
      }
      return true;
    }).catch((error) => {
      throw error;
    });
  }).catch((error) => {
    throw error;
  });
};
const loginWithPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const token = userCredential.user.accessToken;
    localStorage.setItem("accessToken", token);
    const mail = userCredential.user.email;
    localStorage.setItem("email", mail);
    return true;
  }).catch((error) => {
    throw error;
  });
};
export {
  loginWithPassword as a,
  loginWithGoogle as l
};
