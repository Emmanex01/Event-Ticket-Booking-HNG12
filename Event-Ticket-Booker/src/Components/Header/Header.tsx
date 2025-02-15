import './Header.css';
import Logo from '../../assets/Logo.png'
import link from '../../assets/Link.png'

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
      <img className='TicketBtn' src={link} alt="" />
    </div>
  )
}

export default Header
