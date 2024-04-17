import React from 'react';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Состояние загрузки */
    loading?: boolean;
    /** Текст кнопки */
    className?: string;
    children: React.ReactNode;
    onClick?: Function
};

const Button: React.FC<ButtonProps> = ({ loading, children, className = '', onClick, disabled, ...props }) => {
    return (
        <button
            className={'task-4-btn' + className + loading && disabled ? 'task-4-btn--loading--dis' : loading ? 'task-4-btn--loading' : '' + disabled ? 'task-4-btn--dis' : 'task-4-btn'}
            disabled={loading || disabled ? true : false}
            data-testid="button"
            onClick={loading ? undefined : onClick}
            {...props}
        >
        </button>
    );
};

export default Button;
