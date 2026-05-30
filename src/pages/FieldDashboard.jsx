import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CustomerModal from '../components/CustomerModal'
import { supabase } from '../supabase'

function FieldDashboard() {

  const navigate = useNavigate()

  const [customers, setCustomers] = useState([])

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [search, setSearch] = useState('')

  const [submittedCount, setSubmittedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [recoveryCount, setRecoveryCount] = useState(0)

  useEffect(() => {
    fetchCustomers()
    fetchCounts()
  }, [])

  const fetchCustomers = async () => {

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending:false })

    if(data){
      setCustomers(data)
    }

    console.log(error)
  }

  const fetchCounts = async () => {

    const { count: submitted } = await supabase
      .from('customers')
      .select('*', { count:'exact', head:true })

    const { count: pending } = await supabase
      .from('customers')
      .select('*', { count:'exact', head:true })
      .eq('approval_status', 'pending')

    const { count: approved } = await supabase
      .from('customers')
      .select('*', { count:'exact', head:true })
      .eq('approval_status', 'approved')

    const { count: recovery } = await supabase
      .from('customers')
      .select('*', { count:'exact', head:true })
      .eq('recovery_status', 'recovery')

    setSubmittedCount(submitted || 0)
    setPendingCount(pending || 0)
    setApprovedCount(approved || 0)
    setRecoveryCount(recovery || 0)
  }

  const filteredCustomers = customers.filter((customer) => {

    const value = search.toLowerCase()

    return (
      customer.full_name?.toLowerCase().includes(value)
      || customer.loan_id?.toLowerCase().includes(value)
      || customer.vehicle_number?.toLowerCase().includes(value)
    )
  })

  return (
    <div className='min-h-screen bg-[#050B18]'>

      <Navbar title='FIELD DASHBOARD' role='FIELD AGENT' />

      <div className='p-6'>

        <div className='flex justify-between items-center flex-wrap gap-5 mb-10'>

          <h1
            className='text-5xl text-[#D6A64F]'
            style={{ fontFamily:'Oswald' }}
          >
            FIELD AGENT PANEL
          </h1>

          <button
            onClick={() => navigate('/add-customer')}
            className='bg-[#D6A64F] text-black px-8 py-4 rounded-2xl font-bold'
          >
            + Add New Record
          </button>

        </div>

        <div className='grid md:grid-cols-4 gap-5 mb-10'>

          <div className='bg-[#101826] border border-[#2A3344] rounded-3xl p-6'>

            <h1 className='text-5xl text-[#D6A64F] mb-2'>
              {submittedCount}
            </h1>

            <p className='text-gray-400'>
              Submitted
            </p>

          </div>

          <div className='bg-[#101826] border border-[#2A3344] rounded-3xl p-6'>

            <h1 className='text-5xl text-yellow-400 mb-2'>
              {pendingCount}
            </h1>

            <p className='text-gray-400'>
              Pending
            </p>

          </div>

          <div className='bg-[#101826] border border-[#2A3344] rounded-3xl p-6'>

            <h1 className='text-5xl text-green-400 mb-2'>
              {approvedCount}
            </h1>

            <p className='text-gray-400'>
              Approved
            </p>

          </div>

          <div className='bg-[#101826] border border-[#2A3344] rounded-3xl p-6'>

            <h1 className='text-5xl text-red-400 mb-2'>
              {recoveryCount}
            </h1>

            <p className='text-gray-400'>
              Recovery
            </p>

          </div>

        </div>

        <input
          type='text'
          placeholder='Search by name, loan id or vehicle number'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className='w-full bg-[#101826] border border-[#2A3344] p-5 rounded-2xl text-white outline-none mb-10'
        />

        <div className='grid gap-6'>

          {filteredCustomers.map((customer) => (

            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className='bg-[#101826] border border-[#2A3344] rounded-3xl p-6 cursor-pointer'
            >

              <div className='flex justify-between items-center flex-wrap gap-6'>

                <div>

                  <h1 className='text-3xl text-white font-bold mb-2'>
                    {customer.full_name}
                  </h1>

                  <p className='text-gray-400'>
                    Loan ID : {customer.loan_id}
                  </p>

                  <p className='text-[#24FFE8]'>
                    Vehicle : {customer.vehicle_number}
                  </p>

                  <p className='text-gray-500 mt-2'>
                    Added On :
                    {' '}
                    {new Date(customer.created_at).toLocaleString()}
                  </p>

                </div>

                <div className='flex flex-col gap-3 min-w-[220px]'>

                  <span className='bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-full text-center'>
                    Approval : {customer.approval_status}
                  </span>

                  <span className='bg-red-500/20 text-red-400 px-5 py-2 rounded-full text-center'>
                    Recovery : {customer.recovery_status}
                  </span>

                  <span className='bg-cyan-400/20 text-cyan-400 px-5 py-2 rounded-full text-center'>
                    Visit : {customer.visited_status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <CustomerModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />

    </div>
  )
}

export default FieldDashboard