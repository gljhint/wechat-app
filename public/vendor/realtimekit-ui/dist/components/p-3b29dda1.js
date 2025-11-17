import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';

const rtkIconCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block;height:var(--rtk-space-10, 40px);outline:2px solid transparent;outline-offset:2px}:host .icon-wrapper{display:flex;height:100%;width:100%;flex-direction:column;align-items:center}:host svg{height:100%;width:100%;outline:2px solid transparent;outline-offset:2px}:host([size='xl']){box-sizing:border-box;display:block;height:var(--rtk-space-16, 64px) !important;width:var(--rtk-space-16, 64px) !important;--rtk-spinner-color:currentColor}:host([size='md']){box-sizing:border-box;display:block;height:var(--rtk-space-6, 24px) !important;width:var(--rtk-space-6, 24px) !important;--rtk-spinner-color:currentColor}:host([size='sm']){box-sizing:border-box;display:block;height:var(--rtk-space-4, 16px) !important;width:var(--rtk-space-4, 16px) !important;--rtk-spinner-color:currentColor}:host([variant='secondary']) .icon-wrapper{--tw-text-opacity:1;color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-text-opacity))}:host([variant='danger']) .icon-wrapper{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkIconStyle0 = rtkIconCss;

const parseIcon = (icon) => {
    try {
        return JSON.parse(icon);
    }
    catch (e) {
        return icon;
    }
};
const RtkIcon = /*@__PURE__*/ proxyCustomElement(class RtkIcon extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Icon variant */
        this.variant = 'primary';
        /** Size */
        this.size = 'lg';
    }
    render() {
        return (h(Host, { key: 'fbacb1ee3dd4c1ca7aa612f08e938601df73036c' }, h("div", { key: '04c026967cb7aa3acb3fba09fcf5b0d33f45e2b0', class: "icon-wrapper", innerHTML: parseIcon(this.icon), part: "wrapper" })));
    }
    static get style() { return RtkIconStyle0; }
}, [1, "rtk-icon", {
        "icon": [1],
        "variant": [513],
        "size": [513]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkIcon);
            }
            break;
    } });
}
defineCustomElement();

export { RtkIcon as R, defineCustomElement as d };
