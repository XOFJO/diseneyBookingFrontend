import axios from "axios";
import { getRoomComments } from "./api";

const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

const fetchRoomReviews = async (hotelId, themeName) => {
  try {
    const response = await getRoomComments(hotelId, themeName);
    return response;
  } catch (error) {
    console.error("Failed to fetch room reviews from API:", error);
    throw new Error("Unable to fetch room reviews");
  }
};

const tools = [
  {
    type: "function",
    function: {
      name: "get_room_reviews",
      description: "Get all user reviews for the current theme room",
      parameters: {
        type: "object",
        properties: {
          themeName: {
            type: "string",
            description: "Room theme",
          },
        },
        required: ["themeName"],
      },
    },
  },
];

const toolFunctions = {
  get_room_reviews: async (args) => {
    try {
      const { themeName } = args;
      const hotelId = args.hotelId || 1;

      const data = await fetchRoomReviews(hotelId, themeName);

      return {
        success: true,
        data: {
          reviews: data,
          totalReviews: data.length,
          averageRating: (
            data.reduce((sum, review) => sum + review.rating || 0, 0) /
            data.length
          ).toFixed(1),
          themeName,
        },
      };
    } catch (error) {
      console.error("Failed to fetch room reviews:", error);
      return {
        success: false,
        error: "Unable to fetch review data",
      };
    }
  },
};

export const summarizeRoomReviews = async (roomId, roomTheme = "") => {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a professional hotel review analysis assistant. Your tasks are:
1. Get user review data for the room
2. Analyze overall sentiment of reviews
3. Extract key pros and cons
4. Generate a concise summary report in MAXIMUM 50 WORDS
5. Reply in English with a friendly and professional tone

Please always use the provided tool functions to get the latest review data. Keep your response under 50 words.`,
      },
      {
        role: "user",
        content: `Please analyze user reviews for room ID ${roomId}${
          roomTheme ? ` (theme: ${roomTheme})` : ""
        } and generate a summary report.`,
      },
    ];

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: messages,
        tools: tools,
        tool_choice: "auto",
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data.choices[0].message;

    if (message.tool_calls) {
      const toolResults = [];

      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        const result = await toolFunctions[functionName](functionArgs);

        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result),
        });
      }

      const finalResponse = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: "deepseek-chat",
          messages: [...messages, message, ...toolResults],
        },
        {
          headers: {
            Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        success: true,
        summary: finalResponse.data.choices[0].message.content,
        roomId,
      };
    }

    return {
      success: true,
      summary: message.content,
      roomId,
    };
  } catch (error) {
    console.error("AI review summarization failed:", error);
    return {
      success: false,
      error: error.message || "Failed to generate summary",
      roomId,
    };
  }
};

export const streamingSummarizeReviews = async (
  hotelId,
  themeName = "",
  onChunk
) => {
  try {
    const messages = [
      {
        role: "system",
        content: `You are a professional hotel review analysis assistant. Your tasks are:
1. Get user review data for the room
2. Analyze overall sentiment of reviews
3. Extract key pros and cons
4. Generate a concise summary report in MAXIMUM 50 WORDS
5. Reply in English with a friendly and professional tone

Please always use the provided tool functions to get the latest review data. Keep your response under 50 words.`,
      },
      {
        role: "user",
        content: `Please analyze user reviews for theme room with ${themeName} and generate a summary report.`,
      },
    ];

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: "deepseek-chat",
        messages: messages,
        tools: tools,
        tool_choice: "auto",
      },
      {
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data.choices[0].message;

    if (message.tool_calls) {
      const toolResults = [];

      for (const toolCall of message.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        functionArgs.hotelId = hotelId;

        const result = await toolFunctions[functionName](functionArgs);

        toolResults.push({
          tool_call_id: toolCall.id,
          role: "tool",
          content: JSON.stringify(result),
        });
      }

      const streamResponse = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [...messages, message, ...toolResults],
          stream: true,
        }),
      });

      if (!streamResponse.ok) {
        throw new Error(`HTTP error! status: ${streamResponse.status}`);
      }

      const reader = streamResponse.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || "";
              if (content) {
                fullText += content;
                if (onChunk) {
                  onChunk(content, fullText);
                }
              }
            } catch (e) {
              console.log(e);
              continue;
            }
          }
        }
      }

      return {
        success: true,
        summary: fullText,
        hotelId,
      };
    }

    return {
      success: true,
      summary: message.content,
      hotelId,
    };
  } catch (error) {
    console.error("Streaming summarization failed:", error);
    return {
      success: false,
      error: error.message || "Streaming summarization failed",
      hotelId,
    };
  }
};
