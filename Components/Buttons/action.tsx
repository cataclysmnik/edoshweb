"use client";

import React, { useState } from "react";

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Primary color to transition to on hover (CSS color string) */
    primaryColor?: string;
    /** Text color when hovered */
    hoverTextColor?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    className = "",
    primaryColor = "#FF6546",
    hoverTextColor = "#000",
    style,
    ...rest
}) => {
    const [hover, setHover] = useState(false);

    const base = {
        backgroundColor: hover ? "#fff" : primaryColor,
        color: hover ? hoverTextColor : "#fff",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        // border: "1px solid rgba(255,255,255,0.08)",
        transition: "background-color 200ms ease, color 200ms ease, transform 150ms ease",
    } as React.CSSProperties;

    return (
        <button
            type="button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`inline-flex items-center justify-center px-4 py-4 rounded-2xl font-medium shadow-sm cursor-pointer ${className}`}
            style={{ ...(base as any), ...style }}
            {...rest}
        >
            {children}
        </button>
    );
};

export default ActionButton;
     