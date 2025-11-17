import { EventEmitter } from '../../stencil-public-runtime';
import { RtkI18n, IconPack } from '../../exports';
import { ChatChannel } from '../../types/props';
export declare class RtkChannelSelectorUi {
    /** Channels */
    channels: ChatChannel[];
    /** On channel changed */
    channelChanged: EventEmitter<string>;
    /** Selected channel id */
    selectedChannelId: string;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    /** show recent message in channel */
    showRecentMessage: boolean;
    isHidden: boolean;
    searchQuery: string;
    private $el;
    private matchMedia;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentDidRender(): void;
    private handleResize;
    private channelSelected;
    private getTimeLabel;
    private onSearchInput;
    private onRevealClicked;
    private renderChannelDisplayPic;
    private renderRecentMessage;
    render(): any;
}
