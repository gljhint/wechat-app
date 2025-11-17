import { RtkI18n, IconPack } from '../../exports';
import { ChatChannel } from '../../types/props';
import { RTKBasicParticipant } from '@cloudflare/realtimekit';
export declare class RtkChannelDetails {
    /** Channel object */
    channel: ChatChannel;
    /** Language */
    t: RtkI18n;
    /** Icon pack */
    iconPack: IconPack;
    /** List of channel members */
    members: RTKBasicParticipant[];
    private renderMembers;
    render(): any;
}
