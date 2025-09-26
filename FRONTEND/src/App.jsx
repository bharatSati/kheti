import { useState } from 'react'
import './App.css'
import React from 'react'
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
const LandingPage = React.lazy(()=>(import("./landingPage/landingPage.jsx")))
const LogIn = React.lazy(()=>(import("./logIN.jsx")))
const SignUp = React.lazy(()=>(import("./signUp.jsx")))
const Products = React.lazy(()=>(import("./products/products.jsx")))
const Profile = React.lazy(()=>(import("./profile/profile.jsx")))
const EditProfile = React.lazy(()=>(import("./editProfile/editProfile.jsx")))
const ProductDetail = React.lazy(()=>(import("./productDetail/productDetail.jsx")))
const Create = React.lazy(()=>(import("./create/create.jsx")))
const Potd = React.lazy(()=>(import("./potd/potd.jsx")))
const Feed = React.lazy(()=>(import("./feed/feed.jsx")))
const PostFeed = React.lazy(()=>(import("./postFeed/postFeed.jsx")))
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';



function App() {

  return (
   <>
<BrowserRouter>
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/signup' element = {<SignUp/>}/>
      <Route path='/login' element = {<LogIn/>}/>
      <Route path='/products' element = {<Products/>}/>
      <Route path='/productdetail' element = {<ProductDetail/>}/>
      <Route path='/profile' element = {<Profile/>}/>
      <Route path='/editProfile' element = {<EditProfile/>}/>
      <Route path='/create' element = {<Create/>}/>
      <Route path='/potd' element = {<Potd/>}/>
      <Route path='/feed' element = {<Feed/>}/>
      <Route path='/postfeed' element = {<PostFeed/>}/>
      
    </Routes>
  </BrowserRouter>
  <ToastContainer position="top-right"  autoClose={3000} />
    </>
  )
}

export default App
