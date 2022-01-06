import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import InstagramProvider from "next-auth/providers/instagram";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials"

async function RefreshToken(refreshToken) {
    try {
        const url = `${process.env.API_BASE_URL}/user/refresh`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: refreshToken}),
            method: 'POST'
        })

        const responseData = await response.json()

        if (!response.ok) {
            throw response.statusText;
        }
        const user = responseData.user;
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            access_token: responseData.token,
            refresh_token: responseData.refresh_token,
            picture: user.picture,
            refresh_time: Date.now() + process.env.REFRESH_TOKEN_MIN * 1000 * 60,
        }
    } catch (error) {
        console.error(error.message)
        return {
            token: null,
            error: error,
        }
    }
}

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
        }),
        LinkedInProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: "E-Mail", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch(process.env.API_SIGNIN_URL, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({email: credentials.email, password: credentials.password}),
                    })

                    if (res.ok) {
                        const apiUser = await res.json();
                        const user = {
                            id: apiUser.user.id,
                            email: apiUser.user.email,
                            name: apiUser.user.first_name,
                            access_token: apiUser.token,
                            image: apiUser.user.image,
                            role: apiUser.user.role,
                            first_name: apiUser.user.first_name,
                            last_name: apiUser.user.last_name,
                            refresh_token: apiUser.refresh_token,
                        }
                        return user
                    }
                    return null
                } catch (e) {
                    return null
                }
            }
        })

    ],
    pages: {
        signIn: '/signin',
        signOut: '/auth/signout',
        error: '/signin', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },
    // debug: true,
    events: {},
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            if (user) {
                token.id = user.id;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.role = user.role;
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
                token.picture = user.picture;
                token.refresh_time = Date.now() + process.env.REFRESH_TOKEN_MIN * 1000 * 60;
            }
            if (token.refresh_time < Date.now()) {
                token = await RefreshToken(token.refresh_token);
            }
            return token
        },
        async session({session, token}) {
            if (session && token) {
                if (!token.error) {
                    session.user = {
                        id: token.id,
                        first_name: token.first_name,
                        last_name: token.last_name,
                        role: token.role,
                        access_token: token.access_token,
                        picture: token.picture,
                    }
                    return session
                }
            }
            return null
        }
    },
    debug: false,
})
