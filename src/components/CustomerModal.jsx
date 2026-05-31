function CustomerModal({ customer, onClose }) {

  if(!customer) return null

  return (
    <div className='fixed inset-0 bg-black/80 z-50 overflow-y-auto'>

      <div className='min-h-screen flex justify-center items-start p-3 md:p-6'>

        <div className='bg-[#101826] border border-[#2A3344] rounded-3xl w-full max-w-7xl p-4 md:p-8 my-6'>

          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10'>

            <h1 className='text-3xl md:text-4xl text-[#D6A64F]'>
              Customer Details
            </h1>

            <button
              onClick={onClose}
              className='bg-red-500 text-white px-5 py-3 rounded-2xl font-bold w-full md:w-auto'
            >
              Close
            </button>

          </div>

          <div className='grid md:grid-cols-2 gap-10'>

            <div>

              <h2 className='text-2xl text-[#D6A64F] mb-5'>
                Customer Information
              </h2>

              <div className='space-y-3 text-gray-300 text-sm md:text-base'>

                <p>Full Name : {customer.full_name}</p>

                <p>Phone : {customer.phone}</p>

                <p>Loan ID : {customer.loan_id}</p>

                <p>Vehicle Number : {customer.vehicle_number}</p>

                <p>
                  Added On :
                  {' '}
                  {new Date(customer.created_at).toLocaleString()}
                </p>

              </div>

              <h2 className='text-2xl text-[#D6A64F] mt-10 mb-5'>
                Guarantor Information
              </h2>

              <div className='space-y-3 text-gray-300 text-sm md:text-base'>

                <p>Name : {customer.guarantor_name}</p>

                <p>Phone : {customer.guarantor_phone}</p>

              </div>

              <h2 className='text-2xl text-[#D6A64F] mt-10 mb-5'>
                Address & GPS
              </h2>

              <div className='space-y-3 text-gray-300 text-sm md:text-base'>

                <p>{customer.address}</p>

                <p>
                  Latitude :
                  {' '}
                  {customer.latitude}
                </p>

                <p>
                  Longitude :
                  {' '}
                  {customer.longitude}
                </p>

                <a
                  href={`https://maps.google.com/?q=${customer.latitude},${customer.longitude}`}
                  target='_blank'
                  className='bg-cyan-400 text-black px-6 py-3 rounded-2xl inline-block font-bold mt-3 w-full md:w-auto text-center'
                >
                  Open In Google Maps
                </a>

              </div>

            </div>

            <div>

              <h2 className='text-2xl text-[#D6A64F] mb-5'>
                Status
              </h2>

              <div className='flex flex-col gap-4'>

                <span className='bg-yellow-500/20 text-yellow-400 px-5 py-3 rounded-full text-sm md:text-base'>
                  Approval Status : {customer.approval_status}
                </span>

                <span className='bg-red-500/20 text-red-400 px-5 py-3 rounded-full text-sm md:text-base'>
                  Recovery Status : {customer.recovery_status}
                </span>

                <span className='bg-cyan-400/20 text-cyan-400 px-5 py-3 rounded-full text-sm md:text-base'>
                  Visit Status : {customer.visited_status}
                </span>

                {customer.visited_at && (
                  <span className='bg-green-500/20 text-green-400 px-5 py-3 rounded-full text-sm md:text-base'>
                    Visited At :
                    {' '}
                    {new Date(customer.visited_at).toLocaleString()}
                  </span>
                )}

              </div>

            </div>

          </div>

          <h2 className='text-3xl text-[#D6A64F] mt-14 mb-8'>
            Customer Documents
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

            <div>
              <p className='text-white mb-3'>Customer Face</p>

              <img
                src={customer.customer_face}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>Customer Aadhaar</p>

              <img
                src={customer.customer_aadhar}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>Customer Signature</p>

              <a
                href={customer.customer_signature}
                target='_blank'
                className='bg-cyan-400 text-black flex justify-center items-center h-60 md:h-52 rounded-2xl font-bold'
              >
                Open Signature
              </a>
            </div>

            <div>
              <p className='text-white mb-3'>Income Proof</p>

              <a
                href={customer.income_proof}
                target='_blank'
                className='bg-cyan-400 text-black flex justify-center items-center h-60 md:h-52 rounded-2xl font-bold'
              >
                Open Income Proof
              </a>
            </div>

          </div>

          <h2 className='text-3xl text-[#D6A64F] mt-14 mb-8'>
            Guarantor Documents
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

            <div>
              <p className='text-white mb-3'>Guarantor Face</p>

              <img
                src={customer.guarantor_face}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>Guarantor Aadhaar</p>

              <img
                src={customer.guarantor_aadhar}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>Guarantor Signature</p>

              <a
                href={customer.guarantor_signature}
                target='_blank'
                className='bg-cyan-400 text-black flex justify-center items-center h-60 md:h-52 rounded-2xl font-bold'
              >
                Open Signature
              </a>
            </div>

          </div>

          <h2 className='text-3xl text-[#D6A64F] mt-14 mb-8'>
            Vehicle Documents
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

            <div>
              <p className='text-white mb-3'>Vehicle Front View</p>

              <img
                src={customer.vehicle_front}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>Vehicle Side View</p>

              <img
                src={customer.vehicle_side}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>Odometer Photo</p>

              <img
                src={customer.odometer_photo}
                alt=''
                className='h-60 md:h-52 w-full object-cover rounded-2xl'
              />
            </div>

            <div>
              <p className='text-white mb-3'>RC Book</p>

              <a
                href={customer.rc_book}
                target='_blank'
                className='bg-cyan-400 text-black flex justify-center items-center h-60 md:h-52 rounded-2xl font-bold'
              >
                Open RC Book
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CustomerModal