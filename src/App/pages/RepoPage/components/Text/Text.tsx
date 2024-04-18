import * as React from 'react';

export type TextProps = {
    className?: string;
    view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
    weight?: 'normal' | 'medium' | 'bold';
    color?: 'primary' | 'secondary' | 'accent';
    maxLines?: number;
    children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({
    className,
    view,
    tag = 'p',
    weight,
    children,
    color = 'primary',
    maxLines
}) => {
    switch (view) {
        case 'title':
            className += ' task2-title'
            break;
        case 'button':
            className += ' task2-btn'
            break;
        case 'p-20':
            className += ' task2-p-20'
            break;
        case 'p-18':
            className += ' task2-p-18'
            break;
        case 'p-16':
            className += ' task2-p-16'
            break;
        case 'p-14':
            className += ' task2-p-14'
            break;

        default:
            break;
    }
    const style: React.CSSProperties = {
        color,
        fontWeight: weight,
        WebkitLineClamp: maxLines,
        lineClamp: maxLines,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',

    };

    return React.createElement(tag, {
        className,
        style
    }, children);
};

export default Text;
