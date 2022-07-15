import { UserLoginInput } from "src/types";

export const validateLogin = (options: UserLoginInput) => {

    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "length must be greater than 2",
            },
        ];
    }

    if (options.password.length <= 2) {
        return [
            {
                field: "password",
                message: "length must be greater than 2",
            },
        ];
    }

    return null;
};