import { EventEmitter } from '../../stencil-public-runtime';
import { RtkI18n, IconPack, States } from '../../exports';
import { Meeting } from '../../types/rtk-client';
export declare class RtkChannelCreator {
    /** Meeting object */
    meeting: Meeting;
    /** Language */
    t: RtkI18n;
    /** Icon pack */
    iconPack: IconPack;
    /** Emits updated state data */
    stateUpdate: EventEmitter<States>;
    /** Emits event to switch channel */
    switchChannel: EventEmitter<string>;
    channelName: string;
    searchQuery: string;
    step: number;
    loading: boolean;
    selectedMemberIds: Set<string>;
    focusedMemberIndex: number;
    showAllMembersList: boolean;
    $el: HTMLRtkChannelCreatorElement;
    private allMembers;
    private inputTextRef;
    private searchInputTextRef?;
    componentDidLoad(): void;
    private focusOnSearch;
    private onClickHandler;
    private createChannel;
    private onMemberAdd;
    private keyDownHandler;
    private renderMemberSelector;
    render(): any;
}
