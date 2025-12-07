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

    // Process children to find and style the arrow icon
    const processedChildren = React.Children.map(children, (child) => {
        // Check if child is a React element (like GoArrowUpRight)
        if (React.isValidElement(child) && child.type && typeof child.type !== 'string') {
            // Clone the icon element with animation styles - wrap in container with controlled width
            return (
                <span style={{ 
                    display: 'inline-flex', 
                    width: hover ? '1em' : '0',
                    height: '1em',
                    position: 'relative',
                    overflow: 'visible',
                    transition: 'width 200ms ease'
                }}>
                    {React.cloneElement(child as React.ReactElement<any>, {
                        style: {
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: hover ? 'translate(0, 0)' : 'translate(8px, -8px)',
                            opacity: hover ? 1 : 0,
                            transition: 'transform 200ms ease, opacity 200ms ease',
                            ...((child as any).props?.style || {})
                        }
                    })}
                </span>
            );
        }
        return child;
    });

    return (
        <button
            type="button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`inline-flex items-center justify-center gap-1 px-4 py-4 rounded-2xl font-medium shadow-sm cursor-pointer ${className}`}
            style={{ ...(base as any), ...style }}
            {...rest}
        >
            {processedChildren}
        </button>
    );
};

export default ActionButton;
     