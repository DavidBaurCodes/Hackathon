import React from 'react';

const ChatTranscription = ({ messages, isTyping, currentMessage }) => {
  return (
    <div className="chat-box">
      <div id="messages" className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <div className='beraterLbl'>{msg.includes('Kundenberater') ? 'Kundenberater' : ''}</div>
            <div className='kundeLbl'>{msg.includes('Kundenberater') ? '' : 'Kunde'}</div>
            <div className={msg.includes('Kundenberater') ? 'advisor-message' : 'customer-message'}>
              {msg}
            </div>   
          </div>

        ))}
        {isTyping && <div>{currentMessage}</div>}
      </div>
    </div>
  );
};

export default ChatTranscription;
