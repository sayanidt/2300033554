const LOG_URL = "http://4.224.186.213/evaluation-service/logs";

export async function Log(stack, level, packageName, message) {
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  if (!token) {
    return;
  }

  try {
    await fetch(LOG_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack: stack,
        level: level,
        package: packageName,
        message: message,
      }),
    });
  } catch {
    // Logging failure should not stop the app
  }
}