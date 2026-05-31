import jsPDF from 'jspdf'

function CustomerModal({ customer, onClose }) {

  if(!customer) return null

  const downloadPDF = async () => {

  const doc = new jsPDF()

  const loadImage = (url) => {

    return new Promise((resolve) => {

      const img = new Image()

      img.crossOrigin = 'Anonymous'

      img.onload = () => {

        const canvas = document.createElement('canvas')

        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')

        ctx.drawImage(img, 0, 0)

        resolve(canvas.toDataURL('image/jpeg'))
      }

      img.src = url
    })
  }

  doc.setFontSize(22)

  doc.text('AUTOFINANCE CUSTOMER REPORT', 20, 20)

  doc.setFontSize(14)

  doc.text(`Customer Name : ${customer.full_name}`, 20, 40)
  doc.text(`Phone : ${customer.phone}`, 20, 50)
  doc.text(`Loan ID : ${customer.loan_id}`, 20, 60)
  doc.text(`Vehicle Number : ${customer.vehicle_number}`, 20, 70)

  doc.text(`Guarantor Name : ${customer.guarantor_name}`, 20, 90)
  doc.text(`Guarantor Phone : ${customer.guarantor_phone}`, 20, 100)

  doc.text(`Approval Status : ${customer.approval_status}`, 20, 120)
  doc.text(`Recovery Status : ${customer.recovery_status}`, 20, 130)
  doc.text(`Visit Status : ${customer.visited_status}`, 20, 140)

  if(customer.visited_at){

    doc.text(
      `Visited At : ${new Date(customer.visited_at).toLocaleString()}`,
      20,
      150
    )
  }

  doc.text(`Address : ${customer.address}`, 20, 170)

  doc.text(
    `GPS : ${customer.latitude}, ${customer.longitude}`,
    20,
    180
  )

  let y = 210

  const addPhoto = async(title, imageUrl) => {

    if(!imageUrl) return

    if(y > 240){

      doc.addPage()

      y = 20
    }

    const image = await loadImage(imageUrl)

    doc.setFontSize(16)

    doc.text(title, 20, y)

    doc.addImage(image, 'JPEG', 20, y + 10, 80, 60)

    y += 80
  }

  await addPhoto('Customer Face', customer.customer_face)

  await addPhoto('Customer Aadhaar', customer.customer_aadhar)

  await addPhoto('Guarantor Face', customer.guarantor_face)

  await addPhoto('Guarantor Aadhaar', customer.guarantor_aadhar)

  await addPhoto('Vehicle Front View', customer.vehicle_front)

  await addPhoto('Vehicle Side View', customer.vehicle_side)

  await addPhoto('Odometer Photo', customer.odometer_photo)

  doc.save(`${customer.full_name}.pdf`)
}

  return (
    <div className='fixed inset-0 bg-black/80 z-50 overflow-y-auto'>

      <div className='min-h-screen flex justify-center items-start p-3 md:p-6'>

        <div className='bg-[#101826] border border-[#2A3344] rounded-3xl w-full max-w-7xl p-4 md:p-8 my-6'>

          <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-10'>

            <h1 className='text-3xl md:text-4xl text-[#D6A64F]'>
              Customer Details
            </h1>

            <div className='flex flex-col md:flex-row gap-3 w-full md:w-auto'>

              <button
                onClick={downloadPDF}
                className='bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold w-full md:w-auto'
              >
                Download PDF
              </button>

              <button
                onClick={onClose}
                className='bg-red-500 text-white px-5 py-3 rounded-2xl font-bold w-full md:w-auto'
              >
                Close
              </button>

            </div>

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

        </div>

      </div>

    </div>
  )
}

export default CustomerModal