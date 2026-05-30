# Notification System Design

## Stage 1

The goal of Stage 1 is to identify the top 10 priority notifications from the notification list.

## Priority Logic

Each notification has a type and timestamp.

The priority is calculated using two factors:

1. Notification type weight
2. Recency of notification

The type weights are:

- Placement: 3
- Event: 2
- Result: 1

Placement notifications are given the highest priority because they are more time-sensitive for students. Event notifications come next, and Result notifications have normal priority.

If two notifications have the same type, the newer notification is ranked higher.

## Stage 1 Approach

The application fetches notifications from the notification API.

After receiving the notifications, it creates a copy of the notification list and sorts it by priority score.

The priority score is calculated as:

type weight + timestamp value

Finally, only the first 10 notifications are selected.

## Efficient Maintenance of Top 10

New notifications may keep arriving. To maintain the top 10 efficiently, the application can compare each new notification against the current top 10 list.

If the new notification has a higher score than the lowest ranked item in the current top 10, it can be inserted and the list can be sorted again.

For the current frontend implementation, notifications are fetched from the API and sorted in memory because the task does not require database queries.

## Stage 2

The frontend application is built using React.

The application displays:

- All notifications
- Priority inbox
- Notification type filter
- Limit selector
- Unread count
- Viewed and new status

## Frontend Flow

1. User opens the application.
2. The dashboard page loads.
3. The app calls the notification API.
4. Notifications are displayed on the page.
5. User can filter notifications by type.
6. User can open the priority inbox.
7. User can mark notifications as viewed.

## Seen Notification Handling

The app uses browser localStorage to remember which notifications have already been viewed.

This helps separate new and viewed notifications without requiring a login system or database.

## Logging Middleware

A reusable logging function is created in the frontend.

The function format is:

Log(stack, level, package, message)

Example:

Log("frontend", "info", "api", "Fetching notifications from server")

The logging middleware is used in:

- API calls
- Dashboard page loading
- State updates
- Error handling

## Error Handling

API calls are wrapped in try-catch blocks.

If the notification API fails, the user sees an error message on the page.

The error is also sent using the logging middleware.

## Styling

The frontend uses Material UI and Vanilla CSS.

No other UI libraries are used.

## Assumptions

- Users are already authorized.
- The app does not require signup or login.
- Notifications are fetched from the provided notification API.
- Seen notification state can be stored locally in the browser.