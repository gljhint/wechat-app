import type { Components, JSX } from "../types/components";

interface RtkChannelSelectorUi extends Components.RtkChannelSelectorUi, HTMLElement {}
export const RtkChannelSelectorUi: {
    prototype: RtkChannelSelectorUi;
    new (): RtkChannelSelectorUi;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
