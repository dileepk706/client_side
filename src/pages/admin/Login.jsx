import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { isAdmin } from "../../features/adminSlicer"
import { useDispatch } from "react-redux"

const AdminLoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const adminLoginHandler = async (e) => {
        console.log('entered');
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3001/admin/api/login', {
                email,
                password
            })
            const data = await res.data
            
            localStorage.setItem('isAdmin', data.isAdmin)
            localStorage.setItem('adminToken', 'Bearer ' + data.token)
            console.log(data);
            navigate('/admin')
            dispatch(isAdmin(true))
        } catch (error) {
            if (error.response && error.response.status !== 200) {
                console.log(error.response);
                setError(error.response.data.message)
            }

        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-md p-8">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                <h4 className="text-xl text-red-500 ">{error && `${error}`}</h4>
                <form onSubmit={adminLoginHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">E-mail</label>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            type="text"
                            id="email"
                            value={email}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                            placeholder="E-mail"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            value={password}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLoginPage
