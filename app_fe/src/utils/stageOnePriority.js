const priorityWeight = {
  Placement: 3,
  Event: 2,
  Result: 1,
};

export function findTopTenNotifications(notifications) {
  return [...notifications]
    .sort((first, second) => {
      const firstScore =
        (priorityWeight[first.Type] || 1) * 10000000000000 +
        new Date(first.Timestamp).getTime();

      const secondScore =
        (priorityWeight[second.Type] || 1) * 10000000000000 +
        new Date(second.Timestamp).getTime();

      return secondScore - firstScore;
    })
    .slice(0, 10);
}