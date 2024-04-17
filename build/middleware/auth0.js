"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScopes = exports.checkJwt = void 0;
// visit auth0.com
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
exports.checkJwt = (0, express_oauth2_jwt_bearer_1.auth)({
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    audience: process.env.AUTH0_AUDIENCE,
});
exports.checkScopes = (0, express_oauth2_jwt_bearer_1.requiredScopes)("write:solutions");
