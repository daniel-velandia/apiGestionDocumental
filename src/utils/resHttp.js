import securityConstants from "../security/securityConstants.js";

const success = (res, message, status = 200) => {
    res.status(status).send(message);
}

const error = (res, message, detail, status = 500) => {
    console.log(detail)
    res.status(status).send(message);
}

const login = (req, res, status = 500) => {
    res.setHeader("Access-Control-Expose-Headers", "Authorization, userId");
    res.setHeader("userId", req.user.userId);
    res.setHeader(securityConstants.HEADER_STRING, securityConstants.TOKEN_PREFIX + req.authInfo);
    res.status(status).send("");
}

export default { success, error, login };