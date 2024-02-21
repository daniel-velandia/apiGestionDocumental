import passport from "passport";
import resHttp from "./resHttp.js";

const jwtMiddleware = passport.authenticate('jwt', { session: false });

const localMiddleware = passport.authenticate("local", {session: false});

const sessionMiddleware = (req, res, next) => {
    if(!req.user.error) {
        next();
    } else {
        resHttp.error(res, "", req.user.error, 403);
    }
}

export { jwtMiddleware, localMiddleware, sessionMiddleware };