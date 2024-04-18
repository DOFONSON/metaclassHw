import React from 'react';
import Text from "../Text";
import Star from './Star'
export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
    dateSlot?: string
};

const Card: React.FC<CardProps> = ({ className, image, captionSlot, title, subtitle, contentSlot, onClick, actionSlot, dateSlot }) => {
    return (
        <div className={className + " card-icon"} onClick={onClick}>
            <div className="img__block">
                <img src={image} alt="card photo" />
            </div>
            <div className="card-main">
                <div className="card-description">
                    <div className="card__parametrs">
                        {captionSlot ? <span className='card-icon--span'><Star></Star>{captionSlot}</span> : ''}
                        {dateSlot ? <span className='card-icon--span'>Updated {dateSlot}</span> : ''}
                    </div>
                    <Text className='card__title' tag='h3' weight='bold' children={title} color='accent' maxLines={2}></Text>
                    <Text className='card__descr' children={subtitle} color='secondary' maxLines={2}></Text>
                </div>

                <div className="card-bottom">
                    {contentSlot ? <div className="card__bottom-content">
                        {contentSlot}
                    </div> : ''}
                    {actionSlot ? <div className="card__action-slot">
                        {actionSlot}
                    </div> : ''}
                </div>
            </div>
        </div>
    )
};

export default Card;
