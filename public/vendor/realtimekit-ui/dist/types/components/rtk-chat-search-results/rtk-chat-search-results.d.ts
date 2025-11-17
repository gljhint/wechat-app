import { RtkI18n, IconPack } from '../../exports';
import { Meeting } from '../../types/rtk-client';
export declare class RtkChatSearchResults {
    /** Meeting object */
    meeting: Meeting;
    /** Search query */
    query: string;
    /** Channel id */
    channelId: string;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    private pageSize;
    private searchMessages;
    private nodeRenderer;
    render(): any;
}
