import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

function Login() {

  const navigate = useNavigate()
  const { role } = useParams()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single()

    console.log(data)
    console.log(error)

    if (error || !data) {
      alert('Invalid Username or Password')
      return
    }

    if (data.role !== role) {
      alert('Invalid Login Role')
      return
    }

    localStorage.setItem('user', JSON.stringify(data))

    if (role === 'field-agent') {
      navigate('/field-dashboard')
    }

    if (role === 'recovery') {
      navigate('/recovery-dashboard')
    }

    if (role === 'owner') {
      navigate('/owner-dashboard')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050B18]'>

      <div className='bg-[#101826] border border-[#2A3344] p-10 rounded-3xl w-[420px]'>

        <h1
          className='text-5xl text-[#D6A64F] text-center mb-10 capitalize'
          style={{ fontFamily: 'Oswald' }}
        >
          {role} Login
        </h1>

        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full bg-black border border-[#2A3344] p-5 rounded-2xl mb-5 text-white outline-none'
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full bg-black border border-[#2A3344] p-5 rounded-2xl mb-8 text-white outline-none'
        />

        <button
          onClick={login}
          className='w-full bg-[#D6A64F] text-black py-5 rounded-2xl font-bold text-xl'
        >
          LOGIN
        </button>

      </div>

    </div>
  )
}

export default Login