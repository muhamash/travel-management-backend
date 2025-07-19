import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { IsActive, Role } from "../../modules/user/user.interface";
import { User } from "../../modules/user/user.model";
import { envStrings } from "../env.config";

// for credential login
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async ( req, email, password, done ) =>
        {
            try
            {
                const user = await User.findOne( { email } );

                if ( !user )
                {
                    return done( null, false, { message: "Invalid email or password" } );
                }

                if ( user.isDeleted )
                {
                    return done( null, false, { message: "User is deleted" } );
                }

                const thirdPartyAuths = user.auths?.some( ( auth ) => auth.provider === "credential" );

                if ( !password || !user.password || thirdPartyAuths )
                {
                    return done( null, false, { message: "Login with third party not allowed" } );
                }

                if ( user.isActive === IsActive.INACTIVE || user.isActive === IsActive.BLOCKED )
                {
                    return done( null, false, { message: `User is ${user.isActive.toLowerCase()}` } );
                }

                const isMatch = await bcrypt.compare( password, user.password );

                if ( !isMatch )
                {
                    return done( null, false, { message: "Invalid email or password" } );
                }

                return done( null, user );
            } catch ( err )
            {
                return done( err );
            }
        }
    )
);


passport.use(
    new GoogleStrategy(
        {
            clientID: envStrings.GOOGLE_CLIENT_ID,
            clientSecret: envStrings.GOOGLE_CLIENT_SECRET,
            callbackURL: envStrings.GOOGLE_CALLBACK_URL
        }
        , async (accessToken, refreshToken, profile: Profile, done: VerifyCallback) =>
        {
            try 
            {
                console.log(profile)
                const email = profile.emails?.[ 0 ].value;

                if ( !email )
                {
                    return done(null, false, {message: "No email found!!"})
                }

                let user = await User.findOne( { email } );

                if ( !user )
                {
                    user = await User.create( {
                        name: profile.displayName,
                        email,
                        picture: profile.photos[ 0 ]?.value,
                        role: Role.USER,
                        isVerified: true,
                        auths: [
                            {
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    } )
                    
                    console.log( user );
                }

                return done( null, user );

            }
            catch ( error: unknown )
            {
                console.log( "Google Strategy error, ", error );
                
                return done(error)
            }
        }
    )
);

passport.serializeUser( ( user: Express.User, done: ( error: unknown, id?: unknown ) => void ) =>
{
    console.log("serializing the user", user)
    done( null, user._id );
} );

passport.deserializeUser( async ( id: string, done: unknown ) =>
{
    try
    {
        console.log( id );
        const user = await User.findById( id )
        
        done( null, user );
        
    } catch ( error )
    {
        console.log(error)
        done(error)
    }
} );