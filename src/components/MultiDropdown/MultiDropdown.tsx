import React from 'react';
import Input from '../Input/Input';
import style from './styles/MultiDropdown.module.scss'
import MultiStore from '../../store/MultiStore';
import ReposStore from '../../store/RenderReposStore';
import cn from 'clsx'
import { toJS } from 'mobx';
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

    const wrapperRef = React.useRef<HTMLDivElement>(null)
    const ref = React.useRef<HTMLInputElement>(null)
    const [filter, setFilter] = React.useState('')
    const [isOpened, setIsOpened] = React.useState(false)

    const open = () => {
        setIsOpened(true)
    }

    React.useEffect(() => {
        const handlerClick = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
                setIsOpened(false)
            }
        }

        window.addEventListener('click', handlerClick)

        return () => {
            window.removeEventListener('click', handlerClick)
        }
    }, [])


    React.useEffect(() => {
        if (isOpened) {
            setFilter('')
        }
    }, [isOpened])


    const title = React.useMemo(() => getTitle(value), [getTitle, value])

    const isEmpty = value.length === 0

    const filteredOptions = React.useMemo(() => {
        const str = filter.toLocaleLowerCase()
        return options.filter(
            (o) => o.value.toLocaleLowerCase().indexOf(str) === 0
        )
    }, [filter, options])

    const selectedKeysSet = React.useMemo<Set<Option['key']>>(
        () => new Set(value.map(({ key }) => {
            return key
        })),
        [value]
    )

    const onSelect = React.useCallback(
        (option: Option) => {
            if (disabled) {
                return
            }

            if (selectedKeysSet.has(option.key)) {
                onChange([...value].filter(({ key }) => key !== option.key))
                MultiStore.selectedTags = [...value].filter(({ key }) => key !== option.key)
                ReposStore.filterRepos(MultiStore.selectedTags)
            } else {
                onChange([...value, option])
                MultiStore.selectedTags = [...value, option]
                console.log(toJS(MultiStore.selectedTags));
                ReposStore.filterRepos(MultiStore.selectedTags)
            }
            ref.current?.focus()
        },
        [disabled, onChange, value, selectedKeysSet]
    )

    const opened = isOpened && !disabled

    return (
        <div className={cn(className, 'multi_drop')} ref={wrapperRef}>
            <Input className='multi_drop_field'
                onClick={open} disabled={disabled}
                placeholder={title}
                value={opened ? filter : isEmpty ? '' : title}
                onChange={setFilter}
                ref={ref}
            />
            {opened && (
                <div className={style.multi__options}>
                    {filteredOptions.map((option) => (
                        <button
                            className={cn(style.multi_drop_option, selectedKeysSet.has(option.key) && style.multi_drop_option_selected)} key={option.key} onClick={() => onSelect(option)}>
                            {option.value}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
};

export default MultiDropdown;
