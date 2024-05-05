import { useMemo } from 'react';
import style from './Languages.module.scss';

type LanguagesProps = {
    languages: {
        [key: string]: number;
    };
};

const Languages: React.FC<LanguagesProps> = ({ languages }) => {

    if (typeof languages != typeof {}) {
        return null;
    }

    let total = 0;
    const colors: { [key: string]: string } = {
        TypeScript: '#3178C6',
        SCSS: '#C6538C',
        CSS: '#563D7C',
        HTML: '#E34C26',
        JavaScript: '#F1E05A',
        Python: '#3572A5',
        Go: '#00ADD8',
        HCL: '#844FBA',
        Kotlin: '#A97BFF',
        Swift: '#F05138',
        Smarty: '#F0C040',
        Mako: '#000000',
        Dockerfile: '#384D54',
        Lua: '#000080',
        Ruby: '#701516',
        Shell: '#89E051',
        C: '#555555',
        'C++': '#F34B7A',
        'Objective-C': '#438EFF',
        M4: '#9e6a03',
        Makefile: '#427A19',
        Perl: '#0298C3',
        Ragel: '#9D5200',
        Assembly: '#6E4C13',
        Awk: '#C30E9B',
        CMake: '#DA3434',
        Batchfile: '#C1F12E',
        Java: '#B07219',
        Groovy: '#4298B8'
    };

    const randomColors: { [key: string]: string } = {};

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const getColor = (language: string) => {
        if (colors[language]) {
            return colors[language];
        } else {
            if (!randomColors[language]) {
                randomColors[language] = getRandomColor();
            }
            return randomColors[language];
        }
    };

    for (const key in languages) {
        total += languages[key];
    }
    const percentage = useMemo(() => {
        let newPercentage: any = {};
        for (const key in languages) {
            newPercentage[key] = Math.round((languages[key] / total) * 1000) / 10;
        }
        return newPercentage;
    }, [languages, total]);


    return (
        <div className={style.language}>
            <div>
                <div className={style.language__progress}>
                    {Object.keys(percentage).map((language) => (
                        <span
                            className={style.language__progress_span}
                            key={language}
                            style={{
                                backgroundColor: getColor(language),
                                flexBasis: 2.73 * percentage[language] + 'px'
                            }}
                        ></span>
                    ))}
                </div>
                <ul className={style.language__list}>
                    {Object.keys(percentage).map((language) => (
                        <li key={language} className={style.language__list_item}>
                            <span
                                className={style.language__list_item_circle}
                                style={{
                                    backgroundColor: getColor(language),
                                }}
                            ></span>
                            {language}: <span className={style.list_item_percentage}>{percentage[language]}%</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Languages;
