import createError from "../utils/create-error.js"
import catchError from "../utils/catch-error.js"
import * as jwtService from "../services/jwt-service.js"
import * as userService from "../services/user-service.js"

const authenticate = catchError(async (req,res,next) => {
    const authorization = req.headers.authorization;
    if(!authorization || !authorization.startsWith('Bearer ')) {
        createError('Invalid authorization header', 401);
    }
    const token = authorization.split(' ')[1];
    const decodedPayload = jwtService.verify(token);
    // console.log(decodedPayload);

    const user = await userService.getUserById(decodedPayload.userId);
    if(!user) {
        createError('user was not found', 401);
    }
    delete user.password;
    req.user = user;
    next()
})

export default authenticate;