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
        {isTyping && <div>{currentMessage}</div>}
      </div>
    </div>
  );
};

export default ChatTranscription;
