import express from "express";
import { auth } from "../../middleWare/auth.js";
import { validation } from "../../middleWare/validation.js";
import { fileUpload } from "../../utilities/upload/fileUpload.js";
import * as controllers from "../userModule/userController/user.controller.js"
import { loginSchema, signupSchema } from "./user.validation.js";
export const userRouter = express.Router();

//-- register --//
userRouter.post("/signup",fileUpload(),validation(signupSchema),controllers.signup)
//-- verify mail --//
userRouter.get("/verify/:token",controllers.verify)
//-- login --//
userRouter.post("/signIn",validation(loginSchema),controllers.signIn)
//-- update data --//
userRouter.put("/update",auth,controllers.updateData)
//-- delete user --//
userRouter.delete("/delete",auth,controllers.deleteData)
//-- soft delete --//
userRouter.delete("/softDeleted",auth,controllers.softDeleted)
//-- change password when was login  --//
userRouter.put("/changePassword",auth,controllers.changePassword)
//-- forget password --//
userRouter.post("/forgetPassword",controllers.forgetPassword)
//-- handel forget password --//
userRouter.get("/resetPassword/:token",controllers.resetPassword)
//-- logout --//
userRouter.put("/logOut",auth,controllers.logOut)