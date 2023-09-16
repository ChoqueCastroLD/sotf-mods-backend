import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { closest } from "https://deno.land/x/fastest_levenshtein@1.0.10/mod.ts";
import { kelvinPrompt, commands } from "../util/kelvin-gpt.ts";
import { sanitizeInput } from "../util/sanitize.ts";
import { prisma } from "../services/prisma.ts";

export default {
  prompt: async function (context: Context) {
    const text = context.request.url.searchParams.get("text");
    const robbyContext = context.request.url.searchParams.get("context") + "";
    const chatId = (context.request.url.searchParams.get("chat_id") + "").trim();
    const messages = chatId ? (await prisma.kelvinGPTMessages.findMany({
      where: {
        chatId
      },
      orderBy: {
        updatedAt: "asc"
      }
    })) : [];

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
    const raw = JSON.stringify({
      "env": "chatbot",
      "session": "N/A",
      "prompt": prompt,
      "context": prompt,
      "messages": messages.map(msg => ({
        "id": msg.id,
        "role": msg.role,
        "content": msg.message,
        "who": msg.who,
        "html": ""
      })),
      "newMessage": sanitizedText,
      "userName": "",
      "aiName": "",
      "model": "gpt-3.5-turbo",
      "temperature": 0.8,
      "maxTokens": 1024,
      "maxResults": 1,
      "apiKey": "",
      "service": "openai",
      "embeddingsIndex": "",
      "stop": "",
      "clientId": "t5l15gkth",
    });

    try {
      const r = await fetch(Deno.env.get("KELVINGPT_API") + "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authority": Deno.env.get("KELVINGPT_API_AUTHORITY") + "",
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
      context.response.body = command + "|" + answer;
    } catch (error) {
      console.log({ sanitizedText });
      console.log("error", error);
      context.response.body =
        "|My eyes are way too blurry, Sorry I can't read that.";
    }
  },
  clear: async function (context: Context) {
    const chatId = (context.request.url.searchParams.get("chat_id") + "").trim();
    await prisma.kelvinGPTMessages.deleteMany({
      where: {
        chatId
      }
    });
    context.response.body = "Chat cleared";
  }
}