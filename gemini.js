
async function runChat(userMessage) {
    try {
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userMessage
            })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Gemini request failed");
        }
        return data.response;
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Sorry, I am having trouble responding right now.";
    }
}

export default runChat;