import { EventEmitter } from '../../stencil-public-runtime';
import { States } from '../../exports';
import { Meeting } from '../../types/rtk-client';
import { IconPack } from '../../lib/icons';
import { RtkI18n } from '../../lib/lang';
export declare class RtkBroadcastMessageModal {
    /** Meeting object */
    meeting: Meeting;
    /** States object */
    states: States;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    /** Emits updated state data */
    stateUpdate: EventEmitter<States>;
    /** Broadcast message state */
    messagePayload: {
        to: string;
        message: string;
    };
    successMessage: boolean;
    private close;
    private sendMessage;
    render(): any;
}
