import { useRef, useState } from 'react';
import './AttendeeForm.css'
import { IoMdCloudDownload } from "react-icons/io";

type Props = {
  onNext: () => void,
  formData: {
    fullName: string,
    email: string,
    request: string,
    avatar: string,
  },
  handleFormData: (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleFileUpload: (e:React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit:(e:React.FormEvent) => void,
  errorMsg: {
    fullName: string,
    email: string,
    request: string,
    avatar: string,
  },
  prev: () => void
}



const AttendeeForm: React.FC<Props> = ({onNext, formData, handleFormData, handleFileUpload, handleSubmit, errorMsg, prev}) => {
  const inputImgRef = useRef<HTMLInputElement>(null)
  


  // Calls image input element
  const imgInputTrigger = () => {
    alert('Hello')
    inputImgRef.current?.click();
  }

  return (
    <div className='attendeeContainer'>
      <div className='uploadPhotoContainer'>
        <p>Upload Profile Photo</p>
        <div className='profileContainer'>
        <input 
                ref={inputImgRef}
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                style={{ display: 'none' }} 
                id="avatarUpload"
        />
          {
            formData.avatar ? <div className='profileImage'>
                                  <img className='profileImage' src={formData.avatar} onClick={imgInputTrigger} alt="" />
                              </div>  : 
         
            <div className='profileBox'
              onClick={imgInputTrigger}
            >
              
              
                <IoMdCloudDownload/>
                <p>Drag & drop or click to upload</p>
            </div>
          }
        </div>
      </div>
      <div className='form'>
        <form action="" onSubmit={handleSubmit}>
          <div className='inputfield'>
            <label htmlFor="fullName">Enter your name</label>
            <input 
              type="text" 
              name="fullName" 
              id="fullName" 
              value={formData.fullName}
              onChange={handleFormData}
            />
            {errorMsg.fullName && <div className='errorMsg'>{errorMsg.fullName}</div>}
          </div>
          <div className='inputfield'>
            <label htmlFor="email">Enter your email*</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder='Emmanuel@gmail.com'
              value={formData.email}
              onChange={handleFormData}
            />
            {errorMsg.email && <div className='errorMsg'>{errorMsg.email}</div>}
          </div>
          <div className='inputfield'>
            <label htmlFor="request">Special request?</label>
            <textarea 
              name="request" 
              id="request" 
              placeholder='Textarea'
              value={formData.request}
              onChange={handleFormData}
            ></textarea>
          </div>
          <div className='btnContainer'>
            <button onClick={prev}>Back</button>
            <button
              type='submit'
              className='RightBtn'
            >Get My Free Ticket</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AttendeeForm
