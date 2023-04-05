## GPT Translator

### Description
GPT Translator is a web app that translates text from one language to another using the OpenAI API (CHAT GPT).
* Stack: React, Next.js, TailwindCSS, OpenAI API

To run the app in dev mode, you need to create a `.env.local` file in the root directory and add the openia `api_key`
Then you can run the app when you install dependencies with the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

<!-- Open [https://gpt-translator.vercel.app](https://gpt-translator.vercel.app) with your browser to see the result. -->

### Api with OpenAI
The API is used to translate text from one language to another. The API is created in the api folder, witch recieves the text, original language and target language. The API then sends the text to the OpenAI API and returns the translated text.

[POST] /api/translate

```json
{
  "text": "Hello World",
  "fromLanguage": "en",
  "toLanguage": "es"
}
```
