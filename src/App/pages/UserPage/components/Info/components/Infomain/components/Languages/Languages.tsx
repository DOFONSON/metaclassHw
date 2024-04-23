import style from './styles/Languages.module.scss'

type LanguagesProps = {
    languages: {
        [key: string]: number;
    };
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
    let total = 0
    const colors: { [key: string]: [string, number] } = {
        "TypeScript": ['#3178C6', 1],
        "SCSS": ['#C6538C', 2],
        'CSS': ['#563D7C', 3],
        'HTML': ['#E34C26', 4],
        'JavaScript': ['#F1E05A', 5],
        'Python': ['#3572A5', 6],
        'Go': ['#00ADD8', 7],
        'HCL': ['#844FBA', 8],
        'Kotlin': ['#A97BFF', 9],
        'Swift': ['#F05138', 10],
        'Smarty': ['#F0C040', 11],
        'Mako': ['000000', 12],
        'Dockerfile': ['#384D54', 13],
        'Lua': ['#000080', 14],
        'Ruby': ['#701516', 15],
        'Shell': ['#89E051', 16],
        'C': ['#555555', 17]
    }

    for (const key in languages) {
        total += languages[key]
    }
    let percentage: any = {}
    for (const key in languages) {
        percentage[key] = Math.round(languages[key] / total * 1000) / 10
    }

    return (
        <div className={style.language}>
            <div>
                <div className={style.language__progress}>
                    {Object.keys(percentage).map((language) => (
                        <span key={colors[language][1]} style={{ display: 'block', height: '10px', backgroundColor: colors[language][0], flexBasis: 2.73 * percentage[language] + 'px' }}></span>
                    ))}
                </div>
                <ul className={style.language__list}>
                    {Object.keys(percentage).map((language) => (
                        <li className={style.language__list_item} key={colors[language][1]}><span className={style.language__list_item_circle} style={{ backgroundColor: colors[language][0], width: '8px', height: '8px', borderRadius: '100%', display: 'block' }}> </span>{language}: <span className={style.list_item_percentage}>{percentage[language]}%</span></li>
                    ))}
                </ul>
            </div>

        </div>

    );
}

export default Languages;
