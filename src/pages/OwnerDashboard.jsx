import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CustomerModal from '../components/CustomerModal'
import { supabase } from '../supabase'

function OwnerDashboard() {

  const [customers, setCustomers] = useState([])

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const [submittedCount, setSubmittedCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [recoveryCount, setRecoveryCount] = useState(0)

  useEffect(() => {
    fetchCustomers()
    fetchCounts()
  }, [activeFilter])

  const fetchCustomers = async () => {

    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending:false })

    if(activeFilter === 'pending'){
      query = query.eq('approval_status', 'pending')
    }

    if(activeFilter === 'approved'){
      query = query.eq('approval_status', 'approved')
    }

    if(activeFilter === 'recovery'){
      query = query.eq('recovery_status', 'recovery')
    }

    const { data } = await query

    if(data){
      setCustomers(data)
    }
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

  const approveCustomer = async(id) => {

    await supabase
      .from('customers')
      .update({
        approval_status:'approved'
      })
      .eq('id', id)

    fetchCustomers()
    fetchCounts()
  }

  const moveToRecovery = async(id) => {

    await supabase
      .from('customers')
      .update({
        recovery_status:'recovery'
      })
      .eq('id', id)

    fetchCustomers()
    fetchCounts()
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

      <Navbar title='OWNER DASHBOARD' role='OWNER' />

      <div className='p-4 md:p-6'>

        <h1
          className='text-4xl md:text-5xl text-[#D6A64F] mb-10'
          style={{ fontFamily:'Oswald' }}
        >
          OWNER PANEL
        </h1>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-10'>

          <div
            onClick={() => setActiveFilter('all')}
            className='bg-[#101826] border border-[#2A3344] rounded-3xl p-4 md:p-6 cursor-pointer'
          >

            <h1 className='text-3xl md:text-5xl text-[#D6A64F] mb-2'>
              {submittedCount}
            </h1>

            <p className='text-gray-400 text-sm md:text-base'>
              Total
            </p>

          </div>

          <div
            onClick={() => setActiveFilter('pending')}
            className='bg-[#101826] border border-[#2A3344] rounded-3xl p-4 md:p-6 cursor-pointer'
          >

            <h1 className='text-3xl md:text-5xl text-yellow-400 mb-2'>
              {pendingCount}
            </h1>

            <p className='text-gray-400 text-sm md:text-base'>
              Pending
            </p>

          </div>

          <div
            onClick={() => setActiveFilter('approved')}
            className='bg-[#101826] border border-[#2A3344] rounded-3xl p-4 md:p-6 cursor-pointer'
          >

            <h1 className='text-3xl md:text-5xl text-green-400 mb-2'>
              {approvedCount}
            </h1>

            <p className='text-gray-400 text-sm md:text-base'>
              Approved
            </p>

          </div>

          <div
            onClick={() => setActiveFilter('recovery')}
            className='bg-[#101826] border border-[#2A3344] rounded-3xl p-4 md:p-6 cursor-pointer'
          >

            <h1 className='text-3xl md:text-5xl text-red-400 mb-2'>
              {recoveryCount}
            </h1>

            <p className='text-gray-400 text-sm md:text-base'>
              Recovery
            </p>

          </div>

        </div>

        <input
          type='text'
          placeholder='Search by name, loan id or vehicle number'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className='w-full bg-[#101826] border border-[#2A3344] p-4 md:p-5 rounded-2xl text-white outline-none mb-10 text-sm md:text-base'
        />

        <div className='grid gap-5 md:gap-6'>

          {filteredCustomers.map((customer) => (

            <div
              key={customer.id}
              onClick={() => setSelectedCustomer(customer)}
              className='bg-[#101826] border border-[#2A3344] rounded-3xl p-5 md:p-6 cursor-pointer'
            >

              <div className='flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6'>

                <div>

                  <h1 className='text-2xl md:text-3xl text-white font-bold mb-2'>
                    {customer.full_name}
                  </h1>

                  <p className='text-gray-400 text-sm md:text-base'>
                    Loan ID : {customer.loan_id}
                  </p>

                  <p className='text-[#24FFE8] text-sm md:text-base mt-1'>
                    Vehicle : {customer.vehicle_number}
                  </p>

                </div>

                <div className='flex flex-col gap-3 w-full xl:w-[240px]'>

                  <span className='bg-yellow-500/20 text-yellow-400 px-5 py-3 rounded-full text-center text-sm md:text-base'>
                    {customer.approval_status}
                  </span>

                  <span className='bg-red-500/20 text-red-400 px-5 py-3 rounded-full text-center text-sm md:text-base'>
                    {customer.recovery_status}
                  </span>

                </div>

                <div className='flex flex-col md:flex-row gap-3 w-full xl:w-auto'>

                  {customer.approval_status !== 'approved' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        approveCustomer(customer.id)
                      }}
                      className='bg-green-500 text-white px-6 py-3 rounded-2xl font-bold w-full'
                    >
                      Approve
                    </button>
                  )}

                  {customer.approval_status === 'approved'
                    && customer.recovery_status !== 'recovery' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        moveToRecovery(customer.id)
                      }}
                      className='bg-red-500 text-white px-6 py-3 rounded-2xl font-bold w-full'
                    >
                      Recovery
                    </button>
                  )}

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

export default OwnerDashboard