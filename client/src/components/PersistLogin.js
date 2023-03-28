import {Outlet} from 'react-router-dom'
import { useState, useEffect } from 'react'
import UseRefreshToken from '../hooks/UseRefreshToken'
import useAuth from '../hooks/useAuth'

const PersistLogin = ()=>{
    const [isLoading, setIsLoading] = useState(true);
    const refresh = UseRefreshToken()
    const {auth} = useAuth();

    useEffect(()=>{
        const verifyRefreshToken = async () =>{
            try{
                await refresh();
            }
            catch(err){
                console.log(err)
            }
            finally{
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken(): setIsLoading(false);
    },[])

    // useEffect(()=>{
    //     console.log(`isLoading:${isLoading}`)
    //     console.log(`at:${JSON.stringify(auth?.accessToken)}`)
    // },[isLoading])

    return (
        <>
            {
                isLoading
                    ?<p>Loading....</p>
                    :<Outlet/>
            }
        </>
    )
}

export default PersistLogin;

