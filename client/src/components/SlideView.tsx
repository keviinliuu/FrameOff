import { ImageData, VotedEnum } from '../data/types';
import Slide from './Slide';
import VoteImage from './VoteImage';
import axios from 'axios';

export interface SlideViewProps {
    title: string | undefined;
    description: string | undefined;
    imageOne: ImageData;
    imageTwo: ImageData;
    _id : string | undefined;
}


export default function SlideView({ title, description, imageOne, imageTwo, _id }: SlideViewProps) {
    function onVote(imageEnum : VotedEnum) {
        axios
            .patch(`/voteslide`, {
                _id : _id,
                votedFor : imageEnum
            })
            .then(res => console.log(res.data));
    }
    return (
        <Slide>
            {title && <div className='text-lg'>{title}</div>}
            {description && <div className='text-sm'>{description}</div>}
            <div className='flex justify-between'>
                <div className='flex flex-col gap-y-4 items-center'>
                    <VoteImage imgUrl={imageOne.url as string} voteEnum={ VotedEnum.IMAGE1 } onVote = {onVote} />
                    {imageOne.caption && <div className='text-sm'>{imageOne.caption}</div>}
                </div>
                <div className='flex flex-col gap-y-4 items-center'>
                    <VoteImage imgUrl={imageTwo.url as string} voteEnum={ VotedEnum.IMAGE2 } onVote = {onVote} />
                    {imageTwo.caption && <div className='text-sm'>{imageTwo.caption}</div>}
                </div>
            </div>
        </Slide>
    );
}
