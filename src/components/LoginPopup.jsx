import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {useDispatch, useSelector } from "react-redux"
import { isLogin } from "../features/authenticationSlicer"

const LoginPopup = ({ loginPopupHandler }) => {
    const updateHandler = () => {

    }
    
    const dispatch=useDispatch()
    let [signuppopup, setSignupPop] = useState(false)
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [name,setUserName]=useState('')
    let [error,setError]=useState('')
    
    const login=useSelector(state=>state.auth.isLogin)

    
    const loginHelper = async() => {

        try {
            const res = await axios.post('http://localhost:3001/api/login',{
                email,
                password
            })
            const data=await res.data
            if(!data){
        console.log('error',);

            }
            console.log('data',data);
            localStorage.setItem('token','Bearer '+data.token)
            loginPopupHandler()
            dispatch(isLogin())
        } catch (error) {
        console.log(error);

            if(error.response && error.response.data) setError(error.response.data.message)
        }
    }

    const signupHandler=async()=>{
        try {
            const res = await axios.post('http://localhost:3001/api/signup',{
                email,
                password,
                name
            })
            const data=await res.data
            
            if(data) {
                alert(data.messaage)
                setEmail('')
                setPassword('')
                setPassword('')
                setError('')
                setSignupPop(false)
            }
        } catch (error) {

            setError(error.response.data.message)
        }
    }

    useEffect(()=>{

    })


    return (

        <div className=" absolute top-0 w-screen h-screen flex justify-center items-center">
            <div className=" w-5/6 md:w-2/6 h-4/6 z-50 fixed bg-purple-400 rounded-md shadow-lg shadow-black pt-20 px-5">
                <h1 className="my-3 text-2xl font-bold">{signuppopup ? 'Signup' : 'Login'}</h1>
                {error&&<p className="text-xl text-red-600 ">{error}</p>}
                
                {signuppopup && (<input
                    type="text"
                    name="name"
                    placeholder="User name"
                    value={name}
                    onChange={(e)=>setUserName(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />)}
                <input
                    onChange={(e)=>setEmail(e.target.value)}
                    type="text"
                    name="email"
                    value={email}
                    placeholder="E-mail"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <input
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    type="text"
                    name="password"
                    placeholder="password"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                {signuppopup ? (<button
                    onClick={signupHandler}
                    className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 border border-purple-800"
                >signup</button>) :
                    (
                        <button
                            onClick={loginHelper}
                            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 border border-purple-800"
                        >
                            Login
                        </button>
                    )}

                <br />
                <button onClick={() => {

                    setSignupPop(prev => {
                        if (prev == false) {
                            return true
                        } else {
                            return false
                        }
                    })
                }}>{!signuppopup ? 'Or create a Acoount' : 'Login into existing Account'}</button>


                <button
                    onClick={loginPopupHandler}
                    className="absolute top-2 left-2 bg-purple-500 text-white px-2 rounded hover:bg-purple-600 border border-purple-800"
                >close</button>
            </div>
        </div>
    )
}
export default LoginPopup