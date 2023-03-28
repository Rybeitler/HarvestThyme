
import axios from 'axios'
import useAuth from './useAuth';

const UseRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async ()=>{
        const response = await axios.get('http://localhost:8000/api/refresh', {withCredentials:true})

        setAuth(prev=>{
            // console.log(JSON.stringify(prev))
            // console.log(response.data.userToken)
            return {
                ...prev, 
                user:response.data.user,
                accessToken:response.data.accessToken
            }
        })
        return response.data.accessToken
    }
    return refresh;
}

export default UseRefreshToken;
