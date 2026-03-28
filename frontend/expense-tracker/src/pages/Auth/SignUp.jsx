import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { userContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
    const {updateUser} = useContext(userContext)
    const  navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    if(!fullName){
      setError("Please enter your full name");
      return
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return
  };

  if(!password){
    setError("Please enter a password");
    return
  };

  setError("")

  // upload Image 
  if(profilePic) {
    const imageUploadRes = await uploadImage(profilePic)
    profileImageUrl = imageUploadRes.imageUrl || ""
  }

  // signUp api call
  try{
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl,
        })
        const {token , user} = response.data
        if(token) {
          updateUser(user)
          localStorage.setItem("token", token)
          navigate('/dashboard')
        }
  } catch(error){
    if(error.response && error.response.data.message){
     setError(error.response.data.message)
    } else {
      setError("Something went wrong. please try again ")
    }
  }

}

console.log(error, "jhgjsg")
  return (
    <AuthLayout>
      <div className=" lg:w-[100%] h-auto md:h-full mt-10 ms:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className=" text-xs text-slate-700 mr-[ox]mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setProfilePic={setProfilePic} />
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              lable="Full Name"
              placeholder={"Enter your full name"}
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              lable="Email Address"
              placeholder="k.sharma@avua.com"
              type="text"
            />

            <div className=" col-span-2">
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              lable="Passwrd"
              placeholder="Min 8 characters"
              type="password"
            />
            </div>
         
          </div>

          {error && (<p className=' text-red-500'>{error}</p>)}
          
                    <button type='submit' className= ' btn-primary '>SIGN UP</button>
          
                    <p className='text-[13px] text-slate-800 mt-3'>
                      Already have an account?{" "}
                      <Link className='underline font-medium text-primary ' to="/login">Login</Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
