import { EventEmitter } from '../../stencil-public-runtime';
import { Meeting } from '../../types/rtk-client';
import { ChatChannel } from '../../types/props';
import { RtkI18n, IconPack } from '../../exports';
import { RTKBasicParticipant } from '@cloudflare/realtimekit';
export declare class RtkChannelHeader {
    /** Meeting object */
    meeting: Meeting;
    /** Channel object */
    channel: ChatChannel;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    /** event triggered for search */
    search: EventEmitter<string>;
    /** event triggered for search */
    searchDismissed: EventEmitter;
    showChannelDetailsDialog: boolean;
    showSearchBar: boolean;
    members: RTKBasicParticipant[];
    /** Show back button */
    showBackButton: boolean;
    /** Event emitted when back button is clicked */
    back: EventEmitter<void>;
    onChannelChanged(): void;
    connectedCallback(): void;
    private $searchInput;
    private renderChannelDetails;
    render(): any;
}
