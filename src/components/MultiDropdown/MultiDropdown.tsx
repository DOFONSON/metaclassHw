import React, { useState, useEffect } from 'react';
import Input from '../Input/Input';
import style from './styles/MultiDropdown.module.scss'
export type Option = {
    key: string;
    value: string;
};

export type MultiDropdownProps = {
    className?: string;
    options: Option[];
    value: Option[];
    onChange: (value: Option[]) => void;
    disabled?: boolean;
    getTitle: (value: Option[]) => string;

};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
    const startedVal = value.length ? getTitle(value) : '';
    const [placeHolderText, setPlaceHolderText] = useState(getTitle(value))
    const [displayOpt, setDisplayOpt] = useState('none');
    const [inputVal, setInputVal] = useState(startedVal);
    const [flag, setFlag] = useState(true);
    const [parametrs, setParametrs] = useState(options)
    let sss: any = ''

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.closest(style.multi__options) === null && (target !== target.closest(style.multi__input)?.querySelector('input'))) {
            setFlag(false);
        } else {
            setFlag(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const clickInput = () => {
        setDisplayOpt(prevState => prevState === 'none' ? 'block' : 'none');
    };

    const handleInputChange = () => {
        console.log(parametrs);

    };

    const optionClick = (val: Option) => {
        let newValue: Option[] = [...value];
        let flag = false;
        let ind = '';
        newValue.forEach((v) => {
            if (v.key === val.key) {
                flag = true;
                ind = v.key;
            }
        });
        if (flag) {
            for (let i = 0; i < newValue.length; i++) {
                if (newValue[i].key === ind) {
                    newValue.splice(i, 1)
                }
            }
        } else {
            newValue.push(val);
        }

        onChange(newValue);
        setInputVal(getTitle(newValue));
    };
    const chnger: EventListener = (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (!keyboardEvent.ctrlKey && !keyboardEvent.altKey && !keyboardEvent.metaKey &&
            keyboardEvent.code !== "ShiftLeft" && keyboardEvent.code !== "ShiftRight" &&
            keyboardEvent.code !== "Backspace" && keyboardEvent.code !== "Space" &&
            keyboardEvent.code !== "Enter" && keyboardEvent.code !== 'Delete') {
            sss += keyboardEvent.key;
            setInputVal(sss);
            setParametrs(options.filter(qwe => {
                return qwe.value.includes(sss);
            }));
        } else if (keyboardEvent.code === "Backspace") {
            sss = sss.slice(0, -1);
            setInputVal(sss);
            setParametrs(options.filter(qwe => {
                return qwe.value.includes(sss);
            }));
        } if (keyboardEvent.code === "Delete") {
            sss = ''
            setInputVal(sss)
            setParametrs(options.filter(qwe => {
                return qwe.value.includes(sss);
            }));
        }
    };

    let focusPocus = () => {
        setPlaceHolderText(inputVal);
        setInputVal('');
        document.addEventListener('keydown', chnger);
    }

    let unFocusPocus = () => {
        setParametrs(options)
        document.removeEventListener('keydown', chnger)
    }
    return (
        <div className={className}>
            <Input
                placeholder={placeHolderText}
                value={inputVal}
                className={style.multi__input}
                onChange={() => handleInputChange}
                onClick={clickInput}
                onFocus={focusPocus}
                onBlur={unFocusPocus}
            />

            {(!disabled && parametrs.length > 0 && parametrs && flag) && (
                <div className={style.multi__options} style={{ display: displayOpt }}>
                    <ul>
                        {parametrs.map(option => (
                            options.includes(option) ? <li key={option.key} className={style.options__li} onClick={() => optionClick(option)} >{option.value}</li> : ''
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MultiDropdown;
