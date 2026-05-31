import { useNavigate } from 'react-router-dom'

function Navbar({ title, role }) {

  const navigate = useNavigate()

  const logout = () => {

    localStorage.removeItem('user')

    navigate('/')
  }

  return (
    <div className='bg-[#101826] border-b border-[#2A3344] px-4 md:px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4'>

      <div>

        <h1
          className='text-3xl md:text-4xl text-[#D6A64F]'
          style={{ fontFamily:'Oswald' }}
        >
          {title}
        </h1>

        <p className='text-gray-400 mt-1 text-sm md:text-base'>
          {role}
        </p>

      </div>

      <button
        onClick={logout}
        className='bg-red-500 text-white px-5 md:px-6 py-3 rounded-2xl font-bold w-full md:w-auto'
      >
        Logout
      </button>

    </div>
  )
}

export default Navbar