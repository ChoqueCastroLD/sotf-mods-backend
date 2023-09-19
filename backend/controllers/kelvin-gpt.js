import { closest } from "fastest-levenshtein";
import { kelvinPrompt, commands } from "../util/kelvin-gpt.js";
import { sanitizeInput } from "../util/sanitize.js";
import { prisma } from "../services/prisma.js";

export default {
  prompt: async function (context) {
    const text = context.request.query?.text;
    const robbyContext = context.request.query?.context + "";
    const chatId = (context.request.query?.chat_id + "").trim();
    const messages = chatId ? (await prisma.kelvinGPTMessages.findMany({
      where: {
        chatId
      },
      orderBy: {
        updatedAt: "asc"
      }
    })) : [];
    if (messages.length > 32) {
      const messagesToDeleteIds = messages.slice(32, messages.length).map(msg => msg.id);
      await prisma.kelvinGPTMessages.deleteMany({
        where: {
          id: {
            in: messagesToDeleteIds
          }
        }
      });
    }

    if (!text) {
      context.response.body = "|My eyes are blurry, Sorry I can't read that.";
      return;
    }
    if (text.length > 201) {
      context.response.body = "|Thats too much text, I can't read that.";
      return;
    }

    const sanitizedText = sanitizeInput(text);

    await Promise.resolve();
    const prompt = kelvinPrompt(sanitizeInput(robbyContext));
    messages.push({
      id: -1,
      message: sanitizedText,
      role: "user",
      who: "User: ",
      chatId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const raw = JSON.stringify({
      "env": "chatbot",
      "session": "N/A",
      "prompt": prompt,
      "context": prompt,
      "messages": messages.map((msg, i) => ({
        "id": `${i+1}`,
        "role": msg.role,
        "content": msg.message,
        "who": msg.who,
        "html": ""
      })),
      "newMessage": sanitizedText,
      "userName": "",
      "aiName": "",
      "model": "gpt-3.5-turbo",
      "temperature": 0.1,
      "maxTokens": 1024*4,
      "maxResults": 1,
      "apiKey": "",
      "service": "openai",
      "embeddingsIndex": "",
      "stop": "",
      "clientId": chatId || "t5l15gkth",
    });

    try {
      const r = await fetch(process.env.KELVINGPT_API + "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authority": process.env.KELVINGPT_API_AUTHORITY + "",
        },
        body: raw,
        redirect: "follow",
      });
      const response = await r.json();
      console.log({ response });
      let command = "";
      let answer = "";
      if (response.answer.includes("|")) {
        command = response.answer.split("|")[0].trim();
        if (command) {
          console.log({ command, parsedTo: closest(command, commands) });
          command = closest(command, commands);
        }
        answer = sanitizeInput(response.answer.split("|")[1]).trim();
      } else {
        command = ""
        answer = response.answer.trim();
      }
      if (chatId) {
        await prisma.kelvinGPTMessages.create({
          data: {
            chatId,
            message: sanitizedText,
            role: "user",
            who: "User: ",
          }
        }),
        await prisma.kelvinGPTMessages.create({
          data: {
            chatId,
            message: answer,
            role: "assistant",
            who: "AI: ",
          }
        })
      }
      console.log({ chatId, sanitizedText, answer, messages, robbyContext: sanitizeInput(robbyContext) });
      console.log(messages)
      console.log(messages.length)
      context.response.body = command + "|" + answer;
    } catch (error) {
      console.log({ sanitizedText });
      console.log("error", error);
      context.response.body =
        "|My eyes are way too blurry, Sorry I can't read that.";
    }
  },
  clear: async function (context) {
    const chatId = (context.request.query?.chat_id + "").trim();
    await prisma.kelvinGPTMessages.deleteMany({
      where: {
        chatId
      }
    });
    context.response.body = "Chat cleared";
  }
}