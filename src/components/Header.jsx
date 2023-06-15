import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginPopup from "./LoginPopup";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, logout } from "../features/authenticationSlicer";
import { isAdmin, logoutAdmin, } from "../features/adminSlicer";
function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const admin = useSelector(state => state.adminAuth.isAdmin)
    const login = useSelector(state => state.auth.isLogin)

    let [hideNav, setHidenav] = useState('none')
    let [loginPopup, setLoginPopup] = useState(false)



    //logout
    const logoutHandler = () => {
console.log('hfghfghfghf');

        dispatch(logout())
console.log('hfghfghfghf');
        navigate('/')
    }
    const LogoutAdmin=()=>{
        dispatch(logoutAdmin())
    }
    const loginPopupHandler = () => {
        setLoginPopup(prev => {
            if (prev == false) {
                return true
            } else {
                return false
            }
        })
    }
    return (
        <div className="container  mx-auto p-2 relative">

            <div className="flex justify-between p-5 items-center shadow-md ">
                <h1 className="text-3xl font-bold ">Agency</h1>

                {admin ? (
                    <>
                        <ul className="hidden md:flex gap-5 font-bold ml-auto" >
                            <li><Link to='/admin'>Dashboard</Link></li>
                        </ul>
                        <h1 className="ml-auto text-4xl font-bold">admin</h1>
                        <button onClick={LogoutAdmin} className="ml-5 px-2 py-1 rounded-md text-white bg-red-500 shadow-md hover:shadow-xl">Logout</button>

                    </>
                ) : (
                    <>
                        <ul className="hidden md:flex gap-5 font-bold ml-auto">
                            <li><Link to='/'>home</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><Link to='/about'>About</Link></li>
                            {login == true ? (<li onClick={() => logoutHandler()}><Link >logout</Link></li>) :
                                (<li onClick={() => loginPopupHandler()}><Link >Login</Link></li>)
                            }
                        </ul>

                        <button onClick={() => {
                            setHidenav(prev => {
                                if (prev == 'none') {
                                    return 'inline'
                                } else {
                                    return 'none'
                                }
                            })
                        }} className="md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                            </svg>
                        </button>
                    </>
                )}

            </div>

            <div style={{ display: `${hideNav}`, transition: '0.6s' }} className={`fixed rounded text-black h-screen z-10 bg-purple-200 py-20 px-20 top-5 right-0 drop-shadow-lg md:hidden`}>
                <ul className="flex flex-col gap-10  md:hidden">
                    <li><Link to='/'>home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    {login == true ? (<li onClick={() => logoutHandler()}><Link >logout</Link></li>) :
                        (<li onClick={() => loginPopupHandler()}><Link >Login</Link></li>)
                    }


                </ul>
                <button onClick={() => {
                    setHidenav(prev => {
                        if (prev == 'none') {
                            return 'inline'
                        } else {
                            return 'none'
                        }
                    })
                }} className="absolute top-2 left-2 bg-purple-300 rounded-md py-1 px-2 border border-purple-500">close</button>
            </div>

            {loginPopup && <LoginPopup loginPopupHandler={loginPopupHandler} />}


        </div>




    );
}

export default Header;
