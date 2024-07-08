import react from "react";
import Splashchat from "./splash";
import MessageInput from "../messageInput";
import { useState, useEffect, useRef } from "react";
import ChatGptIcon from "../svg/chatgptIcon";
import axios from "axios";
import userProfile from "../../assets/userimage.jpg";
const MainContainer = () => {
  
  let [allMessages, setAllMessages] = useState([]); // State to store message
  let [isLoading, setIsLoading] = useState(false);
      let [titleMessage,setTitleMessage] = useState("");
  const messagesEndRef = useRef(null);
let [errorText, setErrorText] = useState("");





  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [allMessages]);

  const handleDataFromChild = (data) => {
    // Callback function to receive data
    // setsentMessage(data);

    if (data.trim().length < 1) {
      return
    }
    // console.log(allMessages);
    sendRequest(data);
  };


  const clearErrorText = () => {
    setErrorText("");
  };

  const sendRequest = async (message) => {
    let url = "https://chatgpt-backend-2qe8.onrender.com/";
    url = "http://localhost:3001/"
    let userMessage = {
      role: "user",
      text: message,
    };

      
    let newAllMessages = [...allMessages, userMessage];
    setAllMessages((prevMessages) => [...prevMessages, userMessage]);
    console.log(allMessages)
      // Add the new message to the allMessages array
      // setAllMessages((prevMessages) => [...prevMessages, newMessage]);

    
    try {
      // console.log(typeof(allMessages));
      setIsLoading(true);
      const response = await axios.post(url, { messages: newAllMessages,title:titleMessage });
      setIsLoading(false);
      // console.log(response.data.data);
      // return;
      let aiMessage = {
        role: "assistant",
        text: response.data.data[0].text,
      };
     
      setTitleMessage(response.data.title)

      setAllMessages((prevMessages) => [...prevMessages, aiMessage]);

      // console.log(allMessages);
    } catch (error) {
      setIsLoading(false);
      setErrorText(error.response.data.message);
      // const timer = setTimeout(() => {
      //  setErrorText("");
      // }, 3000);
      console.log(error.response.data.message);
      // return () => clearTimeout(timer);
      // console.log(errorText)
    }
  };



  return (
    <div className="flex flex-col items-center   px-4 py-4  bg-transparent flex-1 relative">
      <div className="w-full xl:w-1/2   h-[85vh]  text-sm  overflow-y-scroll no-scrollbar  ">
        {allMessages.length < 1 ? (
          <Splashchat />
        ) : (
          <div id="messagecontainer" className="pt-14">
            {allMessages.map((message, index) => (
              <div className="text-left  w-full mt-3 mb-5" key={index}>
                <div className="flex items-start prose">
                  <div className="flex-shrink-0">
             
                    {message.role == "user" ? (
                      <img src={userProfile} alt="userprofile"  className="h-3/5 w-3/5 p-0 m-0 rounded-full border border-chatgpt-border-gray border-2"/>
                    ) : (
                      <ChatGptIcon />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white pt-0 mt-0">
                      {message.role=="assistant"?"ChatGPT":"User"}
                    </div>
                    <div className="mt- text-base text-gray-100">
                      {message.text}
                    </div>
                  </div>
                </div>
                <div ref={messagesEndRef} />
              </div>
            ))}
          </div>
        )}
        {/* <p>Message from Child: {sentMessage}</p> */}

        {/* alert like react alert*/}
   

      </div>
      <MessageInput onSendData={handleDataFromChild} isLoading={isLoading} errorText={errorText} clearError={clearErrorText} />
     
    </div>
  );
};

export default MainContainer;
