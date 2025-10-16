import React from 'react'

const ContactPage = () => {
  return (
    <div>
        <h1 className='font-semibold font-[SF Pro] text-3xl mb-10'>Contact us</h1>
        <div className='flex gap-20' >
            <div className='w-52 h-18 bg-[#F2F2F2] justify-center'>
                <img src="../src/assets/mailbox.png" alt="Maillogo" style={{width:"50px", height:"50px"}} className='mt-2 ml-3'/>
                <p className='relative bottom-10 left-20 font-medium text-2xl'>Mail us</p>
                <p className='relative bottom-5 font-medium'>24 hours response time</p>
            </div>
            <div className='w-52 h-18 bg-[#F2F2F2] justify-center'>
                <img src="../src/assets/chat logo.png" alt="logo" style={{width:"50px", height:"50px"}} className='mt-2 ml-3'/>
                <p className='relative bottom-10 left-20 font-medium text-2xl'>Start Chat</p>
                <p className='relative bottom-5 font-medium'>24 hours response time</p>
            </div>
            <div className='w-52 h-18 bg-[#F2F2F2] justify-center'>
                <img src="../src/assets/calls logo.png" alt="logo" style={{width:"50px", height:"50px"}} className='mt-2 ml-3'/>
                <p className='relative bottom-10 left-20 font-medium text-2xl'>Start Chat</p>
                <p className='relative bottom-5 font-medium'>9:00 am - 6:00 pm</p>
            </div>
        </div>
        <div>
          <h1 className='font-semibold text-3xl mt-15'>Join Our Community</h1>
          <p className='font-medium text-[#444444d7] text-2xl mt-2'>Choose your social network</p>
        </div>
        <div className='flex gap-20 ml-5 mt-7'>
          <img src="../src/assets/Insta Logo.png" alt="Inlogo" />
          <img src="../src/assets/FB Logo.png" alt="Flogo" />
          <img src="../src/assets/Pinterest Logo.png" alt="Plogo" />
          <img src="../src/assets/YouTubeLogo.png" alt="Ylogo" />
          <img src="../src/assets/LinkdinLogo.png" alt="Llogo" />
          <img src="../src/assets/TwitterLogo.png" alt="Tlogo" />
          <img src="../src/assets/OperaMini.png" alt="Ologo" />

        </div>
    </div>
  )
}

export default ContactPage