import { UserInput, QuizCheckInput } from "../types";

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

export const validateCheckQuiz = (options: QuizCheckInput) => {

    if (!options.id) {
        return [
            {
                field: "id",
                message: "Missing id parameter",
            },
        ];
    }
    if (!options.publicId) {
        return [
            {
                field: "publicId",
                message: "Missing id parameters",
            },
        ];
    }

    if (typeof options.response == "undefined") {
        return [
            {
                field: "response",
                message: "Missing response parameter",
            },
        ];
    }
    else if (typeof options.response !== "boolean") {
        return [
            {
                field: "response",
                message: "Response parameter must be Boolean value",
            },
        ];
    }
    return null
}