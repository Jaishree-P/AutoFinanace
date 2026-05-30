import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../supabase'

function Records() {

  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    console.log(data)
    console.log(error)

    if (data) {
      setCustomers(data)
    }
  }

  return (
    <div className='min-h-screen bg-[#050B18]'>

      <Navbar title='CUSTOMER RECORDS' role='FIELD AGENT' />

      <div className='p-6'>

        <h1
          className='text-4xl text-[#D6A64F] mb-8'
          style={{ fontFamily: 'Oswald' }}
        >
          ALL CUSTOMERS
        </h1>

        <div className='grid gap-6'>

          {customers.map((customer) => (

            <div
              key={customer.id}
              className='bg-[#101826] border border-[#2A3344] rounded-3xl p-6 flex justify-between items-center'
            >

              <div className='flex items-center gap-5'>

                <img
                  src={customer.customer_face}
                  alt=''
                  className='w-20 h-20 rounded-2xl object-cover bg-black'
                />

                <div>

                  <h1 className='text-2xl font-bold text-white'>
                    {customer.full_name}
                  </h1>

                  <p className='text-gray-400'>
                    {customer.phone}
                  </p>

                  <p className='text-[#24FFE8]'>
                    {customer.vehicle_number}
                  </p>

                  <p className='text-sm text-gray-500 mt-1'>
                    {customer.loan_id}
                  </p>

                </div>

              </div>

              <div>

                <span className='bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-full'>
                  {customer.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Records