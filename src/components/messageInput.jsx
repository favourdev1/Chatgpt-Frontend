import React, { useState } from "react";
// import { useState } from "react";
const MessageInput = ({ onSendData }) => {
    const [text,setText ] = useState('')
    
  const handleClick = (message) => {
    onSendData(message); // Call the callback function with data
    setTimeout(() => {
      
      setText('') // Clear the input field
    }, 100);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Check if Enter was pressed without Shift
      event.preventDefault(); // Prevent the default action (new line)
      handleClick(text);
    }
  };

  
  return (
    <div className="flex items-center flex-col justify-between px-4 pt-4   w-full ">
      <div className="w-full xl:w-1/2 ">
        <div className=" px-4 rounded-xl flex items-center border border-chatgpt-border-gray  mx-auto py-1">
          <textarea
            id="question"
            tabindex="0"
            dir="auto"
            rows="1"
            value={text}
            onKeyPress={handleKeyPress}
            onChange={(event)=>setText(event.target.value)}
            placeholder="Message ChatGPT…"
            className="m-0 w-full text-base  border-0 rounded-2xl resize-none bg-transparent focus:ring-0 focus-visible:ring-0 outline-0 dark:bg-transparent py-[10px] pr-10 md:py-3 md:pr-12 max-h-[25dvh] max-h-52 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
            style={{ overflowY: "hidden" }}
          ></textarea>
          <button
            id="sendButton"
            onClick={()=>
                handleClick(text)}
            className="w-max  p-1.5 text-white rounded-xl"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white "
            >
              <path
                d="M7 11L12 6L17 11M12 18V7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <p className="text-center w-full text-xs text-gray-400 mt-4 mb-0">
        ChatGPT can make mistakes. Consider checking important information.
      </p>
    </div>
  );
};
export default MessageInput;
