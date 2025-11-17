import { IconPack } from '../../lib/icons';
import { RtkI18n } from '../../lib/lang';
import { UIConfig } from '../../types/ui-config';
import { Meeting } from '../../types/rtk-client';
/**
 * A screen that handles the idle state,
 * i.e; when you are waiting for data about the meeting, specifically the `meeting` object.
 */
export declare class RtkIdleScreen {
    /** Meeting */
    meeting: Meeting;
    /** Config object */
    config: UIConfig;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    render(): any;
}
