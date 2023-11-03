import securityConstants from "../security/securityConstants.js";

const success = (response, message, status = 200) => {
    response.status(status).send(message);
}

const error = (response, message, detail, status = 500) => {
    console.log(detail)
    response.status(status).send(message);
}

const signin = (request, response, status = 500) => {
    response.setHeader("Access-Control-Expose-Headers", "Authorization, userId");
    response.setHeader("userId", request.user.userId);
    response.setHeader(securityConstants.HEADER_STRING, securityConstants.TOKEN_PREFIX + request.authInfo);
    response.status(status).send("");
}

export default { success, error, signin };