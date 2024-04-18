import React from 'react';
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    className?: string;
    onClick?: Function;
    active?: Boolean
};

const Button: React.FC<ButtonProps> = ({ loading, onClick, disabled = false, children }) => {
    let handleMouseDown = () => {
        document.querySelector('.main-btn')?.classList.add('main-btn--active')
    }
    let handleMouseUp = () => {
        document.querySelector('.main-btn')?.classList.remove('main-btn--active')
    }
    return (
        <button
            className={`main-btn ${loading && disabled ? 'main-btn--loading--dis' : disabled ? 'main-btn--dis' : 'main-btn-btn'}`}
            disabled={loading || disabled ? true : false}
            onClick={loading ? undefined : onClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {children}

        </button>
    );
};

export default Button;
