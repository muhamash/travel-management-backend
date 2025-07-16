import { Request } from "express";
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