import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";


env.config();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;
app.use(express.static('public'));

const db = new pg.Client({
    connectionString: "",
    ssl: { rejectUnauthorized: false },
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "l")));
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

passport.use(new Strategy({ usernameField: 'email', passwordField: 'password' }, async(email, password, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) return done(null, false, { message: "User not found" });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return done(null, false, { message: "Wrong password" });

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    console.log("Serializing user:", user.id);
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = result.rows[0];

        if (!user) return done(null, false);
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
};
import adminRoutes from "./admin.js";
adminRoutes(app, db, isAuthenticated, __dirname);