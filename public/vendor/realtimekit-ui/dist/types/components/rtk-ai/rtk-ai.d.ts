import { EventEmitter } from '../../stencil-public-runtime';
import { Meeting } from '../../types/rtk-client';
import type { Size, States } from '../../types/props';
import { UIConfig } from '../../types/ui-config';
import { IconPack } from '../../lib/icons';
import { RtkI18n } from '../../lib/lang';
export type AIView = 'default' | 'sidebar' | 'full-screen';
export declare class RtkAi {
    private keydownListener;
    /** Meeting object */
    meeting: Meeting;
    /** States object */
    states: States;
    /** Config */
    config: UIConfig;
    /** Icon pack */
    iconPack: IconPack;
    /** Language */
    t: RtkI18n;
    /** Size */
    size: Size;
    /** View type */
    view: AIView;
    /** Emits updated state data */
    stateUpdate: EventEmitter<States>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    viewChanged(view: AIView): void;
    private close;
    render(): any;
}
