export function getLastActiveInfo(timestamp: string | Date) {
    const now: Date = new Date();
    const lastActive: Date = new Date(timestamp);
    const diffInMilliseconds: number = now.getTime() - lastActive.getTime();
    const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    const diffInHours: number = Math.floor(diffInMinutes / 60);
    const diffInDays: number = Math.floor(diffInHours / 24);

    let timeString: string;
    const colors = {
        success: "#12B76A",
        warning: "#FAC301",
        gray: "#9CA3AF",
    };

    let color: string = colors.gray;

    if (diffInDays > 3) {
        timeString = diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
        color = colors.gray;
    } else if (diffInDays > 0) {
        timeString = diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
        color = colors.warning;
    } else if (diffInHours > 0) {
        timeString = diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
        color = colors.warning;
    } else if (diffInMinutes > 1) {
        timeString = `${diffInMinutes} minutes ago`;
        color = colors.warning;
    } else if (diffInMinutes === 1) {
        timeString = "1 minute ago";
        color = colors.warning;
    } else {
        timeString = "Active now";
        color = colors.success;
    }

    return { timeString, color };
}