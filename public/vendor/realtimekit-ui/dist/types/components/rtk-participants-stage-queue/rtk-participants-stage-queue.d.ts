import { UIConfig, Size, IconPack, RtkI18n } from '../../exports';
import { Meeting, Peer } from '../../types/rtk-client';
import { ParticipantsViewMode } from '../rtk-participants/rtk-participants';
export declare class RtkParticipantsStaged {
    /** Meeting object */
    meeting: Meeting;
    /** Config */
    config: UIConfig;
    /** Size */
    size: Size;
    /** Icon pack */
    iconPack: IconPack;
    /** View mode for participants list */
    view: ParticipantsViewMode;
    /** Language */
    t: RtkI18n;
    stageRequestedParticipants: Peer[];
    connectedCallback(): void;
    disconnectedCallback(): void;
    meetingChanged(meeting: Meeting): void;
    private updateStageRequestedParticipants;
    private acceptStageRequest;
    private rejectStageRequest;
    private acceptAllStageRequest;
    private denyAllStageRequest;
    private shouldShowStageRequests;
    private updateRequestList;
    render(): any;
}
