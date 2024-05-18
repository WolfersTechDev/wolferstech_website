import { useState } from "react";
import axios from 'axios';
import { AiOutlineMessage } from "react-icons/ai"; // Import the chat icon from react-icons

const SupportChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        // Add the user's message to the chat history
        setChatHistory([...chatHistory, { text: message, user: 'user' }]);
        setMessage('');

        // Send the user's message to the AI bot
        try {
            const response = await axios.post('http://192.168.113.9:5000/api/wolfi/web', {
                "user_input":message,
            });

            // Add the bot's response to the chat history
            setChatHistory([...chatHistory, { text: response.data.message, user: 'bot' }]);
            console.log(response.data.message);
        
        } catch (error) {
            console.error('Error sending message to bot:', error);
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            {isOpen ? (
                <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
                    <div className="max-w-md mx-auto p-4">
                        <div className="border rounded-lg p-4 mb-4 h-72 overflow-y-auto">
                            {chatHistory.map((message, index) => (
                                <div
                                    key={index}
                                    className={`${message.sender === 'user' ? 'text-right' : 'text-left'
                                        } mb-2`}
                                >
                                    <span
                                        className={`${message.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'
                                            } text-white px-2 py-1 rounded-lg`}
                                    >
                                        {message.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="flex-grow border rounded-l-lg p-2"
                                placeholder="Type your message..."
                                onChange={handleChange}
                            />
                            <button
                                className="bg-blue-500 text-white p-2 rounded-r-lg"
                                onClick={handleSubmit}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <button
                    className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
                    onClick={toggleChat}
                >
                    <AiOutlineMessage size={24} />
                </button>
            )}
        </div>
    );
};

export default SupportChatButton;
