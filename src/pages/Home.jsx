import { useNavigate } from 'react-router-dom'

function Home(){

  const navigate = useNavigate()

  return(
    <div className='min-h-screen bg-[#050B18] flex flex-col justify-center items-center p-6'>

      <h1 className='text-6xl text-[#D6A64F] mb-4' style={{fontFamily:'Oswald'}}>
        AUTOFINANCE
      </h1>

      <p className='text-gray-400 mb-14'>
        Vehicle Finance Verification & Recovery
      </p>

      <div className='grid md:grid-cols-3 gap-8 w-full max-w-6xl'>

        <div
          onClick={() => navigate('/login/field-agent')}
          className='bg-[#101826] p-10 rounded-3xl border border-[#2A3344] cursor-pointer'
        >
          <h1 className='text-3xl mb-4'>Field Agent</h1>
        </div>

        <div
          onClick={() => navigate('/login/recovery')}
          className='bg-[#101826] p-10 rounded-3xl border border-[#2A3344] cursor-pointer'
        >
          <h1 className='text-3xl mb-4'>Recovery</h1>
        </div>

        <div
          onClick={() => navigate('/login/owner')}
          className='bg-[#101826] p-10 rounded-3xl border border-[#2A3344] cursor-pointer'
        >
          <h1 className='text-3xl mb-4'>Owner</h1>
        </div>

      </div>
    </div>
  )
}

export default Home