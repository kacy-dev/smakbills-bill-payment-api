import { Request, Response, NextFunction } from 'express';
import { appError } from '../utils/appError';
import { ERROR_CODES, STATUS_CODES } from '../utils/errorCodes';


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof appError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.errorCode
        });
    }

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: ERROR_CODES.INTERNAL_ERROR.message,
        code: ERROR_CODES.INTERNAL_ERROR.code
    });
}