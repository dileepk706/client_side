import { useState } from "react";
import Popup from "../../components/popup";
import ProfileImageEditPopup from "../../components/ProfileEditPopup";
import { useEffect } from "react";
import axios from "axios";
import { logout } from "../../features/authenticationSlicer";
import { useDispatch } from "react-redux";
import avatar from '../../assets/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
function Profile() {

  let [showPopup, setShowPopup] = useState(false)
  let [showImagePopup, setShowImaagePopup] = useState(false)
  let [user, setUser] = useState({})
  let [isUpdated,setIsUpdated]=useState(false)

  const dispatch=useDispatch()

  const getUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/profile', {
        headers: { 'authorization': localStorage.getItem('token') }
      })
      const data = await res.data
      setUser(data)
      console.log('form profile');
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 401 || error.response.status === 403) {
        dispatch(logout());
      }
    }
  }
  useEffect( () => {
    getUserInfo()
  },[isUpdated])

  const logoutHelper=()=>{
    dispatch(logout())
  }

  const popup = () => {
    setShowPopup(prev => {
      if (prev == false) {
        return true
      } else {
        return false
      }
    })
  }

  const imageUploadPopup = () => {
    setShowImaagePopup(prev => {
      if (prev == false) {
        return true
      } else {
        return false
      }
    })
  }

  return (
    <section className="p-10">
      <div className="w-full md:w-2/3 bg-purple-200 my-5 mx-auto rounded-md shadow-md md:pt-5  ">

        <div style={{height:'180px'}} onClick={imageUploadPopup} className=" w-full  overflow-hidden mx-auto rounded-lg shadow-emerald-200 md:hidden ">
          <img className="cursor-pointer w-full h-full" src={user.image?user.image:avatar} alt="" />
        </div>

        <div className="  bg-white   w-full md:mt-48 md:pt-20 px-14 relative md:rounded-t-3xl ">

          <div onClick={imageUploadPopup} className="hidden md:block absolute right-1/2 translate-x-36 -top-40 w-80  max-h-80 overflow-hidden mx-auto rounded-lg shadow-emerald-200 ">
            <img className=" cursor-pointer w-full h-full" src={user.image?user.image:avatar} alt="" />
          </div>

          <div className="flex flex-col items-center gap-4 py-10">
            <h1 className="text-2xl  md:text-4xl font-bold">{user.name}</h1>
            <h3 className=" text-sm md:text-xl font-normal text-gray-700">{user.email}</h3>
            <p>User</p>
            <div className="flex flex-col md:flex-row gap-6 ">
              <button onClick={popup} className="px-4 py-2 rounded-md text-white bg-green-500 shadow-md hover:shadow-xl">Edit</button>
              <button className="px-4 py-2 rounded-md text-white bg-red-500 shadow-md hover:shadow-xl">Delete Account</button>
              <button onClick={logoutHelper} className="px-4 py-2 rounded-md text-white bg-blue-500 shadow-md hover:shadow-xl">Logout</button>

            </div>
          </div>

        </div>
      </div>


      {showPopup && <Popup 
      user={user}
      setUser={setUser}
      setShowPopup={setShowPopup}
      setIsUpdated={setIsUpdated} 
      />}
      {showImagePopup && <ProfileImageEditPopup 
      imageUploadPopup={imageUploadPopup} 
      setIsUpdated={setIsUpdated}
      />}
    </section>
  );
}

export default Profile;
