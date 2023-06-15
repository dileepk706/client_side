import axios from "axios";
import { useState } from "react";

const Popup = ({ setShowPopup, user, setUser,setIsUpdated }) => {
    let [userIfo, setUserInfo] = useState(user)
    let [isSubmited, setIsubmited] = useState(false)

    const updateHandler = async (e) => {
        e.preventDefault()
        setIsubmited(false)
        setIsUpdated(false)
        const { name, email } = userIfo
    
        //rest api for update
        try {
            const res = await axios.put('http://localhost:3001/api/profile',
                {
                    email: userIfo.email,
                    name: userIfo.name
                },
                {
                    headers: {
                        'authorization': localStorage.getItem('token')
                    },

                })
            const data = await res.data
            setIsubmited(true)
            // setIsUpdated(true)
            setUser({ ...userIfo })

        } catch (error) {
            console.log(error.response);
            setShowPopup()
        }
    }

    return (

        <div className="absolute top-0 w-screen h-screen flex justify-center items-center">
            <div className={`w-2/6 h-3/6 z-50 fixed ${isSubmited?`bg-purple-200`:` bg-purple-400`} rounded-md shadow-lg shadow-black pt-20`}>

                {isSubmited ? (
                    <div className="flex flex-col justify-center items-center gap-10">
                        <h3 className="text-center text-4xl font-mono text-green-500">Your Account has Updated</h3>
                        <button onClick={() => setShowPopup()} className=" bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 border border-black">Ok</button>
                    </div>
                ) : (
                    <form onSubmit={updateHandler} className="p-8">
                        <input
                            onChange={(e) => {
                                setUserInfo({ ...userIfo, name: e.target.value })
                            }}
                            type="text"
                            name="name"
                            value={userIfo.name}
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <input
                            onChange={(e) => {
                                setUserInfo({ ...userIfo, email: e.target.value })
                            }}
                            type="text"
                            name="email"
                            value={userIfo.email}
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 border border-purple-800"
                        >
                            Update
                        </button>

                        <button
                            onClick={() => setShowPopup()}
                            className="absolute top-2 right-2 bg-gray-500 text-white py-1 px-2 rounded hover:bg-purple-600 border border-purple-800"
                        >close</button>
                    </form>
                )}


            </div>
        </div>
    )
}
export default Popup