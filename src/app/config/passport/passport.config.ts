import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Role } from "../../modules/user/user.interface";
import { User } from "../../modules/user/user.model";
import { envStrings } from "../env.config";


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