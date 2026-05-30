const typeWeight = {
    Placement: 3,
    Event: 2,
    Result: 1,
};

export function calculatePriority(notification) {
    const weight = typeWeight[notification.Type] || 1;
    const time = new Date(notification.Timestamp).getTime();

    return weight * 1000000000000 + time;
}

export function getTopPriorityNotifications(notifications, count = 10) {
    return [...notifications]
        .sort((a, b) => calculatePriority(b) - calculatePriority(a))
        .slice(0, count);
}