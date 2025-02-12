import Header from "../Components/Header/Header"
import TicketList from "../Components/TicketList/TicketList"

const Homepage = () => {
  return (
    <div>
      <Header/>
      <div>
        <div>
            <TicketList/>
        </div>
      </div>
    </div>
  )
}

export default Homepage
