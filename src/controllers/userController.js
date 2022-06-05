import User from "../models/user.model";
import bcrypt from 'bcrypt';

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
        return res.status(400).render("Join", { pageTitle: "Join", errorMessage: e });
    }
}


export const getLogin = (req, res, next) => res.render("login", { pageTitle: "Login" });
export const postLogin = async(req, res, next) => {
    const pageTitle = "Login";
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) {
        return res.status(400).render("login", { pageTitle, errorMessage: "An account with this username does not exist." });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) {
        return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password." });
    }
    
    return res.redirect("/");
}


export const logout = (req, res, next) => res.send("Log Out");


export const see = (req, res, next) => res.send("See user");
export const edit = (req, res, next) => res.send("Edit user");
export const deleteUser = (req, res, next) => res.send("Remove user");