import React from "react";

export function getInitials(fullName: string): string {
    const names = fullName.trim().split(' ');
    const initials = names.map(name => name.charAt(0).toUpperCase()).slice(0, 2);
    return initials.join('');
}

export function getColorFromString(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
}

interface AvatarProps {
    name: string;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 48 }) => {
    const initials = getInitials(name);
    const bgColor = getColorFromString(name);

    return (
        <div style={{
            width: size,
            height: size,
            backgroundColor: bgColor,
            color: '#fff',
            borderRadius: '50%',
            fontSize: size * 0.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            userSelect: 'none'
        }}
            title={name}
        >
            {initials}
        </div>
    );
};

<Avatar name="Joudy almahjoub" size={60} />
