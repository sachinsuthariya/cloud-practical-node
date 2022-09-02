import bcryptjs = require("bcryptjs");
import { Request, Response } from "express";
import _ = require("lodash");
import { Constants } from "../../../config/constants";
import { Jwt } from "../../../helpers/jwt";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { AuthUtils } from "./authUtils";
import { Utils } from "../../../helpers/utils";

export class AuthController {
    private authUtils: AuthUtils = new AuthUtils();

    public signup = async (req: any, res: Response) => {
        try {
            // encrypt password
            // const password = this.authUtils.pwdGenrator()
            const password = req.body.password;
            req.body.password = bcryptjs.hashSync(password.toString(), Constants.PASSWORD_HASH);
            req.body.userId = Utils.genUUID()
            
            const result = await this.authUtils.createUser(req.body);

            // JWT token
            const userDetails: any = {
                token: Jwt.getAuthToken({ id: result.userId }),
                email: req.body.email,
                userId: result.userId,
            };
            
            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS"), userDetails);
            return res.status(response.code).json(response);
        } catch (err) {            
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }

    // Admin login
    public login = async (req: any, res: Response) => {
        try {            
            const data = {
                    id: req.body._authentication.userId,
                    email: req.body._authentication.email,
                    token: Jwt.getAuthToken({ id: req.body._authentication.userId }),
            };

            const response = ResponseBuilder.genSuccessResponse(Constants.SUCCESS_CODE, req.t("SUCCESS_LOGIN"), data);
            return res.status(response.code).json(response);
        } catch (err) {            
            const response = ResponseBuilder.genErrorResponse(Constants.INTERNAL_SERVER_ERROR_CODE, req.t("ERR_INTERNAL_SERVER"));
            return res.status(response.error.code).json(response);
        }
    }
}