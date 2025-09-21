import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User, IUser } from "../../models/UserModel";
import { STATUS_CODES, ERROR_CODES } from "../../utils/errorCodes";
import { hash } from "bcryptjs";


export const userRegister = async (req: Request, res: Response): Promise<void> => {
    try {

        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            res.status(STATUS_CODES.BAD_REQUEST).json({
                ...ERROR_CODES.MISSING_FIELDS
            });
        }

        const existing = await User.findOne({ email });

        if (existing) {
            res.status(STATUS_CODES.CONFLICT).json({
                ...ERROR_CODES.USER_EXISTS
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email: email,
            username: username,
            password: hashedPassword,
        })

        newUser.save();

        res.status(STATUS_CODES.CREATED).json({ 
            success: true,
            message: "Registration Successful",
        })

    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            ...ERROR_CODES.INTERNAL_ERROR
        });
    }
}
 