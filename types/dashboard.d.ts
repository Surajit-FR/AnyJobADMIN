export type Badge = {
    text: string;
    color: string;
    icon: string;
};

export type dashboadCardData = {
    title: string;
    value: string;
    badge?: Badge;
    icon: string;
    iconBg: string;
    link?:string;
    borderColor?: string;
};
