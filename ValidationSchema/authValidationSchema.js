import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
    fullName: Yup.string().min(2).max(30).matches(/^[a-zA-Z ]*$/, "Name can only include letters a-z A-Z and spaces").required("Please enter your Full Name"),
    email: Yup.string().email().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email, must include @ and dot(.)").required("Please enter your Email"),
    password : Yup.string().min(6).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,"Must contain at least one uppercase letter, one lowercase letter, and one digit").required("Please enter your Password"),
    confirmPassword : Yup.string().oneOf([Yup.ref("password"), null], "Password must match").required("Confirm Password is required")    
})
    

export const signInSchema = Yup.object().shape({
    email: Yup.string().email().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter valid email, must include @ and dot(.)").required("Please enter your Email"),
    password : Yup.string().min(6).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,"Must contain at least one uppercase letter, one lowercase letter, and one digit").required("Please enter your Password"),
})


// Must contain at least one uppercase letter, one lowercase letter, one digit, and one special character @ $ ! % * ? &
//--> /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/