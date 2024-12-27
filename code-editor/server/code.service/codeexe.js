const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const executeCode = async (code, language) => {
  console.log("codeexe lang:", language);
  console.log("codeexe code:\n", code);

  const apiUrl = "https://api.paiza.io/runners/create";
  const data = {
    source_code: code,
    language: language,
    api_key: "guest"
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    // console.log("codeexe result:", result);

    if (!result.id) {
      return { error: "Failed to create runner." };
    }

    const statusUrl = `https://api.paiza.io/runners/get_details?id=${result.id}&api_key=guest`;

    // Poll for results
    while (true) {
      const statusResponse = await fetch(statusUrl);
      const statusResult = await statusResponse.json();

      if (statusResult.status === "completed") {
        // console.log("codeexe: statisRes: ", statusResponse);
        return { output: statusResult.stdout, err: statusResult.stderr };
      }
    }
  } catch (error) {
    return { error: error.message };
  }
};


module.exports = {executeCode};
