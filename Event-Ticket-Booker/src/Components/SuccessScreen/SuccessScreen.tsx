import './SuccessScreen.css';
import successImg from '../../assets/successImg.jpg'
type Props = {
  formData: {
    fullName: string,
    email: string,
    request: string,
    avatar: string,
  },
  selectedTicket: string,
  prev: () => void
}

const SuccessScreen: React.FC<Props> = ({formData, selectedTicket, prev}) => {
  return (
    <div className='successScreenContainer'>
      <h1>Your Ticket is Booked</h1>
      <p> You can download or Check your email for a copy</p>
      
      <div className='successBox'>
        <div className='successCardContainer'>
      
        <div className='successCard'>
          <h1>Techember Fest "25</h1>
          <p>04 Rumens road, Ikoyi, Lagos</p>
          <p>March 15, 2025 | 7: 00 PM</p>
          <div className='successImgBox'>
            <img className='successImg' src={formData.avatar} alt="" />
          </div>
          <div className='successCardDetailBox'>
            <div className='successCardDetail'>
              <div className='L first'>
                <p>Enter your name</p>
                <h3>{formData.fullName}</h3>
              </div>
              <div className='R first'>
                <p>Enter your email</p>
                <h3>{formData.email}</h3>
              </div>
              <div className='L second'>
                <p>Ticket Type:</p>
                <h3>{selectedTicket}</h3>
              </div>
              <div className='R second'>
                <p>Ticket for:</p>
                <h3>Emmanuel</h3>
              </div>
            </div>
            <div className='successCardFooter'>
                <p className='p'>Special request?</p>
                <p className='requestText'>{formData.request}</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className='successBtn'>
          <button onClick={prev}>Book Another Ticket</button>
          <button className='RightBtn'>Download Ticket</button>
      </div>
      
    </div>
  )
}


export default SuccessScreen