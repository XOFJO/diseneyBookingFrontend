import OpenAI from "openai";
import dotenv from "dotenv";

// 确保 dotenv 在任何使用 process.env 的代码之前加载
dotenv.config();

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com", // DeepSeek API 的基础 URL
  apiKey: process.env.VITE_DEEPSEEK_API_KEY, // 从 .env 文件中读取 API Key
});

async function testDeepSeek() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: "你好" }],
      model: "deepseek-chat", // 确保模型名称正确
    });

    console.log("DeepSeek Response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error testing DeepSeek API:", error);
  }
}

testDeepSeek();