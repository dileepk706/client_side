import hero2 from "../../assets/hero2.svg"

function Home() {
  
  return (
     <div className="p-5">
        <div className="flex flex-col items-center md:flex-row pt-14 pb-7 px-10">
                <div className="w-full flex flex-col items-center md:w-1/2   justify-center">
                    <h1 className="text-center text-2xl font-bold md:text-3xl  text-left">World class design for your Products.</h1>
                    <h3 className="text-center text-xl md:text-2xl text-gray-600 text-left mt-3">Lets bring life to your brand.</h3>
                    <div className="flex gap:3  md:gap-5 my-5">
                        <button  className="py-1 px-2 bg-red-500  mr-2  md:py-2 px-4 rounded text-white">Sevices</button>
                        <button className="py-1 px-2  bg-blue-600 mr-2  md:py-2 px-4 rounded text-white">Contact Us</button>
                    </div>
                </div>
                <div className=" w-full m mr-2 d:w-1/2 flex">
                    <img className="" src={hero2} alt="" />
                </div>
            </div>
     </div>
  );
}

export default Home;