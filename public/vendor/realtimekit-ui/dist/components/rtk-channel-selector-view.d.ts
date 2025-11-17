import type { Components, JSX } from "../types/components";

interface RtkChannelSelectorView extends Components.RtkChannelSelectorView, HTMLElement {}
export const RtkChannelSelectorView: {
    prototype: RtkChannelSelectorView;
    new (): RtkChannelSelectorView;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
