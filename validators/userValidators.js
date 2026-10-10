import {z} from "zod";

//name age email password
export const signupSchema = z.object({
    name : 
        z.string()
        .trim()
        .min(3 , "Minimum length of name should be 3")
        .max(30, "maximum length of name is 30"),

    age :
        z.number()
        .min(10 , "Minimum age should be 10")
        .max(100 , "maximum age should be 100")
        .optional(),
    
    email : z.preprocess( 
            (value)=> typeof value == "string" ? value.trim().toLowerCase() : "",
            z.email("email must be valid")
    ),
    password : z.string()
        .min(8 , "minimum lenght must be 8 char")
        .max(30)
        .regex(/[A-Z]/ , "must have a capital alphabet")
        .regex(/[a-z]/ , "Must have a small alphabet")
        .regex(/[0-9]/ , "Must have a number")
        .regex(/[@!~#$%^&*()<>?:,.{}_+]/ , "Must have a Special character")
    });
    
    
export const loginSchema = z.object({
    email : z.preprocess( 
            (value)=> typeof value == "string" ? value.trim().toLowerCase() : "",
            z.email("Email must be valid")
    ),
    password : z.string()
        .min(8 , "minimum lenght must be 8 char")
        .max(30)
        .regex(/[A-Z]/ , "must have a capital alphabet")
        .regex(/[a-z]/ , "Must have a small alphabet")
        .regex(/[0-9]/ , "Must have a number")
        .regex(/[@!~#$%^&*()<>?:,.{}_+]/ , "Must have a Special character")
    
});