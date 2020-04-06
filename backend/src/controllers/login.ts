import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { jwtSecret } from '../config/config';
import { User } from '../models/User';

// @desc    User login
// @route   POST /
// @access  Public
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // check if user exists, return 401 if not
  const user = await User.findOne({ where: { username } });
  console.log(user);
  if (!user) {
    return res.status(401).json({
      error: 'user not found!'
    });
  }

  // check if password is correct, return 401 if not
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);
  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    });
  }

  // create user object for token
  const userForToken = {
    username: user.username,
    id: user.id
  };
  const token = jwt.sign(userForToken, jwtSecret, {
    // expiresIn: '1d'
  });

  // update last seen field
  const updatedUser = await User.update(
    { last_seen: new Date() },
    { where: { username } }
  );

  console.log(updatedUser);

  // response ok with token and username
  return res.status(200).send({
    token,
    username: user.username,
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    level: user.level,
    status: user.status
  });
};
