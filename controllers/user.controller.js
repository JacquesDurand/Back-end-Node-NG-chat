const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
 * @api {get} /users Request All Users Informations
 * @apiName GetUsers
 * @apiGroup User
 * 
 * @apisuccess {json} names The list of the user users
 * @apisuccessExample Example data on success
 * HTTP/1.1 200
 * {
 *    {  "name" : "IPA" },
 *    {   "name": "Stout" }
 * }
 * 
 * @apiError UsersListNotFound The list was not found
 * @apiErrorExample {json} Error-response :
 * HTTP/1.1 404
 * {
 *      "error" : "ListNotFound"
 * }
 */

exports.users_get_all = (req, res, next) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(404).json({ error: "ListNotFound" })
        })
};

/**
 * @api {get} /users/id Request a User information by id
 * @apiName GetUsersById
 * @apiGroup User
 * 
 * @apiParam {Number} id The id of the requested User
 * 
 * @apisuccess {String} name The name of the user User
 * @apisuccessExample Example data on success
 * HTTP/1.1 200
 * {
 *    {  "name" : "IPA" }
 * }
 * 
 * @apiError UserNotFound The <code>id</code> of the User was not found
 * @apiErrorExample {json} Error-response :
 * HTTP/1.1 404
 * {
 *      "error" : "UserNotFound"
 * }
 */

exports.users_get_by_id = (req, res, next) => {
    let id = req.params.id;
    User.findAll({
        where: {
            id: id
        }
    })
        .then(user => {
            if (user.length !== 0) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ error: "UserNotFound" })
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
};

/**
 * @api {post} /users/add Add a User information 
 * @apiName User_Add
 * @apiGroup User
 * 
 * 
 * @apisuccess {string} name The name of the user User added
 * @apisuccessExample Example data on success
 * HTTP/1.1 201
 * {
 *    {  "name" : "IPA" }
 * }
 * 
 * @apiError UserExists This User already exists
 * @apiErrorExample {json} Error-response :
 * HTTP/1.1 500
 * {
 *      "error" : "UserExistsInDB"
 * }
 */

exports.user_add = (req, res, next) => {
    let name = req.body.name;
    User.findAll({
        where: {
            name: name
        }
    })
        .then(user => {
            if (user.length !== 0) {
                res.status(500).json({ error: "UserExistsInDB" })
            }
            else {
                User.create(req.body);
                res.status(201).json(req.body);
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })


};

/**
 * @api {delete} /users/delete/:id Delete a User information 
 * @apiName User_Delete
 * @apiGroup User
 * 
 * 
 * @apisuccess {string} name The name of the user User deleted
 * @apisuccessExample Example data on success
 * HTTP/1.1 201
 * {
 *    {  "name" : "IPA" }
 * }
 * 
 * @apiError UserNotExists This User does not exists
 * @apiErrorExample {json} Error-response :
 * HTTP/1.1 500
 * {
 *      "error" : "UserDoesNotExist"
 * }
 */

exports.user_delete_by_id = (req, res, next) => {
    let id = req.params.id;
    User.findByPk(id)
        .then(user => {

            if (user === null) {
                res.status(500).json({ error: "UserDoesNotExist" })
            }
            else {
                User.destroy({
                    where: {
                        id: id
                    }
                });
                res.status(201).json({ message: `The user of id ${id} has been successfully deleted` })

            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

/**
 * @api {put} /users/update/:id Update a User information 
 * @apiName User_Update
 * @apiGroup User
 * 
 * 
 * @apisuccess {json} User The new User updated
 * @apisuccessExample Example data on success
 * HTTP/1.1 201
 * {
        "id": 1,
        "name": "UserForce1",
        "degree": 10,
        "description": "Une chouette biere ... updated",
        "picture": "picture.jpg",
        "year": 2016,
        "createdAt": "2020-02-11T14:45:55.000Z",
        "updatedAt": "2020-02-11T14:47:53.000Z",
        "BreweryId": 1,
        "TypeId": 1
    }
 * 
 * @apiError UserNotExists This User does not exists
 * @apiErrorExample {json} Error-response :
 * HTTP/1.1 500
 * {
 *      "error" : "UserDoesNotExist"
 * }
 */

exports.user_update = (req, res, next) => {
    let id = req.params.id;
    let newUser = req.body;
    User.findByPk(id)
        .then(user => {

            if (user === null) {
                res.status(501).json({ error: "UserDoesNotExist" })
            }
            else {
                User.update(newUser, {
                    where: {
                        id: id
                    }
                });
                res.status(201).json(newUser);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "UserDoesNotExist" })
        })
}

exports.user_signin = (req, res, next) => {
    //je teste si l email est dans la base de donnees
    let email = req.body.email;
    User.findAll({
        where: {
            email: email
        }
    })
        .then(user => {
            if (user.length !== 0) {
                return res.status(409).json({ message: 'Ton email est deja utilise' });
            }
            //On ajoute le user
            bcrypt.hash(req.body.password, 10)
                .then(hashPassword => {

                    User.create({
                        name: req.body.name,
                        firstname: req.body.firstname,
                        email: email,
                        password: hashPassword,
                        birthday: req.body.birthday
                    })
                        .then(() => {
                            res.status(200).json({ message: "User successfully registered" })
                        })
                        .catch(error => {
                            res.status(500).json(error)
                        })
                })
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

exports.user_login = (req, res, next) => {
    let email = req.body.email;
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => {
            if (user !== null) {
                verifyPassword(user, req, res);
            }
            else {
                res.status(500).json({ message: "Mauvais email ou password" });
            }
        })
        .catch(error => {
            res.status(501).json(error);
        })
};

const verifyPassword = (user, req, res) => {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(500).json(err)
        else {
            if (result) return getToken(user, res)
            else return res.json({ message: "Authentification failed" });
        }
    })
};

const getToken = (user, res) => {
    const token = jwt.sign({ email: user.email, userId: user.id },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );
    res.json({user : user,
        token: token
    })

};

exports.change_password = (req, res, next) => {
    let id = req.params.id;
    User.findByPk(id)
        .then(user => {
            console.log(user);
            
            if (user === null) {
                res.status(404).json({ message: "Cet utilisateur n'existe pas" })
            }
            bcrypt.hash(req.body.password,10)
                .then(hashPassword => {
                    console.log(hashPassword);
                    
                    User.update({ password: hashPassword }, { where: { id: id } })
                        .then(result => {
                            res.status(201).json({ message: "Password successfully updated" })
                        })
                        .catch(error => {
                            res.status(500).json(error)
                        })
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        })
        .catch(error => {
            res.status(500).json(error)
        })
}
