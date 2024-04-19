import { InfoProps } from "../../../../Info";

interface LanguagesData {
    [key: string]: number;
}

interface LanguagesProps extends InfoProps {
    languages: {
        data: LanguagesData;
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
    for (const key in languages.data) {
        total += languages.data[key]
    }
    let percentage: any = {}
    for (const key in languages.data) {
        percentage[key] = Math.round(languages.data[key] / total * 1000) / 10
    }
    Object.keys(percentage).forEach((language => console.log(language)))

    return (
        <div className="language">
            <div>
                <div className="language__progress">
                    {Object.keys(percentage).map((language) => (
                        <span key={colors[language][1]} style={{ display: 'block', height: '10px', backgroundColor: colors[language][0], flexBasis: 2.73 * percentage[language] + 'px' }}></span>
                    ))}
                </div>
                <ul className="language__list">
                    {Object.keys(percentage).map((language) => (
                        <li className="language__list-item" key={colors[language][1]}><span className="language__list-item--circle" style={{ backgroundColor: colors[language][0], width: '8px', height: '8px', borderRadius: '100%', display: 'block' }}> </span>{language}: <span className="list-item-percentage">{percentage[language]}%</span></li>
                    ))}
                </ul>
            </div>

        </div>

    );
}

export default Languages;
