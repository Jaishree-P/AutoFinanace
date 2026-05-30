import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CustomerModal from '../components/CustomerModal'
import { supabase } from '../supabase'

function RecoveryDashboard() {

  const [customers, setCustomers] = useState([])

  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const [activeTab, setActiveTab] = useState('assigned')

  const [assignedCount, setAssignedCount] = useState(0)
  const [visitedCount, setVisitedCount] = useState(0)

  useEffect(() => {
    fetchCustomers()
    fetchCounts()
  }, [activeTab])

  const fetchCustomers = async () => {

    let query = supabase
      .from('customers')
      .select('*')
      .eq('recovery_status', 'recovery')

    if(activeTab === 'assigned'){
      query = query.eq('visited_status', 'not-visited')
    }

    if(activeTab === 'visited'){
      query = query.eq('visited_status', 'visited')
    }

    const { data, error } = await query
      .order('created_at', { ascending:false })

    if(data){
      setCustomers(data)
    }

    console.log(error)
  }

  const fetchCounts = async () => {

    const { count: assigned } = await supabase
      .from('customers')
      .select('*', { count:'exact', head:true })
      .eq('recovery_status', 'recovery')
      .eq('visited_status', 'not-visited')

    const { count: visited } = await supabase
      .from('customers')
      .select('*', { count:'exact', head:true })
      .eq('recovery_status', 'recovery')
      .eq('visited_status', 'visited')

    setAssignedCount(assigned || 0)
    setVisitedCount(visited || 0)
  }

  const markVisited = async(id) => {

    const { error } = await supabase
      .from('customers')
      .update({
        visited_status:'visited',
        visited_at:new Date().toISOString()
      })
      .eq('id', id)

    if(error){
      alert(error.message)
      return
    }

    fetchCustomers()
    fetchCounts()
  }

  return (
    <div className='min-h-screen bg-[#050B18]'>

      <Navbar title='RECOVERY DASHBOARD' role='RECOVERY AGENT' />

      <div className='p-6'>

        <h1
          className='text-5xl text-[#D6A64F] mb-10'
          style={{ fontFamily:'Oswald' }}
        >
          RECOVERY PANEL
        </h1>

        <div className='flex gap-5 mb-10 flex-wrap'>

          <div
            onClick={() => setActiveTab('assigned')}
            className={`cursor-pointer px-8 py-4 rounded-2xl border
            ${activeTab === 'assigned'
              ? 'bg-red-500 text-white border-red-500'
              : 'bg-[#101826] text-gray-400 border-[#2A3344]'
            }`}
          >
            Assigned ({assignedCount})
          </div>

          <div
            onClick={() => setActiveTab('visited')}
            className={`cursor-pointer px-8 py-4 rounded-2xl border
            ${activeTab === 'visited'
              ? 'bg-green-500 text-white border-green-500'
              : 'bg-[#101826] text-gray-400 border-[#2A3344]'
            }`}
          >
            Visited ({visitedCount})
          </div>

        </div>

        <div className='grid gap-6'>

          {customers.map((customer) => (

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

                  {customer.visited_at && (
                    <p className='text-gray-500 mt-2'>
                      Visited At :
                      {' '}
                      {new Date(customer.visited_at).toLocaleString()}
                    </p>
                  )}

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

                  {customer.visited_status !== 'visited' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        markVisited(customer.id)
                      }}
                      className='bg-green-500 text-white px-6 py-3 rounded-2xl font-bold'
                    >
                      Mark Visited
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

export default RecoveryDashboard