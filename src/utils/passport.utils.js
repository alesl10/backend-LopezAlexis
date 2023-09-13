import passport from 'passport';

const passportCall = (req, res, method) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(method, (err, user, info) => {
      if (err) reject(err);
      if (user) {
        req.session.user = user;
        resolve(user);
      }
      reject(info);
    })(req, res);
  });
}

export default passportCall;