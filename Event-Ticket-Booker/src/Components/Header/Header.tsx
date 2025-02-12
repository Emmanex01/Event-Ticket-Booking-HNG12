import './Header.css';
import Logo from '../../assets/Logo.png'

const Header = () => {
  return (
    <div className="Header">
      <div>
        <img src={Logo} alt="" />
      </div>
      <div>
        <ul className='NavMenu'>
          <li>Event</li>
          <li>My Tickets</li>
          <li>About Projets</li>
        </ul>
      </div>
      <button className='TicketBtn'>My Ticket</button>
    </div>
  )
}

export default Header
