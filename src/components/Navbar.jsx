function Navbar({ title, role }) {
  return (
    <div className='flex justify-between items-center p-5 border-b border-[#1E293B] bg-[#101826]'>
      <h1 className='text-2xl text-[#D6A64F]' style={{fontFamily:'Oswald'}}>
        {title}
      </h1>

      <div className='bg-[#18263E] px-5 py-2 rounded-full text-[#24FFE8]'>
        {role}
      </div>
    </div>
  )
}

export default Navbar