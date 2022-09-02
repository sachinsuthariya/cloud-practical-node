import { IsEmail, IsNotEmpty, Validate } from "class-validator";

import { Model } from "../../../model";
import { IsEmailAlreadyExistConstraint, IsPasswordMatchesRequirementsConstraint } from "./authValidators";

export class AuthModel extends Model {

    @IsNotEmpty()
    @IsEmail({}, { message: "EMAIL_INVALID" })
    @Validate(IsEmailAlreadyExistConstraint, {
        message: "ERR_EMAIL_ALREADY_EXISTS",
    })
    public email: string;

    @IsNotEmpty()
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
        } = body;

        this.email = email;
        this.password = password;
    }
}

export class AuthenticationModel extends Model {

    @IsNotEmpty()
    @IsEmail({}, { message: "EMAIL_INVALID" })
    public email: string;

    @IsNotEmpty()
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
        } = body;
        this.email = email;
        this.password = password;
    }
}

export class VerifyOtpModel extends Model {
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public otp: string;

    constructor(body: any) {
        super();
        const {
            email,
            otp,
        } = body;

        this.email = email;
        this.otp = otp;
    }
}

export class ForgotPasswordModel extends Model {
    @IsNotEmpty()
    public email: string;

    constructor(body: any) {
        super();
        const {
            email,
        } = body;

        this.email = email;
    }
}

export class ResetPasswordModel extends Model {
    @IsNotEmpty()
    @Validate(IsEmailAlreadyExistConstraint, {
        message: "ERR_ACCOUNT_NOT_EXISTS",
    })
    public email: string;

    @IsNotEmpty()
    public otp: string;

    @IsNotEmpty()
    @Validate(IsPasswordMatchesRequirementsConstraint, {
        message: "PASSWORD_WARNING",
    })
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            otp,
            password,
        } = body;

        this.email = email;
        this.otp = otp;
        this.password = password;
    }
}
