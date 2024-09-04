import React from 'react';

const ChatTranscription = ({ messages, isTyping, currentMessage }) => {
  return (
    <div className="chat-box">
      <div id="messages" className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.role.includes('Kundenberater')? <div className='beraterLbl'>{msg.role}: {msg.name}</div>:<div className='kundeLbl'>{msg.role}: {msg.name}</div>}
            <div className={msg.role.includes('Kundenberater') ? 'advisor-message' : 'customer-message'}>
              {msg.phrase}
            </div>   
          </div>

        ))}
        {isTyping &&
        (messages.length<=0?
          <div>
              {<div className='beraterLbl'>Kundenberaterin: Melanie Sperling</div>}
            <div className={'advisor-message'}>
              {currentMessage}
            </div>   
          </div>
      :
          <div>
            {messages.length % 2 != 0? <div className='kundeLbl'>Kunde: Max Mustermann</div>:<div className='beraterLbl'>Kundenberaterin: Melanie Sperling</div>}
            <div className={messages.length % 2 == 0 ? 'advisor-message' : 'customer-message'}>
            {currentMessage}
            </div>   
          </div>
        )
        }
        <div className="spacing"></div>
      </div>
    </div>
  );
};

export default ChatTranscription;
