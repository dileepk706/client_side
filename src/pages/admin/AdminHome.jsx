import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import loder from '../../assets/34338d26023e5515f6cc8969aa027bca_w200.gif'

const AdminHome = () => {
    const navigate = useNavigate()
    let [data, setData] = useState([])
    let [isLoading, setIsLoading]=useState(false)

    const getAllUsers = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get('http://localhost:3001/admin', {
                headers: { 'authorization': localStorage.getItem('adminToken') }
            })
            const data = await res.data
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log('sdsdsdsd', error);
            if (error.response && error.response.status == 401 || error.response.status == 403) {
                alert("Your token has expired")
                localStorage.removeItem('token')
                navigate('/login')
            }
        }
    }
    let deleteHelper = async (id) => {
        const userConfirmed = window.confirm('Are you sure?');
        if (!userConfirmed) {
            return;
        }
        try {
            const res = await axios.delete(`http://localhost:3001/admin/api/deleteuser/${id}`,{
                headers:{authorization:localStorage.getItem('adminToken')}
            })
            const data=await res.data
            alert(data.message)
            getAllUsers()
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data){
                alert(error.response.data.message)
            }
        }
    }
    let searchHelper = async (searchQuery) => {
        setIsLoading(true)
        try {
            const res = await axios.get(`http://localhost:3001/admin/api/search`,{
                headers:{authorization:localStorage.getItem('adminToken')},
                params: { q: searchQuery } 
            })
            const data=await res.data
            setData(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            if(error.response && error.response.data){
                alert(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        getAllUsers()
    },[])
    
    return (
        <div>

            <input
                type="text"
                placeholder="Search by name"
                onChange={(e)=>{
                    searchHelper(e.target.value)
                }}
                className="px-4 py-2 m-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Serial Number
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delete
                        </th>
                    </tr>
                </thead>
                <tbody className={!data.length<1?'bg-white divide-y divide-gray-200':'absolute bg-purple-100'}>
                   <div className={data.length<1?"relative w-screen flex items-center justify-center":'hidden'}>
                    <img className="w-4 h-4 mt-10 " src={data.length<1&&loder} alt="" />
                   </div>
                   
                    {data.map((item, index) => (
                        
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button onClick={()=>deleteHelper(item._id)} className="text-red-500 hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    )
}
export default AdminHome