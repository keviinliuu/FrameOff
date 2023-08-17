import { VotedEnum } from '../data/types';

export interface VoteImageProps {
    imgUrl: string | undefined;
    voteEnum: VotedEnum;
    onVote(choice: VotedEnum): void;
}

export default function VoteImage({ imgUrl, voteEnum, onVote }: VoteImageProps) {
    return (
        <div className='flex flex-col items-center gap-y-4'>
            <img
                onClick={() => {
                    onVote(voteEnum);
                }}
                src={imgUrl as VotedEnum}
                className='aspect-square w-96 object-cover'
            />
        </div>
    );
}
