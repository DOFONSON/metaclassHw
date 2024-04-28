import React from 'react';
import cn from 'clsx'
import Text from "../Text";
import Star from '../../../../../components/Star'
import styles from './styles/styles.module.scss'

import { Link } from 'react-router-dom';
export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
    dateSlot?: string;
    id: number;
    company?: string
};

const Card: React.FC<CardProps> = ({ image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot, dateSlot, id }) => {
    return (
        <Link to={`/repo/${id}`} className={styles.repo_card__link}>
            <div className={cn(styles.repo_card__link, `${styles.cardIcon}`)} onClick={onClick}>
                <div className={`${styles.img__block}`}>
                    <img src={image} alt="card photo" />
                </div>
                <div className={`${styles.card__main}`}>
                    <div className={`${styles.card__description}`}>
                        <div className={`${styles.card__parametrs}`}>
                            {captionSlot ? <span className={`${styles.cardIconSpan}`}><Star color={'#FF9432'} />{captionSlot}</span> : ''}
                            {dateSlot ? <span className={`${styles.cardIconSpan}`}>Updated {dateSlot}</span> : ''}
                        </div>
                        <Text className={`${styles.card__title}`} tag='h3' weight='bold' children={title} color='accent' maxLines={2}></Text>
                        <Text className={`${styles.card__descr}`} children={subtitle} color='secondary' maxLines={2}></Text>
                    </div>

                    <div className={`${styles.bottomCard}`}>
                        {contentSlot ? <div className={`${styles.card__bottomContent}`}>
                            {contentSlot}
                        </div> : ''}
                        {actionSlot ? <div className={`${styles.card__actionSlot}`}>
                            {actionSlot}
                        </div> : ''}
                    </div>
                </div>
            </div>
        </Link >

    )
};

export default Card;
