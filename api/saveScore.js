// File: /api/saveScore.js

export default async (req, res) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  // Google Apps Script URL. Use the latest one from your deployment.
  const backendUrl = "https://script.google.com/macros/s/AKfycbxEerD8jG1VbdXT_-2SgRF8FHJwGvz6jl3_lxdgyliAOXHRrivROit1zFhCaUSjEIZytA/exec";
  const googleAppsScriptUrl = `${backendUrl}?path=saveFinalScore`;

  try {
    // Forward the POST request to Google Apps Script
    const response = await fetch(googleAppsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ success: false, message: "Proxy failed to send data to Google Apps Script." });
  }
};
