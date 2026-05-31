import { useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../supabase'

function UploadBox({
  title,
  file,
  setFile,
  captureType = 'environment'
}) {

  return (
    <div className='bg-black border border-[#2A3344] rounded-2xl p-5'>

      <p className='text-white mb-4 font-semibold'>
        {title}
      </p>

      <input
  type='file'
  accept='image/*'
  onChange={(e)=>setFile(e.target.files[0])}
  className='hidden'
  id={title}
/>

<label
  htmlFor={title}
  className='bg-cyan-400 text-black px-3 py-2 rounded-xl font-semibold inline-block cursor-pointer text-sm'
>
  Open Camera / Upload
</label>

      {file && (
        <div className='mt-5'>

          <img
            src={URL.createObjectURL(file)}
            alt=''
            className='h-48 w-full object-cover rounded-2xl'
          />

          <p className='text-green-400 mt-3 text-sm'>
            Selected :
            {' '}
            {file.name}
          </p>

        </div>
      )}

    </div>
  )
}

function AddCustomer() {

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loanId, setLoanId] = useState('')
  const [vehicleNumber, setVehicleNumber] = useState('')

  const [guarantorName, setGuarantorName] = useState('')
  const [guarantorPhone, setGuarantorPhone] = useState('')

  const [address, setAddress] = useState('')

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const [customerFace, setCustomerFace] = useState(null)
  const [customerAadhar, setCustomerAadhar] = useState(null)
  const [customerSignature, setCustomerSignature] = useState(null)
  const [incomeProof, setIncomeProof] = useState(null)

  const [guarantorFace, setGuarantorFace] = useState(null)
  const [guarantorAadhar, setGuarantorAadhar] = useState(null)
  const [guarantorSignature, setGuarantorSignature] = useState(null)

  const [vehicleFront, setVehicleFront] = useState(null)
  const [vehicleSide, setVehicleSide] = useState(null)
  const [odometerPhoto, setOdometerPhoto] = useState(null)
  const [rcBook, setRcBook] = useState(null)

  const [loading, setLoading] = useState(false)

  const uploadFile = async(file) => {

    if(!file) return ''

    const fileName = `${loanId}/${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from('customer-documents')
      .upload(fileName, file)

    if(error){
      alert(error.message)
      return ''
    }

    const { data } = supabase.storage
      .from('customer-documents')
      .getPublicUrl(fileName)

    return data.publicUrl
  }

  const captureLocation = () => {

    navigator.geolocation.getCurrentPosition((position) => {

      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

    })
  }

  const submitCustomer = async() => {

    if(
  !fullName
  || !phone
  || !loanId
  || !vehicleNumber
  || !guarantorName
  || !guarantorPhone
  || !address
  || !customerFace
  || !customerAadhar
  || !customerSignature
  || !incomeProof
  || !guarantorFace
  || !guarantorAadhar
  || !guarantorSignature
  || !vehicleFront
  || !vehicleSide
  || !odometerPhoto
  || !rcBook
){

  alert('Please fill all fields and upload all documents')

  return
}

    setLoading(true)

    const customerFaceUrl = await uploadFile(customerFace)
    const customerAadharUrl = await uploadFile(customerAadhar)
    const customerSignatureUrl = await uploadFile(customerSignature)
    const incomeProofUrl = await uploadFile(incomeProof)

    const guarantorFaceUrl = await uploadFile(guarantorFace)
    const guarantorAadharUrl = await uploadFile(guarantorAadhar)
    const guarantorSignatureUrl = await uploadFile(guarantorSignature)

    const vehicleFrontUrl = await uploadFile(vehicleFront)
    const vehicleSideUrl = await uploadFile(vehicleSide)
    const odometerPhotoUrl = await uploadFile(odometerPhoto)
    const rcBookUrl = await uploadFile(rcBook)

    

    const { error } = await supabase
      .from('customers')
      .insert([
        {
          loan_id: loanId,

          full_name: fullName,
          phone,
          vehicle_number: vehicleNumber,

          guarantor_name: guarantorName,
          guarantor_phone: guarantorPhone,

          customer_face: customerFaceUrl,
          customer_aadhar: customerAadharUrl,
          customer_signature: customerSignatureUrl,
          income_proof: incomeProofUrl,

          guarantor_face: guarantorFaceUrl,
          guarantor_aadhar: guarantorAadharUrl,
          guarantor_signature: guarantorSignatureUrl,

          vehicle_front: vehicleFrontUrl,
          vehicle_side: vehicleSideUrl,
          odometer_photo: odometerPhotoUrl,
          rc_book: rcBookUrl,

          address,

          latitude,
          longitude,

          approval_status:'pending',

          recovery_status:'none'
        }
      ])

    if(error){

  setLoading(false)

  alert(error.message)

  return
}

    setLoading(false)

alert('Customer Added Successfully')
  }

  return (
    <div className='min-h-screen bg-[#050B18]'>

      <Navbar title='ADD CUSTOMER' role='FIELD AGENT' />

      <div className='p-6'>

        <div className='bg-[#101826] border border-[#2A3344] rounded-3xl p-8'>

          <h1 className='text-4xl text-[#D6A64F] mb-8'>
            Customer Details
          </h1>

          <div className='grid md:grid-cols-2 gap-5'>

            <input
              placeholder='Full Name'
              value={fullName}
              onChange={(e)=>setFullName(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none'
            />

            <input
              placeholder='Mobile Number'
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none'
            />

            <input
              placeholder='Loan ID'
              value={loanId}
              onChange={(e)=>setLoanId(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none'
            />

            <input
              placeholder='Vehicle Number'
              value={vehicleNumber}
              onChange={(e)=>setVehicleNumber(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none'
            />

          </div>

          <h1 className='text-4xl text-[#D6A64F] mt-14 mb-8'>
            Guarantor Details
          </h1>

          <div className='grid md:grid-cols-2 gap-5'>

            <input
              placeholder='Guarantor Name'
              value={guarantorName}
              onChange={(e)=>setGuarantorName(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none'
            />

            <input
              placeholder='Guarantor Mobile Number'
              value={guarantorPhone}
              onChange={(e)=>setGuarantorPhone(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none'
            />

          </div>

          <h1 className='text-4xl text-[#D6A64F] mt-14 mb-8'>
            Customer Documents
          </h1>

          <div className='grid md:grid-cols-2 gap-8'>

            <UploadBox
              title='Upload Customer Face'
              file={customerFace}
              setFile={setCustomerFace}
              captureType='user'
            />

            <UploadBox
              title='Upload Customer Aadhaar'
              file={customerAadhar}
              setFile={setCustomerAadhar}
            />

            <UploadBox
              title='Upload Customer Signature'
              file={customerSignature}
              setFile={setCustomerSignature}
            />

            <UploadBox
              title='Upload Income Proof'
              file={incomeProof}
              setFile={setIncomeProof}
            />

          </div>

          <h1 className='text-4xl text-[#D6A64F] mt-14 mb-8'>
            Guarantor Documents
          </h1>

          <div className='grid md:grid-cols-2 gap-8'>

            <UploadBox
              title='Upload Guarantor Face'
              file={guarantorFace}
              setFile={setGuarantorFace}
              captureType='user'
            />

            <UploadBox
              title='Upload Guarantor Aadhaar'
              file={guarantorAadhar}
              setFile={setGuarantorAadhar}
            />

            <UploadBox
              title='Upload Guarantor Signature'
              file={guarantorSignature}
              setFile={setGuarantorSignature}
            />

          </div>

          <h1 className='text-4xl text-[#D6A64F] mt-14 mb-8'>
            Vehicle Delivery Photos
          </h1>

          <div className='grid md:grid-cols-2 gap-8'>

            <UploadBox
              title='Upload Vehicle Front View'
              file={vehicleFront}
              setFile={setVehicleFront}
            />

            <UploadBox
              title='Upload Vehicle Side View'
              file={vehicleSide}
              setFile={setVehicleSide}
            />

            <UploadBox
              title='Upload Odometer Photo'
              file={odometerPhoto}
              setFile={setOdometerPhoto}
            />

            <UploadBox
              title='Upload RC Book'
              file={rcBook}
              setFile={setRcBook}
            />

          </div>

          <h1 className='text-4xl text-[#D6A64F] mt-14 mb-8'>
            Residence Location
          </h1>

          <div className='grid gap-5'>

            <textarea
              placeholder='Enter Complete Address'
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className='bg-black p-5 rounded-2xl text-white outline-none h-36'
            />

            <button
              onClick={captureLocation}
              className='bg-cyan-400 text-black py-5 rounded-2xl font-bold'
            >
              Capture GPS Location
            </button>

            <div className='text-gray-400'>
              Latitude : {latitude}
            </div>

            <div className='text-gray-400'>
              Longitude : {longitude}
            </div>

          </div>

          <button
  onClick={submitCustomer}
  disabled={loading}
  className={`mt-12 px-10 py-5 rounded-2xl font-bold text-xl ${
    loading
      ? 'bg-gray-500 text-white'
      : 'bg-[#D6A64F] text-black'
  }`}
>

  {loading
    ? 'Uploading Customer...'
    : 'Submit Customer'
  }

</button>
        </div>

      </div>

    </div>
  )
}

export default AddCustomer