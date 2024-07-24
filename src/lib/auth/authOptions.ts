
import GoogleProvider from 'next-auth/providers/google'
import { db } from '../db/db';
import { users } from '../db/schema';
import { AuthOptions } from 'next-auth';

const clientId = "752602196518-f94pr75168ocm6mmqbc573vbpngdsbn8.apps.googleusercontent.com"
const clientSec = "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"
export const authOptions:AuthOptions = {
    providers:[
        GoogleProvider({
            clientId: clientId,
            clientSecret: clientSec,

            async profile(profile , token: any){
                console.log("profile" , profile);
                console.log("tokens" , token);


                const data = {
                    fname: profile.given_name,
                    lname: profile.family_name,
                    email: profile.email,
                    provider: 'GOOGLE',
                    externalId: profile.sub,
                    image: profile.picture,
                };

                try {

                    const user = await db
                        .insert(users)
                        .values(data)
                        .onConflictDoUpdate({ target: users.email, set: data })
                        .returning();

                    return {
                        ...data,
                        name: data.fname,
                        id: String(user[0].id),
                        role: user[0].role
                    }
                    
                } catch (error) {
                    console.log(error);
                    return {
                        id: ""
                    }

                    
                }
            }
        })
    ],
    callbacks: {
        session(data: any) {
            return data
        },
        jwt({token , user} : {token: any , user: any}){
            if(user){
                token.role = user.role,
                token.id = user.id
            }

            return token;
        }
    }
}