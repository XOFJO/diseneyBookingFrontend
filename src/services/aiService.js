import axios from "axios";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

const tools = [
  {
    type: "function",
    function: {
      name: "get_room_reviews",
      description: "Get all user reviews for the current room",
      parameters: {
        type: "object",
        properties: {
          roomId: {
            type: "string",
            description: "Room ID"
          },
          roomTheme: {
            type: "string", 
            description: "Room theme"
          }
        },
        required: ["roomId"]
      }
    }
  }
];

// Mock data - simulating review data from RoomReview.jsx
const mockReviews = [
  {
    id: 2,
    userName: "Michael Chen",
    rating: 5.0,
    date: "2024-12-10",
    comment: "Amazing experience! The room was spacious and beautifully decorated. Great value for money and the location couldn't be better. The booking process was smooth and check-in was quick."
  },
  {
    id: 3,
    userName: "Emma Rodriguez",
    rating: 4.8,
    date: "2024-12-08",
    comment: "Fantastic accommodation with modern facilities and excellent service. The room was spotless and the bed was incredibly comfortable. Perfect for both business and leisure travelers."
  },
  {
    id: 4,
    userName: "David Thompson",
    rating: 4.2,
    date: "2024-12-05",
    comment: "Great location and friendly staff. The room was clean and had all the necessary amenities. The only minor issue was the air conditioning, but overall a pleasant stay."
  },
  {
    id: 5,
    userName: "Lisa Park",
    rating: 4.9,
    date: "2024-12-02",
    comment: "Exceeded all expectations! The room was luxurious, the view was breathtaking, and the service was impeccable. The breakfast was delicious and the spa facilities were top-notch."
  },
  {
    id: 6,
    userName: "James Wilson",
    rating: 4.6,
    date: "2024-11-28",
    comment: "Wonderful stay for our anniversary. The room was romantic and beautifully appointed. The concierge helped us plan perfect evening activities. Highly recommend for couples."
  },
  {
    id: 7,
    userName: "Maria Garcia",
    rating: 4.4,
    date: "2024-11-25",
    comment: "Perfect for business travel. Fast wifi, comfortable workspace, and excellent room service. The location made it easy to reach all my meetings. Will definitely book again."
  },
  {
    id: 8,
    userName: "Robert Kim",
    rating: 3.8,
    date: "2024-11-20",
    comment: "Decent stay overall. The room was comfortable and the location was convenient. Staff was helpful though check-in took longer than expected. Good value for the price."
  },
  {
    id: 9,
    userName: "Jennifer Lee",
    rating: 4.7,
    date: "2024-11-18",
    comment: "Lovely hotel with beautiful architecture. The room was spacious and well-designed. The restaurant had excellent food and the staff went above and beyond to make our stay special."
  },
  {
    id: 10,
    userName: "Alex Turner",
    rating: 4.3,
    date: "2024-11-15",
    comment: "Good location and clean facilities. The room had everything we needed for our short stay. The front desk staff was particularly helpful with local recommendations."
  },
  {
    id: 11,
    userName: "Sophie Martin",
    rating: 4.8,
    date: "2024-11-12",
    comment: "Outstanding service and beautiful accommodations. The room was pristine and the amenities were first-class. The pool and fitness center were excellent. Highly recommended!"
  },
  {
    id: 12,
    userName: "Carlos Santos",
    rating: 4.1,
    date: "2024-11-08",
    comment: "Nice hotel in a great location. The room was comfortable and the staff was friendly. The only downside was some noise from the street, but the quality of service made up for it."
  },
  {
    id: 13,
    userName: "Rachel Davis",
    rating: 4.9,
    date: "2024-11-05",
    comment: "Absolutely perfect stay! The room was immaculate, the bed was incredibly comfortable, and the bathroom was luxurious. The hotel staff anticipated every need. Can't wait to return!"
  }
];

const toolFunctions = {
  get_room_reviews: async (args) => {
    try {
      const { roomId, roomTheme } = args;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock data
      return {
        success: true,
        data: {
          reviews: mockReviews,
          totalReviews: mockReviews.length,
          averageRating: (mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length).toFixed(1),
          roomId,
          roomTheme
        },
        roomId,
        roomTheme
      };
    } catch (error) {
      console.error('Failed to fetch room reviews:', error);
      return {
        success: false,
        error: 'Unable to fetch review data',
        roomId: args.roomId
      };
    }
  }
};

