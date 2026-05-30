import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { getNotifications } from "../api/notificationApi";
import FilterBar from "../components/FilterBar";
import NotificationCard from "../components/NotificationCard";
import { getTopPriorityNotifications } from "../utils/priority";
import { Log } from "../utils/logger";

function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [seenIds, setSeenIds] = useState([]);
  const [type, setType] = useState("");
  const [view, setView] = useState("all");
  const [limit, setLimit] = useState(10);
  const [page] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("seenNotifications")) || [];
    setSeenIds(storedIds);
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      setError("");

      try {
        const result = await getNotifications({ limit, page, type });
        setNotifications(result);
        await Log("frontend", "info", "page", "Dashboard data loaded");
      } catch (error) {
        setError(error.message || "Notifications could not be loaded. Please try again.");
        await Log("frontend", "error", "page", "Dashboard failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [page, type, limit]);

  const unreadNotifications = useMemo(() => {
    return notifications.filter((item) => !seenIds.includes(item.ID));
  }, [notifications, seenIds]);

  const visibleNotifications = useMemo(() => {
    if (view === "priority") {
      return getTopPriorityNotifications(unreadNotifications, limit);
    }

    return notifications.slice(0, limit);
  }, [notifications, unreadNotifications, view, limit]);

  const handleMarkSeen = async (id) => {
    const updatedIds = [...seenIds, id];
    setSeenIds(updatedIds);
    localStorage.setItem("seenNotifications", JSON.stringify(updatedIds));

    await Log("frontend", "info", "state", "Notification marked as viewed");
  };

  return (
    <Container maxWidth="lg" className="page">
      <Box className="top-section">
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Campus Notifications
          </Typography>

          <Typography color="text.secondary">
            Track placement, event, and result updates in one place.
          </Typography>
        </Box>

        <Box className="stats-box">
          <Typography variant="h5">{unreadNotifications.length}</Typography>
          <Typography variant="body2">Unread</Typography>
        </Box>
      </Box>

      <FilterBar
        type={type}
        setType={setType}
        view={view}
        setView={setView}
        limit={limit}
        setLimit={setLimit}
      />

      {loading && (
        <Box className="center-box">
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && visibleNotifications.length === 0 && (
        <Alert severity="info">No notifications found.</Alert>
      )}

      <Box className="notification-grid">
        {visibleNotifications.map((item) => (
          <NotificationCard
            key={item.ID}
            notification={item}
            isSeen={seenIds.includes(item.ID)}
            onMarkSeen={handleMarkSeen}
          />
        ))}
      </Box>
    </Container>
  );
}

export default Dashboard;