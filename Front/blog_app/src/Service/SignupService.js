import axios from "axios";

let baseUrl = process.env.REACT_APP_API_BASE_URL;

const SignupService = {
    sign_up: async(name,username,password,phone,email)=>{
        try{
            const response1 = await axios.post(`${baseUrl}/users/register`, {
                name: name,
                username: username,
                password: password,
                phone: phone,
                email: email,
              })
              return response1;
        }
        catch(error){
            console.log(error)
        }
    }
}
export default SignupService;