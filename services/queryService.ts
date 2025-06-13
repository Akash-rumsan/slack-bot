// File: services/queryService.ts
import axios from "axios";
import { extractPlainText } from "../utils/extractPlainText";

export async function getQueryResponse(query: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.mefqna.dev.rumsan.net/query/query_collection",
      {
        query,
        top_k: 3,
        temperature: 0.3,
      }
    );
    console.log("API response:", response.data.response);

    // Extract the plain text from the response
    const answer =
      extractPlainText(response.data?.response || "") ||
      "Sorry, I couldn't find an answer.";
    //response.data?.response || "Sorry, I couldn't find an answer.";
    return answer;
  } catch (error) {
    console.error("Error calling MEF API:", error);
    return "There was an error processing your request.";
  }
}
