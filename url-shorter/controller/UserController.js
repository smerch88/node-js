import userService from "../services/userService.js";

async function getAllUsersPage(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.render("users", { users });
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { name, password } = req.body;
        const created_time = Date.now();

        userService.addUser(name, password, created_time);

        const newUser = { name, password, created_time };

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        next(error);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export { getAllUsers, createUser, getAllUsersPage }