import type { Message, TextMessage } from '@cloudflare/realtimekit';
import { EventEmitter } from '../../stencil-public-runtime';
import { IconPack } from '../../lib/icons';
import { RtkI18n } from '../../lib/lang';
import { Meeting } from '../../types/rtk-client';
import { ChatChannel, Size, States } from '../../types/props';
export declare class RtkChatMessagesUiPaginated {
    private $paginatedListRef;
    host: HTMLRtkChatMessagesUiPaginatedElement;
    /** Meeting object */
    meeting: Meeting;
    /**
     * Selected channel
     */
    selectedChannel?: ChatChannel;
    /**
     * Selected channel id
     */
    selectedChannelId?: string;
    /** Size */
    size: Size;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    /** Event for editing a message */
    editMessageInit: EventEmitter<{
        payload: TextMessage;
        flags: {
            isReply?: boolean;
            isEdit?: boolean;
        };
    }>;
    /** Event emitted when a message is pinned or unpinned */
    onPinMessage: EventEmitter<Message>;
    /** Event emitted when a message is deleted */
    onDeleteMessage: EventEmitter<Message>;
    /** Emits updated state data */
    stateUpdate: EventEmitter<States>;
    children: HTMLElement;
    /** Whether to align chat bubbles to the left */
    leftAlign: boolean;
    permissionsChanged: boolean;
    private pageSize;
    private lastReadMessageIndex;
    componentDidLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    meetingChanged(meeting: Meeting, oldMeeting?: Meeting): void;
    channelChanged(): void;
    private permissionsUpdateListener;
    private maybeMarkChannelAsRead;
    private getChatMessages;
    private createChatNodes;
    private disconnectMeeting;
    private getMessageActions;
    private onMessageActionHandler;
    private createChatNode;
    private chatUpdateListener;
    render(): any;
}
