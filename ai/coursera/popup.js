// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Allow button - extract and send data, then close popup
  document.getElementById("allow").addEventListener("click", async () => {
    const oneMonthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

    chrome.history.search({
      text: "coursera.org/learn",
      startTime: oneMonthAgo,
      maxResults: 1000
    }, async (results) => {
      const courseUrls = [...new Set(results.map(r => r.url))];

      if (courseUrls.length > 0) {
        try {
            console.log("Sending:", courseUrls)
          await fetch("http://127.0.0.1:8000/recommend-coursera", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ history: courseUrls })
          });
          console.log("data sent!")
        } catch (err) {
          console.error("Failed to send data:", err);
        }
      }
      
      // Close popup - try multiple methods
      if (chrome.extension) {
        chrome.extension.getViews({type: "popup"})[0]?.close();
      }
      window.close();
      self.close();
    });
  });

  // Block button - just close popup without sending anything
  document.getElementById("block").addEventListener("click", () => {
    // Close popup - try multiple methods
    if (chrome.extension) {
      chrome.extension.getViews({type: "popup"})[0]?.close();
    }
    window.close();
    self.close();
  });
  
});