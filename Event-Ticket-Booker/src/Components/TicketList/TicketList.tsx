import './TicketList.css'

type propsData = {
  onSelectTicket: (data: string) => void,
  onNext: () => void
}

const TicketList: React.FC<propsData> = ({onSelectTicket, onNext}) => {
  const tickets = [
    { price: 'Free', type: 'REGULAR ACCESS', date: '20/25' },
    { price: '$150', type: 'VIP ACCESS', date: '20/25' },
    { price: '$150', type: 'VVIP ACCESS', date: '20/25' }
  ];


  return (
    <div className='TicketlistMainContainer'>
      <div className='TechemberContainer'>
        <h1>Techember Fest "25</h1>
        <p>Join us for an unforgettable experience at</p>
        <p>[Event Name]! Secure your spot now.</p>
        <p className='TechemberDate'>[Event Location] || March 15, 2025 | 7: 00 PM</p>
      </div>
      <div className='selectTicketContainer'>
        <h2>Select Ticket Type:</h2>
        <div className='ticketCardContainer'>
          {
            tickets.map((ticket, index) => (
              <div key={index} className='ticketCard' onClick={() => onSelectTicket(ticket.type)}>
                <p>{ticket.price}</p>
                <p>{ticket.type}</p>
                <p>{ticket.date}</p>
              </div>
            ))
          }
          
          {/* <div className='ticketCard'>
            <p>Free</p>
            <p>VIP ACCESS</p>
            <p>20/25</p>
          </div>
          <div className='ticketCard'>
            <p>Free</p>
            <p>VVIP ACCESS</p>
            <p>20/25</p>
          </div> */}
        </div>
        <h2>Number of Tickets</h2>
        <select name="" id="ticketNum">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <div className='btnContainer'>
          <button>Cancel</button>
          <button className='RightBtn' onClick={onNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default TicketList
