import React, { useState } from "react";

const MessageInput = ({ onSendData, isLoading }) => {
  const [text, setText] = useState('');
let [istyping,setIsTyping]=useState(false)
  const handleClick = (message) => {
    onSendData(message);
    setTimeout(() => {
      setText('');
    }, 100);
  };

  const handleKeyPress = (event) => {
    if (isLoading) return;

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleClick(text);
    }
  };
  
  function checkIfisTyping(text) {
  
    if (text.length > 0) {
      setIsTyping(true)
    }
    else {
      setIsTyping(false)
    }
    setText(text)

  }

  return (
    <div className="flex items-center flex-col justify-between px-1 md:px-4 pt-4 w-full">

      <div className="w-full xl:w-1/2">
        <div className={`transition-all px-4  rounded-xl flex items-center border border-chatgpt-border-gray mx-auto py-1 `}>
          <textarea
            onChange={(e) => checkIfisTyping(e.target.value)}
            id="question"
            tabindex="0"
            dir="auto"
            rows="1"
            value={text}
            onKeyPress={handleKeyPress}
            // onChange={(event) => setText(event.target.value)}
            placeholder="Message ChatGPT…"
            className="m-0 w-full text-base border-0 rounded-2xl resize-none bg-transparent focus:ring-0 focus-visible:ring-0 outline-0 dark:bg-transparent py-[10px] pr-10 md:py-3 md:pr-12 max-h-[25dvh] max-h-52 placeholder-white/50 dark:placeholder-white/50 pl-3 md:pl-4"
            style={{ overflowY: "hidden" }}
          ></textarea>
          <button
            
            id="sendButton"
            onClick={() => handleClick(text)}
            className={`w-max p-1.5 ${!istyping?'text-chatgpt-dark-gray bg-chatgpt-border-gray':'bg-white text-chatgpt-dark-gray'} rounded-xl  ${!isLoading?'scale-1':'scale-0'}  p-2  text-white  duration-200 `}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className=""
            >
              <path
                d="M7 11L12 6L17 11M12 18V7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          {isLoading && (
            <div className="ml-2">
              <svg
                className="animate-spin h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </div>
      <p className="text-center w-full text-xs text-gray-400 mt-4 mb-0">
        ChatGPT can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};

export default MessageInput;
