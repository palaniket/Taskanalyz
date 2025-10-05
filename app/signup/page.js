"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'


import { useRouter } from 'next/navigation';
import toast from 'sonner'


const Signup = (req,res) => {
  const router = useRouter()
  const [email, setemail] = useState('')
  const [name,setname]=useState('');
  const [password, setpassword] = useState('')
  // const []

 useEffect(()=>{
     if(localStorage.getItem('token')){
      router.push('/')
     }
 },[])

  const handlechange = (e) => {
    if (e.target.name === 'email') { setemail(e.target.value) }
    else if (e.target.name === 'password') { setpassword(e.target.value) }
    else if(e.target.name==='name'){setname(e.target.value)}

  }
    const handlesubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !password) {
      toast.error('All fields are required');
      return;
    }

    const data = { name, email, password };
    // setLoading(true);

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const response = await res.json();
      console.log(response);

      // Reset fields
   
      if (response.success) {
        localStorage.setItem('token', response.token);
        toast('Account created successfully!');
        router.push('/');
      } else {
        toast.error(response.error || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      toast('Something went wrong: ' + err.message);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handlesubmit}>
             <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <input value={name} id="name" onChange={handlechange} name="name" type="text"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input value={email} id="email" onChange={handlechange} name="email" type="email"  required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                
              </div>
              <div className="mt-2">
                <input value={password} id="password" onChange={handlechange} name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Sign Up</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an Account?
            <Link href={'./login'} className="font-semibold leading-6 text-pink-600 hover:text-pink-500">Create Account</Link>
          </p>
        </div>
      </div>


    </>
  )
}

export default Signup
