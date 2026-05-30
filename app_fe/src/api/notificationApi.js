import { Log } from "../utils/logger";

const BASE_URL = "http://4.224.186.213/evaluation-service/notifications";

export async function getNotifications({ limit = 10, page = 1, type = "" }) {
  const token = import.meta.env.VITE_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Access token is missing");
  }

  const params = new URLSearchParams();

  params.append("limit", String(limit));
  params.append("page", String(page));

  if (type !== "") {
    params.append("notification_type", type);
  }

  try {
    await Log("frontend", "info", "api", "Fetching notifications");

    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Notification API failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    await Log("frontend", "info", "api", "Notifications fetched successfully");

    return data.notifications || [];
  } catch (error) {
    await Log("frontend", "error", "api", "Notification API request failed");
    throw error;
  }
}