const { User } = require('../models/');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;

    User.create({ name, email, password })
      .then(newUser => {
        res.status(201).json({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        })
      })
      .catch(err => {
        next(err);
      })
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({ 
      where: { email }
    })
      .then(user => {
        if (!user) throw { name: 'Error400', status: 400, msg: 'Invalid email or password. Please try again!'};
        
        const resultComparePass = comparePassword(password, user.password);

        if (!resultComparePass) throw { name: 'Error400', status: 400, msg: 'Invalid email or password. Please try again!'};

        const access_token = generateToken({
          id: user.id,
          name: user.name,
          email: user.email
        });

        res.status(200).json({ id: user.id, name: user.name, email: user.email, access_token });
      })
      .catch(err => {
        next(err);
      })
  }

  static googleLogin(req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    let name;
    let email;
    let isExist = false;

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        const payload = ticket.getPayload();
        console.log(payload);
        name = payload.name;
        email = payload.email;
        return User.findOne({ where: { email } })
      })
      .then(user => {
        if (user) {
          isExist = true;
          return user;
        } else {
          return User.create({
            name,
            email,
            password: process.env.DEFAULT_PASSWORD_GOOGLE
          })
        }
      })
      .then(user => {
        const access_token = generateToken({
          id: user.id,
          name: user.name,
          email: user.email
        })

        if (isExist) {
          res.status(200).json({ id: user.id, name: user.name, email: user.email, access_token });
        } else {
          res.status(201).json({ id: user.id, name: user.name, email: user.email, access_token });
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController;