import { Request, Response } from "express";
import { TResponse } from "./utils.type";

export const responseFunction = <T> ( res: Request, data: TResponse<T> ) =>
{
    res.status( data.statusCode ).json( {
        message: data.message,
        statusCode: data.statusCode,
        meta: data.meta,
        data: data.data
    } );
}

export const setCookie = async (res: Response, cookieName: string, cookieData, maxAge: number): Promise<void> =>
{
    res.cookie( cookieName, cookieData, {
        httpOnly: true,
        secure: false,
        maxAge
    } );
}