export const summarizeRoomReviews = async (roomId, roomTheme = '') => {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a professional hotel review analysis assistant. Your tasks are:
1. Get user review data for the room
2. Analyze overall sentiment of reviews
3. Extract key pros and cons
4. Generate a concise summary report
5. Reply in English with a friendly and professional tone

Please always use the provided tool functions to get the latest review data.`
      },
      {
        role: "user",
        content: `Please analyze user reviews for room ID ${roomId}${roomTheme ? ` (theme: ${roomTheme})` : ''} and generate a summary report.`
      }
    ];

    const response = await axios.post(DEEPSEEK_API_URL, {
      model: "deepseek-chat",
      messages: messages,
      tools: tools,
      tool_choice: "auto"
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const message = response.data.choices[0].message;

    // If AI decides to call tools
    if (message.tool_calls) {
      const toolResults = [];
      
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        // Execute corresponding tool function
        const result = await toolFunctions[functionName](functionArgs);
        
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result)
        });
      }
      
      // Send tool results back to AI for final response
      const finalResponse = await axios.post(DEEPSEEK_API_URL, {
        model: "deepseek-chat",
        messages: [
          ...messages,
          message,
          ...toolResults
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      return {
        success: true,
        summary: finalResponse.data.choices[0].message.content,
        roomId
      };
    }
    
    return {
      success: true,
      summary: message.content,
      roomId
    };
  } catch (error) {
    console.error('AI review summarization failed:', error);
    return {
      success: false,
      error: error.message || 'Failed to generate summary',
      roomId
    };
  }
};

export const streamingSummarizeReviews = async (roomId, roomTheme = '', onChunk) => {
  try {
    // First, make a non-streaming call to handle function calling
    const messages = [
      {
        role: "system",
        content: `You are a professional hotel review analysis assistant. Your tasks are:
1. Get user review data for the room
2. Analyze overall sentiment of reviews
3. Extract key pros and cons
4. Generate a concise summary report
5. Reply in English with a friendly and professional tone

Please always use the provided tool functions to get the latest review data.`
      },
      {
        role: "user",
        content: `Please analyze user reviews for room ID ${roomId}${roomTheme ? ` (theme: ${roomTheme})` : ''} and generate a summary report.`
      }
    ];

    const response = await axios.post(DEEPSEEK_API_URL, {
      model: "deepseek-chat",
      messages: messages,
      tools: tools,
      tool_choice: "auto"
    }, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const message = response.data.choices[0].message;

    // If AI decides to call tools
    if (message.tool_calls) {
      if (onChunk) {
        onChunk('Retrieving review data...', 'Retrieving review data...');
      }

      const toolResults = [];
      
      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        // Execute corresponding tool function
        const result = await toolFunctions[functionName](functionArgs);
        
        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result)
        });
      }

      if (onChunk) {
        onChunk('\n\nAnalyzing reviews...', 'Retrieving review data...\n\nAnalyzing reviews...');
      }
      
      // Now make streaming call with tool results
      const streamResponse = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            ...messages,
            message,
            ...toolResults
          ],
          stream: true
        })
      });

      if (!streamResponse.ok) {
        throw new Error(`HTTP error! status: ${streamResponse.status}`);
      }

      const reader = streamResponse.body.getReader();
      const decoder = new TextDecoder();
      let fullText = 'Retrieving review data...\n\nAnalyzing reviews...';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                fullText += content;
                if (onChunk) {
                  onChunk(content, fullText);
                }
              }
            } catch (e) {
              // Skip invalid JSON
              continue;
            }
          }
        }
      }

      return {
        success: true,
        summary: fullText,
        roomId
      };
    }
    
    // If no tool calls, just return the message
    return {
      success: true,
      summary: message.content,
      roomId
    };
  } catch (error) {
    console.error('Streaming summarization failed:', error);
    return {
      success: false,
      error: error.message || 'Streaming summarization failed',
      roomId
    };
  }
};