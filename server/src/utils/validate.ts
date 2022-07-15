import { UserInput } from "src/types";

export const validateRegister = (options: UserInput) => {
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }

    if (options.username.length <= 2) {
        return [
            {
                field: "username",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.firstname.length <= 2) {
        return [
            {
                field: "firstname",
                message: "length must be greater than 2",
            },
        ];
    }
    if (options.lastname.length <= 2) {
        return [
            {
                field: "lastname",
                message: "length must be greater than 2",
            },
        ];
    }

    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                message: "cannot include an @",
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