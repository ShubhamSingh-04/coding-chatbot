const executeCode = async(sourceCode, language, inputs = "")=> {

  const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

  // Language mapping (adjust based on supported languages in Piston API)
  const languageVersions = {
      "c": "gcc",            // C (GCC)
      "java": "java",        // Java
      "python": "python3",   // Python 3
      "javascript": "javascript" // Node.js
  };

  const languageKey = languageVersions[language.toLowerCase()];
  if (!languageKey) {
      throw new Error(`Unsupported language: ${language}`);
  }

  try {
      // Step 1: Create the request
      const requestBody = {
          language: languageKey,
          version: "*", // Use "*" to automatically select the latest version
          files: [
              {
                  name: "main",
                  content: sourceCode,
              }
          ],
          stdin: inputs, // Pass inputs as standard input
      };

      const response = await fetch(PISTON_API_URL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
      });

      // Step 2: Check the response status
      if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Error: ${response.statusText}, Details: ${errorDetails}`);
      }

      // Step 3: Parse and return the response
      const result = await response.json();
      return {
          output: result.run.stdout,
          err: result.run.stderr,
          code: result.run.code,
          signal: result.run.signal,
          time: result.run.time,
          memory: result.run.memory,
      };
  } catch (error) {
      console.error("Error running code with Piston:", error.message);
      throw error;
  }
}


// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const executeCode = async (code, language) => {
//   console.log("codeexe lang:", language);
//   console.log("codeexe code:\n", code);

//   const apiUrl = "https://api.paiza.io/runners/create";
//   const data = {
//     source_code: code,
//     language: language,
//     api_key: "guest"
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });

//     const result = await response.json();
//     // console.log("codeexe result:", result);

//     if (!result.id) {
//       return { error: "Failed to create runner." };
//     }

//     const statusUrl = `https://api.paiza.io/runners/get_details?id=${result.id}&api_key=guest`;

//     // Poll for results
//     while (true) {
//       const statusResponse = await fetch(statusUrl);
//       const statusResult = await statusResponse.json();

//       if (statusResult.status === "completed") {
//         // console.log("codeexe: statisRes: ", statusResponse);
//         return { output: statusResult.stdout, err: statusResult.stderr };
//       }
//     }
//   } catch (error) {
//     return { error: error.message };
//   }
// };


module.exports = {executeCode};
