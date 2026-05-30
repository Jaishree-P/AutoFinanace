import { useNavigate } from 'react-router-dom'

function Navbar({ title, role }) {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem('user')

    navigate('/')
  }

  return (
    <div className='bg-[#101826] border-b border-[#2A3344] px-6 py-5 flex justify-between items-center flex-wrap gap-5'>

      <div>

        <h1
          className='text-3xl text-[#D6A64F]'
          style={{ fontFamily:'Oswald' }}
        >
          {title}
        </h1>

        <p className='text-gray-400 mt-1'>
          {role}
        </p>

      </div>

      <button
        onClick={logout}
        className='bg-red-500 text-white px-6 py-3 rounded-2xl font-bold'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar