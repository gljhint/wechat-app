import type { Components, JSX } from "../types/components";

interface RtkChannelCreator extends Components.RtkChannelCreator, HTMLElement {}
export const RtkChannelCreator: {
    prototype: RtkChannelCreator;
    new (): RtkChannelCreator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
