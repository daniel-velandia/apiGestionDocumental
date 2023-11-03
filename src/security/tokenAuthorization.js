import { ExtractJwt, Strategy } from "passport-jwt";
import { variables } from "../utils/variables.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: variables.SECRET_TOKEN
}

const jwtStrategy = new Strategy(options, (payload, callback) => {

    if(payload.sub != null) {
        callback(false, payload);
    } else {
        callback(null, {error: "Token invalido"});
    }
});

export default { jwtStrategy };