import React, { useState, useEffect } from 'react';
import ChatTranscription from './ChatTranscription';
import PdfViewer from './PdfViewer';
import PopUp from './PopUp';
import { insertCustomerDataIntoPdf } from './pdfUtils';
import dialogues from './dialogues';
import './style.css';
import logo from "./img/logo12_1.png";

function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPflegeantragPopup, setShowPflegeantragPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  // Add message to the chat window
  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(false); // Stop typing effect after message is fully added
  };

  // Display the message word by word
  const displayMessageWordByWord = (message) => {
    const words = message.split(' ');
    let displayedMessage = '';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < words.length) {
        displayedMessage += words[index] + ' ';
        setCurrentMessage(displayedMessage.trim());
        index++;
      } else {
        clearInterval(typingInterval);
        addMessage(displayedMessage.trim()); // Add full message to the chat
      }
    }, 200); // Delay between each word
  };

  // Handle actions triggered by specific dialogues
  const handleAction = (action) => {
    if (action === 'showPopup') {
      setTimeout(() => {
        setShowPflegeantragPopup(true);
      }, 1000); // Delay the popup by 1 second
    } else if (action === 'tickErstantrag') {
      console.log('Ticking Erstantrag...');
      // Logic to tick Erstantrag checkbox in PDF
    } else if (action === 'fillBevollmächtigter') {
      console.log('Filling Bevollmächtigter field...');
      // Logic to fill the Bevollmächtigter field in PDF
    } else if (action === 'tickPflegegeld') {
      console.log('Ticking Pflegegeld...');
      // Logic to tick Pflegegeld checkbox
    } else if (action === 'submitAntrag') {
      console.log('Submitting Antrag...');
      // Logic to submit Antrag form
    }
  };

  // Process the dialogue step and simulate typing effect
  const processDialogueStep = () => {
    const step = dialogues[currentStep];
    if (step) {
      setIsTyping(true); // Start typing effect
      displayMessageWordByWord(`${step.role} ${step.name}: ${step.phrase}`);
      if (step.action) {
        handleAction(step.action);
      }
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Simulate data collection and show a loading screen before showing the PDF
  const simulateLoadingAndShowPdf = () => {
    setIsLoading(true); // Start loading
    setTimeout(() => {
      insertCustomerDataIntoPdf(setPdfUrl, setShowPdf); // Insert customer data and show PDF
      setIsLoading(false); // End loading after "data collection"
    }, 3000); // Simulate a 2-second loading time
  };

  // Add event listener for right arrow key to simulate dialogue
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        processDialogueStep(); // Trigger next dialogue step on right arrow press
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep]); // Depend on currentStep to rebind on step change

  // When the user clicks "Ja" on the popup, the PDF will be shown after loading
  const handleOpenPflegeantrag = () => {
    setShowPflegeantragPopup(false);
    simulateLoadingAndShowPdf(); // Simulate loading and then open PDF
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img width={50} src={logo} alt="logo" />
        <h1>KIBA - KI Beratungs Assistent</h1> {/* Updated Title */}
        <div className="beraterName">Melanie Sperling</div>
        <div className="user-icon d-flex justify-content-center align-items-center">
            <i className="fas fa-user"></i>
        </div>
      </header>
      <div className="main-content ">
        <div className='row content'>
          <div className='col-6'>
            <div className='kundenBox'>
                <div className="kundenInfos">
                  <h5>Kundeninformationen</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Vorname</th>
                        <th>Geburtsdatum</th>
                        <th>Adressinformationen</th>
                      </tr>
                    </thead>
                  <tbody>
                    <tr>
                      <td>Max</td>
                      <td>Mustermann</td>
                      <td>01.01.1958</td>
                      <td>Musterstraße 123, 10115 Berlin</td>
                    </tr>
                  </tbody>
                  </table>
                </div>
            </div>
            <ChatTranscription messages={messages} isTyping={isTyping} currentMessage={currentMessage} /> 
          </div>
          <div className="col-6">
              {showPflegeantragPopup && <PopUp handleOpenPflegeantrag={handleOpenPflegeantrag} />}
              {showPdf && <PdfViewer pdfUrl={pdfUrl} />}
          </div>
        </div>

        {/* Show loading screen when the PDF is being prepared */}
        {isLoading && (
          <div className="loading-screen">
            <p>Wir sammeln Ihre Daten und füllen den Antrag aus...</p>
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
