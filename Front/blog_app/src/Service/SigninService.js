import axios from "axios";

let baseUrl = process.env.REACT_APP_API_BASE_URL;

const SigninService = {
    sign_in: async(Email,Password)=>{
        try{
            const response1 = await axios.post(`${baseUrl}/users/loginUser`, {
            email: Email,
            password: Password,
        })
        return response1;
        }
        catch(error){
            console.log(error)
        }

    }
}
export default SigninService;