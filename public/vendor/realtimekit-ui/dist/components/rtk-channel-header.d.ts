import type { Components, JSX } from "../types/components";

interface RtkChannelHeader extends Components.RtkChannelHeader, HTMLElement {}
export const RtkChannelHeader: {
    prototype: RtkChannelHeader;
    new (): RtkChannelHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
