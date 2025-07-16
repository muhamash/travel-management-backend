import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { Role } from "../modules/user/user.interface";

export const isZodError = ( error: unknown ): error is { issues: unknown[] } =>
{
    return error && typeof error === "object" && "issues" in error && Array.isArray( error.issues );
};

export function parseZodError(error: unknown): unknown[] {
  if (!(error instanceof ZodError)) return [];

  const formatted = error.format();
  const issues: unknown[] = [];

  for (const key in formatted) {
    if (key === "_errors") continue;

    const fieldErrors = formatted[key]?._errors;
    if (fieldErrors && fieldErrors.length > 0) {
      fieldErrors.forEach((msg : string) => {
        issues.push({
          field: key,
          message: msg,
        });
      });
    }
  }

  return issues;
};

export const generateToken = ( payload: unknown, secret: string, options?: jwt.SignOptions ) =>
{
  return jwt.sign( payload as unknown, secret, options );
};

export const verifyToken = ( token: string, secret: string ) =>
{

  const verifiedToken = jwt.verify( token, secret );

  return verifiedToken
};

export const isAllowedToUpdate = ( currentRole: string, currentUserId: string, targetRole: string, targetUserId: string ) =>
{
  if ( currentRole === Role.SUPER_ADMIN )
  {
    if ( targetRole === Role.SUPER_ADMIN && currentUserId !== targetUserId )
    {
      return false;
    }
    return true;
  }

  if ( currentRole === Role.ADMIN )
  {
    if ( currentUserId === targetUserId )
    {
      return true;
    }
    if ( targetRole === Role.ADMIN || targetRole === Role.SUPER_ADMIN )
    {
      return false;
    }
    return true;
  }

  if ( [ Role.USER, Role.GUIDE ].includes( currentRole ) )
  {
    return currentUserId === targetUserId;
  }

  return false;
};