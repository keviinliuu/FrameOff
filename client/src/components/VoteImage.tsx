import { VotedEnum } from "../data/types";

export interface VoteImageProps {
    imgUrl: string | undefined;
    voteEnum : VotedEnum;
    onVote(choice: VotedEnum): void;
}

export default function VoteImage({ imgUrl, voteEnum, onVote }: VoteImageProps) {
    return (
        <div className='flex flex-col gap-y-4 items-center'>
            <img onClick = {e => onVote(voteEnum)} src={imgUrl as VotedEnum} className='aspect-square w-96 object-cover' />
        </div>
    );
}
