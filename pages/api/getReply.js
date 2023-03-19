 
 import axios from 'axios';

//  const apiKey = process.env.OPENAI_API_KEY; 
// 
 const apiKey = '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'; 

 const CHATGPT_MODEL = 'gpt-3.5-turbo';

 class ChatGPTAPI {

  constructor(opts) {
    this.opts = opts;
  }
  sendMessage(message) {
    const { apiKey, completionParams } = this.opts;
    const url = `https://api.openai.com/v1/chat/completions`;
    // const nextNumTokensEstimate = getTokenLength(message);
    // const isValidPrompt = nextNumTokensEstimate <= maxNumTokens;

    // const maxTokens = Math.max(
    //   1,
    //   Math.min(maxModelTokens - nextNumTokensEstimate, maxResponseTokens),
    // );

    return axios
      .post(
        url,
        {
          model: CHATGPT_MODEL,
          temperature: 0.5,
          top_p: 0.8,
          presence_penalty: 1.0,
          ...completionParams,
          // max_tokens: maxTokens,
          max_tokens: 3500,
          messages: [
            {
              role: 'system',
              content: message,
            },
          ],
          stream: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      )
      .catch((e) => {
        console.log(e);
      });
  }
}

 export async function getReply(opts) {
  console.log(apiKey)
  const api = new ChatGPTAPI({
    apiKey: apiKey,
    completionParams: {
      temperature: 0.5,
      top_p: 0.8,
    },
  });

  const prompt = opts.prompt;

  const res = await api.sendMessage(`${prompt}\n`);

  return res.data;
}