import axios from "axios";
import { useState } from "react";
import loader from '.././assets/34338d26023e5515f6cc8969aa027bca_w200.gif'
const ProfileImageEditPopup = ({ imageUploadPopup ,setIsUpdated}) => {
   
    const [selectedImage, setSelectedImage] = useState(null);
    const [error,setError]=useState('')
    const [isSubmited,setIsSubmited]=useState(false)
    const [isLoading,setIsloading]=useState(false)
    const imageUploadHandler =async (e) => {
        e.preventDefault()
        setIsSubmited(false)
        setIsUpdated(false)
        setIsloading(true)
        if (!selectedImage) {
             setError('No file selected')
            return;
          }
        try {
            const res = await axios.patch('http://localhost:3001/api/profilepicture',
                {
                    'image':selectedImage
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'authorization': localStorage.getItem('token')
                    },

                })
            const data = await res.data
            setIsUpdated(true)
            setIsloading(false)
            data&&setIsSubmited(true)
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }
    const handleImageChange=(e)=>{

        const file=e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
          } else {
            setSelectedImage(null);
            setError('Only image files are allowed')
          }
    }

    return (

        <div className="absolute top-0 w-screen h-screen flex justify-center items-center">
            <div className=" flex flex-col gap-5 z-50 fixed bg-gray-100 rounded-md shadow-lg p-10">
            
               {isSubmited==true?(<div className="flex flex-col justify-center items-center gap-5">
                 <p className="text-xl text-green-500 ">Profile updated successfully</p>
                 <button
                     onClick={() => { imageUploadPopup() }}
                     className="bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-600 border border-white">
                     Ok
                 </button>
             </div>):(<>
             <p className="font-bold">update Profile picture</p>
                <p className="text-red-500 text-xl">{error}</p>
                <form onSubmit={imageUploadHandler}>
                    <input onChange={handleImageChange} accept="image/*" type="file" />

                    {isLoading?<img className="mx-auto mt-4 w-5 h-5" src={loader}alt="" />:
                    <button
                    className="bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-600 border border-purple-800"
                    >submit</button>
                    }
                    
                    <button
                        onClick={() => imageUploadPopup()}
                        className="absolute top-2 left-2 bg-gray-500 text-white px-2 rounded hover:bg-purple-600 border border-purple-800"
                    >close</button>
                </form>
             </>)}
                
            </div>
        </div>
    )
}
export default ProfileImageEditPopup 