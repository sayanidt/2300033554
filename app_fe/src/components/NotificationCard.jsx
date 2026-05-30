import {
    Card,
    CardContent,
    Chip,
    Typography,
    Button,
    Box,
} from "@mui/material";
function NotificationCard({ notification, isSeen, onMarkSeen}) {
    return (
        <Card card className={isSeen ? "notification-card seen" : "notification-card"}>
            <CardContent>

                <Box className= "card-header">
                    <Chip
                        label={notification.Type}
                        color={
                            notification.Type === "Placement"
                                ? "primary"
                                : notification.Type === "Event"
                                ? "success"
                                : "warning"
                        }
                        size="small"            
                    />
                    <Chip
                        label={isSeen ? "Viewed" : "New"}
                        variant={isSeen ? "outlined" : "filled"}
                        size="small"
                    />
                </Box>
                <Typography variant="h6" className="message">
                    {notification.Message}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {new Date(notification.Timestamp).toLocaleString()}
                </Typography>
                {!isSeen && (
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => onMarkSeen(notification.Id)}
                        sx={{mt: 2}}
                        >
                    Mark as Seen
                </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default NotificationCard;