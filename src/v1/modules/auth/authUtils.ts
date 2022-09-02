import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";
import { SqlUtils } from "../../../helpers/sqlUtils";
import * as pwdGenerator from "generate-password";

export class AuthUtils {
    public sqlUtils: SqlUtils = new SqlUtils();

    // Create Admin
    public createUser(userDetail: Json) {
        return My.insert(Tables.USER, userDetail);
    }

    public checkUserExist(params) {
        let where =`email = '${params.email}'`;
        return My.first(Tables.USER, ["userId", "email", "password"], where)
    }

    // get user detail by id
    public getUserById(userId) {
        const field = ["userId, email, password"];
        return My.first(Tables.USER, field, 'userId = ?', [userId]);
    }

    public pwdGenrator() {
        return pwdGenerator.generate({
            length: 10,
            numbers: true,
            symbols: false,
        });
    }

}