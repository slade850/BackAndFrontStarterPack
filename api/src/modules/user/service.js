import bcrypt from "bcrypt";
import userQueries from "./query";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

const userService = {
    register: (body) => {
        return new Promise((resolve, reject) => {
            let { email, pseudo, password, passConfirm } = body;
             console.log("*****body ***", body);
            if (
            typeof email !== "string" ||
            typeof pseudo !== "string" ||
            typeof password !== "string" ||
            typeof passConfirm !== "string"
            ) {
        reject({ status: 400, message: "please enter a string in all fields" });
        }
        if (password === passConfirm) {
            let id = uuidv4();
            bcrypt.genSalt()
                .then((salt) => bcrypt.hash(password, salt))
                .then((hashedPassword) =>
                userQueries.register({ id, email, pseudo, hashedPassword })
            )
            .then((user) => resolve({ status: 201, message: "new user created" }))
            .catch((err) => {
                console.log(err);
                if(err.sqlMessage.includes('pseudo')){
                    reject({ status: 401, message: "this pseudo already used!" })
                } else if(err.sqlMessage.includes('email')){
                    reject({ status: 401, message: "this email already used!" })
                } else {
                    reject({ status: 401, message: "an error occurred" })
                }
            });
        } else {
            reject({ status: 400, message: "unmatched password" });
        }
        });
    },
    login: (body) => {
        return new Promise((resolve, reject) => {
            let { login, password } = body;
            if (typeof login !== "string" || typeof password !== "string") {
                reject({ status: 400, message: "please enter a string in all fields" });
            }
            userQueries.login(login)
                .then((result) => {
                    if (bcrypt.compareSync(password, result.password)) {
                        let token = jwt.sign({ id: result.id, pseudo: result.pseudo, role: result.role },
                                    process.env.SECRET_TOKEN,
                                    { expiresIn: 3600 }
                                    );
                resolve({
                    status: 200,
                    message: "user is logged in",
                    user: result,
                    token: token,
                });
            }
            reject({ status: 401, message: "wrong password entered" });
            })
            .catch((err) =>
                reject({
                    status: 401,
                    message: "login error, reverify your information",
                })
            );
        });
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            userQueries.getUser(id)
            .then(result => {
                let { password, ...user } = result[0];
                resolve({
                    status: 200,
                    message: "user found",
                    user: user
                })
            })
            .catch(err => reject({
                status: 400,
                message: "user not found",
            }))
        })
    },
};

export default userService;