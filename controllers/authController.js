import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'
import { attachCookiesToResponse, createTokenUser, sendVerificationEmail } from '../utils/index.js'
import crypto from 'crypto';


const register = async (req, res) => {
  const { name, email, password } = req.body

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });
  const origin = 'http://localhost:5000';
  // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app';

  // const tempOrigin = req.get('origin');
  // const protocol = req.protocol;
  // const host = req.get('host');
  // const forwardedHost = req.get('x-forwarded-host');
  // const forwardedProtocol = req.get('x-forwarded-proto');

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
  });
  // const tokenUser = createTokenUser(user)
  // attachCookiesToResponse({ res, user: tokenUser })
  //const token = user.createJWT()
  // res.status(StatusCodes.CREATED).json({
  //   user: {
  //     email: user.email,
  //     lastName: user.lastName,
  //     location: user.location,
  //     name: user.name,
  //   },
  //   token,
  //   location: user.location,
  // })


}
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
  //const user = await User.findOne({ email }).select('+password')
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid Credentials')
  }
  if (!user.isVerified) {
    throw new UnAuthenticatedError('Please Verify your email')
  }
  // const token = user.createJWT()
  // user.password = undefined
  // res.status(StatusCodes.OK).json({ user, token, location: user.location })
  const tokenUser = createTokenUser(user)
  console.log(tokenUser);
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location

  await user.save()

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logout!' })
}
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthenticatedError('Verification Failed');
  }
  if (user.verificationToken !== verificationToken) {
    throw new UnAuthenticatedError('Verification Failed');
  }
  user.isVerified = true,
    user.verified = Date.now();
  user.verificationToken = '';

  await user.save();

  res.status(StatusCodes.OK).json({
    msg: 'Email Verified'
  })
}

export { register, login, updateUser, logout, verifyEmail }
