import { NextFunction, Request, Response } from "express";

export interface TMeta
{
    total: number;
}

export interface TResponse<T>
{
    statusCode: number;
    data: T;
    message: string;
    success?: boolean;
    meta?: TMeta
}

export type AsyncHandlerType = ( req: Request, res: Response, next: NextFunction ) => Promise<void>;

export type ParsedZodIssue = Record<string, string>;
export type ErrorResponsePayload = Record<string, unknown>;