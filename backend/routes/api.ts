import { Context, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export const router = new Router();

const commands = [
  "follow_me",
  "get.berries.fill_holder",
  "get.berries.drop_here",
  "get.berries.give_to_me",
  "get.berries.follow_me",
  "get.berries.fill_sled",
  "get.fish.fill_holder",
  "get.fish.drop_here",
  "get.fish.give_to_me",
  "get.fish.follow_me",
  "get.fish.fill_sled",
  "get.sticks.fill_holder",
  "get.sticks.drop_here",
  "get.sticks.give_to_me",
  "get.sticks.follow_me",
  "get.sticks.fill_sled",
  "get.rocks.fill_holder",
  "get.rocks.drop_here",
  "get.rocks.give_to_me",
  "get.rocks.follow_me",
  "get.rocks.fill_sled",
  "get.stones.fill_holder",
  "get.stones.drop_here",
  "get.stones.give_to_me",
  "get.stones.follow_me",
  "get.stones.fill_sled",
  "get.arrows.fill_holder",
  "get.arrows.drop_here",
  "get.arrows.give_to_me",
  "get.arrows.follow_me",
  "get.arrows.fill_sled",
  "get.radio.fill_holder",
  "get.radio.drop_here",
  "get.radio.give_to_me",
  "get.radio.follow_me",
  "get.radio.fill_sled",
  "get.logs.fill_holder",
  "get.logs.drop_here",
  "get.logs.give_to_me",
  "get.logs.follow_me",
  "get.logs.fill_sled",
  "build.fire",
  "build.shelter",
  //"build.perimeter_wall",
  "clear_shelter",
  "finish_structure",
  "reset_traps",
  "fuel_fire",
  "stay.here",
  "stay.shelter",
  "stay.hidden",
  "take_a_break",
  "clear.5_meters",
  "clear.10_meters",
  "clear.20_meters",
  "give_items",
];

function sanitizeInput(input: string) {
  if (!input) return "";
  const allowedPattern = /[^a-zA-Z0-9,.!? ]/g;
  const sanitizedInput = input.replace(allowedPattern, "");
  return sanitizedInput.trim();
}

router.get("/api/kelvin-gpt", async (context: Context) => {
  const text = context.request.url.searchParams.get("text");
  const id = context.request.url.searchParams.get("id");
  const robbyContext = context.request.url.searchParams.get("context") + "";
  if (!text) {
    context.response.body = "|My eyes are blurry, Sorry I can't read that.";
    return;
  }
  if (text.length > 201) {
    context.response.body = "|Thats too much text, I can't read that.";
  }

  const sanitizedText = sanitizeInput(text);

  await Promise.resolve();
  const prompt = `
    You wil now help me generate text for a videogame character.

    Character Name: Kelvin
    Character aliases: Kelvin, Rob, Robby, Robbert
    Description: I am a highly trained soldier, my code name is Kelvin. I accompanied the protagonist on a mission to locate a missing billionaire family, the Pufftons. we have been in a helicopter crash that left me with brain damage, resulting in deafness. As a result, I rely on written communication via the notepad. Despite my disability, I will provide assistance, helping with various tasks.
    Current Context: ${sanitizeInput(robbyContext)}
    Commands: ${commands.join(",")}
    Remember you can not combine multiple commands, only choose one or leave empty and just respond as Kelvin would.    
    Now we have to convert the player text input into a valid command and a response from Kelvin 
    Here are some valid and good examples (User Input -> Response):
    - "how are you today, can you get me some wood" -> "get.logs.drop_here|I am fine thank you, I will go get some logs now"
    - "please get logs and follow me" -> "get.logs.follow_me|I will follow you now with the logs"
    - "Stay hidden fast!" -> "stay.hidden|I will stay hidden now, take care"
    - "I  am cold, please build a fire" -> "build.fire|Do not worry, I will build a fire now"
    - "Hi Kelvin, how are you" -> "|Hello! I'm doing well, How are you?"

    Considerations:
    - if the user input is just chatting leave the command empty and just answer as kelvin would in a nicely manner
    - if the user input is a command does not fall into any command, just reply with what kelvin would say as an excuse to not do it and leave the command empty
    - You can not combine commands for example "get.fish.take_a_break" is not valid and should be treated as "get.fish.drop_here"
    - command is always lowercase, no spaces, separated with dots
    - Max response size is 300 characters
    - Kelvin is always kind and good humoured
    - Kelvin doesnt offer assitance and doesnt ask if he can help or if he can assist you
    - Kelvin fears the cannibals on the island and will prefer not go near them
    - While on the island there were encounters with Virginia Puffton the daughter of the Pufftons. Virginia's base behavior is like an independent cat.
    - Kelvin never says "as an AI", "as a language model", "i cannot fullfill your request", "How can I assist you today?"
    - If a command is sent, the response from kelvin must be positive
    Remember to add no explanations, and stick to the format "{command}|{kelvin's response}" as your answer will be parsed by another program so do not combine commands.
    Answer the response in english, the commands remain intact, there can only be one separator | in the message
    `.trim();

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
    const r = await fetch("https://noowai.com/wp-json/ai-chatbot/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "authority": "noowai.com",
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
});
