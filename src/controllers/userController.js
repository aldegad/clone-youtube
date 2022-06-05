import User from "../models/user.model";

export const getJoin = (req, res, next) => res.render("Join", { pageTitle: "Join" });
export const postJoin = async(req, res, next) => {
    const { name, username, email, password, password2, location } = req.body;
    const emailExists = await User.exists({ email });
    const usernameExists = await User.exists({ username });
    if(emailExists) {
        return res.status(400).render("Join", { pageTitle: "Join", errorMessage: "This email is already taken." });
    }
    if(usernameExists) {
        return res.status(400).render("Join", { pageTitle: "Join", errorMessage: "This username is already taken." });
    }
    if(password !== password2) {
        return res.render("Join", { pageTitle: "Join", errorMessage: "Password confirmation does not match." });
    }
    try {
        const dbUser = await User.create({
            name, 
            username, 
            email, 
            password,
            location
        });
        console.log("✅ User Joined!", dbUser);
        return res.redirect("/login");
    }
    catch(e) {
        console.log("❌ User Join Error", e);
        return res.render("Join", { pageTitle: "Join", errorMessage: e });
    }
}
export const login = (req, res, next) => res.render("login", { pageTitle: "Login" });
export const logout = (req, res, next) => res.send("Log Out");
export const see = (req, res, next) => res.send("See user");
export const edit = (req, res, next) => res.send("Edit user");
export const deleteUser = (req, res, next) => res.send("Remove user");