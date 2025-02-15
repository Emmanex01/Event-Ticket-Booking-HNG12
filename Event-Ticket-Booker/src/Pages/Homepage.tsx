import { useEffect, useState } from "react"
import Header from "../Components/Header/Header"
import TicketList from "../Components/TicketList/TicketList"
import './Homepage.css'
import AttendeeForm from "../Components/AttendeeForm/AttendeeForm"
import SuccessScreen from "../Components/SuccessScreen/SuccessScreen"




// const schema = z.object({
//   fullName: z.string(),
//   email: z.string().email(),
//   request: z.string(),
//   avatar: z.string()
// })

// type FormProps = z.infer<typeof schema>;

type FormProps = {
  fullName: string,
  email: string,
  request: string,
  avatar: string,
}

const Homepage = () => {
  // current step state
  // const [currentStep, setCurrentSteps] = useState(1);
  // const [selectedTicket, setSelectedTicket] = useState('REGULAR ACCESS');
  // const [formData, setFormData] = useState<FormProps>({
  //   fullName: '',
  //   email: '',
  //   request: '',
  //   avatar: '',
  // });
  // Initialize state from localStorage
  const [currentStep, setCurrentSteps] = useState(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep) : 1;
  });

  const [selectedTicket, setSelectedTicket] = useState(() => {
    return localStorage.getItem('selectedTicket') || 'REGULAR ACCESS';
  });

  const [formData, setFormData] = useState<FormProps>(() => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : { 
      fullName: '', 
      email: '', 
      request: '', 
      avatar: '' 
    };
  });

  // Persist form data
useEffect(() => {
  localStorage.setItem('formData', JSON.stringify(formData));
}, [formData]);

// Persist current step
useEffect(() => {
  localStorage.setItem('currentStep', currentStep.toString());
}, [currentStep]);

// Persist selected ticket
useEffect(() => {
  localStorage.setItem('selectedTicket', selectedTicket);
}, [selectedTicket]);
  const [error, setError] = useState<FormProps>({
    fullName: '',
    email: '',
    request: '',
    avatar: '',
  })

  // Warn about unsaved changes
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (currentStep !== 3) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [currentStep]);


  // Handles Form data
  const handleFormData = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  // Handles file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  let ticketHeader = null;
  if (currentStep == 1) {
    ticketHeader = "Ticket Selection"
  } else if (currentStep == 2) {
    ticketHeader = "Attendee Details"
  } else {
    ticketHeader = "Ready"
  }

  // Handles Form Submission
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    // Manual Validation
    if(!formData.email.includes('@')){
      setError(prev => ({...prev, email: "Please provide a valid email"}))
      return;
    }

    if(formData.fullName.length < 6){
      setError(prev => ({...prev, fullName: "Letters must be up to 6"}))
      return;
    } 
    console.log(formData)

    handleNext();
  }


  // Handle selected Ticket type
  const handleSelectedTicketType = (data: string) => {
    setSelectedTicket(data)
  }

  // Update handleNext to clear storage on final step
const handleNext = () => {
  setCurrentSteps(prev => {
    const nextStep = Math.min(prev + 1, 3);
    
    if (nextStep === 3) {
      // Clear storage when reaching success screen
      localStorage.removeItem('formData');
      localStorage.removeItem('currentStep');
      localStorage.removeItem('selectedTicket');
    }
    
    return nextStep;
  });
};

const handlePrev = () => {
  setCurrentSteps(prev => {
    const nextStep = Math.max(prev - 1, 1);
    return nextStep
    }
  )}

  // // Handles the next click to another page
  // const handleNext = () => {
  //   setCurrentSteps(prev => Math.min(prev + 1, 3))
  // }

  const Bar = (currentStep/3 * 100)

  return (
    <div>
      <Header/>
      <div className="">
        <div className="eventContainer">
            <div className="StepIndicator">
              <h1>{ticketHeader}</h1>
              <p>{`Step ${currentStep}/3`}</p>
            </div>
            <div className="progressBar">
              <p className="barIndicator" style={{width: `${Bar}%`}}></p>
            </div>
            {
              currentStep == 1 && 
              <TicketList
              onSelectTicket={handleSelectedTicketType}
              onNext={handleNext}
            />
            }

            {
              currentStep == 2 && 
              <AttendeeForm
              onNext={handleNext}
              formData={formData}
              handleFormData={handleFormData}
              handleFileUpload={handleFileUpload}
              handleSubmit={handleSubmit}
              errorMsg={error}
              prev={handlePrev}
              />
            }

            {
              currentStep == 3 && 
              <SuccessScreen
                formData={formData}
                selectedTicket={selectedTicket}
                prev={handlePrev}
              />
            }
            
        </div>
      </div>
    </div>
  )
}

export default Homepage
