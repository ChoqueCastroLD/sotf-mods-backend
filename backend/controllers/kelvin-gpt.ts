import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { kelvinPrompt } from "../util/kelvin-gpt.ts";
import { sanitizeInput } from "../util/sanitize.ts";


export default {
    prompt: async function (context: Context) {
    const text = context.request.url.searchParams.get("text");
    const id = context.request.url.searchParams.get("id");
    const robbyContext = context.request.url.searchParams.get("context") + "";
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
      "messages": [],
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
      const r = await fetch(Deno.env.get("KELVINGPT_API")+"", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "authority": Deno.env.get("KELVINGPT_API_AUTHORITY")+"",
        },
        body: raw,
        redirect: "follow",
      });
      const response = await r.json();
      console.log({response});
      let answer = "";
      if (response.answer.includes("|")) {
        answer = response.answer.split("|")[0] + "|" + sanitizeInput(response.answer.split("|")[1]);
      } else {
        answer = "|" + response.answer;
      }
      console.log({ id, sanitizedText, answer, robbyContext: sanitizeInput(robbyContext) });
      context.response.body = answer;
    } catch (error) {
      console.log({ sanitizedText });
      console.log("error", error);
      context.response.body =
        "|My eyes are way too blurry, Sorry I can't read that.";
    }
  }
}