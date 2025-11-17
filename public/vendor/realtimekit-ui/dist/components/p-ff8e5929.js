import { p as proxyCustomElement, H, w as writeTask, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { s as smoothScrollToBottom } from './p-0752f2ba.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-a59a9c97.js';
import { d as debounce } from './p-1dca17d1.js';

const rtkPaginatedListCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;flex:1}.container{box-sizing:border-box;display:flex;flex-direction:column-reverse;padding-top:var(--rtk-space-4, 16px);padding-bottom:var(--rtk-space-4, 16px);flex:1 0 0px;overflow-y:scroll;}.file-picker{display:none}.chat *:first-child{margin-top:var(--rtk-space-0, 0px)}.chat .head{display:flex;align-items:center}.chat .head .name{margin-right:var(--rtk-space-4, 16px);font-size:12px;font-weight:700}.chat .head .time{font-size:12px;color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.chat .body{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-2, 8px);overflow-wrap:break-word;font-size:14px;line-height:1.375}.chat .body .emoji{font-size:24px}p{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px)}rtk-text-message,rtk-image-message,rtk-file-message{margin-top:var(--rtk-space-4, 16px);display:block;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));box-sizing:border-box}*[is-continued]{margin-top:var(--rtk-space-3, 12px)}rtk-text-message[is-continued]{margin-top:var(--rtk-space-2, 8px)}.chat .image{position:relative;height:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);cursor:pointer}.chat .image img{display:none;height:100%;width:100%;border-radius:var(--rtk-border-radius-sm, 4px);-o-object-fit:cover;object-fit:cover}.chat .image .image-spinner{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.chat .image .image-spinner rtk-spinner{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}.chat .image .image-errored{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);background-color:rgba(var(--rtk-colors-danger, 255 45 45) / 0.1);--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.chat .image .actions{display:none;height:var(--rtk-space-8, 32px);align-items:center;position:absolute;top:var(--rtk-space-2, 8px);right:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.chat .image .actions .action{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);border-radius:var(--rtk-border-radius-none, 0);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.chat .image .actions .action:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.image.loaded img{display:block}.image.loaded .image-spinner{display:none}.image:hover .actions,.image:focus .actions{display:flex}.chat .file{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1\\.5, 6px);padding-bottom:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.chat .file .file-data{flex:1 1 0%}.chat .file .file-data .name{word-break:break-all;color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.chat .file .file-data .file-data-split{margin-top:var(--rtk-space-0\\.5, 2px);display:flex;align-items:center;font-size:12px}.chat .file .file-data .file-data-split .ext{margin-right:var(--rtk-space-2, 8px);text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.chat .file .file-data .file-data-split .divider{height:var(--rtk-space-4, 16px);width:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.chat .file .file-data .file-data-split .size{margin-left:var(--rtk-space-2, 8px)}.smallest-dom-element{width:1px}#top-scroll{transform:translateY(20vh)}#bottom-scroll{transform:translateY(-20vh)}a{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));text-decoration-line:none}a:hover{text-decoration-line:underline}.show-new-messages-ctr{pointer-events:none;position:absolute;bottom:var(--rtk-space-2, 8px);right:var(--rtk-space-4, 16px);z-index:10;margin-top:calc(var(--rtk-space-14, 56px) * -1);--tw-translate-y:var(--rtk-space-28, 112px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.show-new-messages-ctr.active{--tw-translate-y:var(--rtk-space-0, 0px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}.show-new-messages{pointer-events:auto;border-radius:9999px}.show-new-messages:hover{border-radius:9999px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-opacity:1;--tw-ring-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-ring-opacity));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}rtk-spinner,.empty-list{margin:auto}.page-wrapper{margin-left:var(--rtk-space-1, 4px);margin-right:var(--rtk-space-1, 4px)}.message-wrapper{margin-bottom:var(--rtk-space-2, 8px)}.pinned .message-wrapper{position:relative}.pinned .pin-icon{position:absolute;right:calc(var(--rtk-space-1, 4px) * -1);top:calc(var(--rtk-space-1, 4px) * -1);display:flex;border-radius:var(--rtk-border-radius-sm, 4px)}.pinned rtk-message-view{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px)}";
const RtkPaginatedListStyle0 = rtkPaginatedListCss;

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkPaginatedList = /*@__PURE__*/ proxyCustomElement(class RtkPaginatedList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** auto scroll list to bottom */
        this.autoScroll = true;
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** label to show when empty */
        this.emptyListLabel = null;
        this.isLoading = false;
        this.rerenderBoolean = false;
        /**
         * This gets disabled when the user scrolls up and the bottom node
         * is not visible anymore.
         */
        this.shouldRenderNewNodes = true;
        /**
         * This gets disabled when the user scrolls up and the bottom node
         * is not visible anymore.
         */
        this.hasNewNodesToRender = false;
        this.showEmptyListLabel = false;
        /**
         * This is a private variable not a state
         * since we want to debounce rerenders
         *
         * A list of pages where each page contains a number of Nodes
         * [
         *  [Node 1, Node 2, Node 3.... Node N],
         *  [Node 1, Node 2, Node 3.... Node N],
         * ]
         */
        this.pagesToRender = [[]];
        this.currentTime = () => {
            return new Date().getTime();
        };
        this.observe = (el) => {
            if (!el)
                return;
            this.intersectionObserver.observe(el);
        };
    }
    /**
     * On a new node created
     */
    async onNewNode(node) {
        if (!this.shouldRenderNewNodes) {
            this.hasNewNodesToRender = true;
            return;
        }
        this.addNodeToRender(node, false);
        this.rerender();
    }
    /**
     * On node deleted
     */
    async onNodeDelete(key) {
        const oldLength = this.pagesToRender.flat().length;
        this.pagesToRender = this.pagesToRender.map((page) => page.filter((item) => item.id !== key));
        if (oldLength !== this.pagesToRender.flat().length) {
            this.rerender();
        }
    }
    /**
     * On node updated
     */
    async onNodeUpdate(key, newItem) {
        let shouldRerender = false;
        this.pagesToRender = this.pagesToRender.map((page) => page.map((item) => {
            if (item.id === key) {
                shouldRerender = true;
                return newItem;
            }
            return item;
        }));
        if (shouldRerender)
            this.rerender();
    }
    onItemChanged(newItemId, oldItemId) {
        if (newItemId !== oldItemId) {
            this.pagesToRender = [[]];
            this.loadFirstPage().then(() => this.rerender());
        }
    }
    connectedCallback() {
        this.rerender = debounce(this.rerender.bind(this), 50, { maxWait: 200 });
        this.intersectionObserver = new IntersectionObserver((entries) => {
            writeTask(() => {
                for (const entry of entries) {
                    if (entry.target.id === 'bottom-scroll') {
                        if (entry.isIntersecting)
                            this.loadBottom();
                        else
                            this.shouldRenderNewNodes = false;
                    }
                    if (entry.target.id === 'top-scroll' && entry.isIntersecting) {
                        this.loadTop();
                    }
                }
            });
        });
    }
    disconnectedCallback() {
        this.intersectionObserver.disconnect();
    }
    componentDidLoad() {
        /**
         * Adding observes here so that on the first render we scroll down
         * and shouldRenderNewNodes remains true
         */
        this.loadFirstPage();
        this.observe(this.$topRef);
        this.observe(this.$bottomRef);
    }
    componentDidRender() {
        if (this.shouldRenderNewNodes && this.autoScroll)
            smoothScrollToBottom(this.$paginatedList);
    }
    loadFirstPage() {
        return this.loadPage(this.currentTime(), this.pageSize, true, (data) => {
            if (data.length === 0) {
                this.showEmptyListLabel = true;
            }
        });
    }
    loadTop() {
        /**
         * If there is only one unfilled page or no page, no need to check
         * for top since it will be empty
         */
        if (this.pagesToRender.length === 0)
            return;
        if (this.pagesToRender.length === 1 && this.pagesToRender[0].length < this.pageSize)
            return;
        /**
         * TODO: Make this more flexible currently this only works with chat
         */
        const oldestVNode = this.pagesToRender[0][0];
        const oldestTimestamp = oldestVNode.timeMs;
        // TODO: scrollIntoView
        const onPageRendered = () => { }; // oldestVNode.$elm$?.scrollIntoView();
        this.loadPage(oldestTimestamp - 1, this.pageSize, true, onPageRendered);
    }
    loadBottom() {
        /**
         * If there is only one unfilled page or no page, no need to check
         * for top since it will be empty
         */
        if (this.pagesToRender.length === 0) {
            this.shouldRenderNewNodes = true;
            return;
        }
        if (this.pagesToRender.length === 1 && this.pagesToRender[0].length < this.pageSize) {
            this.shouldRenderNewNodes = true;
            return;
        }
        const newestVNode = this.pagesToRender.at(-1).at(-1);
        const newestTimestamp = newestVNode.timeMs;
        // TODO: scrollIntoView
        const onPageRendered = () => smoothScrollToBottom(this.$paginatedList);
        this.loadPage(newestTimestamp + 1, this.pageSize, false, onPageRendered);
    }
    addNodeToRender(node, addToStart) {
        if (addToStart) {
            const firstPage = this.pagesToRender[0];
            if (firstPage && (firstPage === null || firstPage === void 0 ? void 0 : firstPage.length) < this.pageSize) {
                /**
                 * If first page is not full then just add to that page
                 */
                firstPage.unshift(node);
            }
            else {
                /**
                 * If first page is full then add a new page to the start
                 */
                const newPage = [node];
                this.pagesToRender.unshift(newPage);
                this.removeLastPageIfNeeded(false);
            }
        }
        else {
            const [lastPage] = this.pagesToRender.slice(-1);
            if (lastPage && (lastPage === null || lastPage === void 0 ? void 0 : lastPage.length) < this.pageSize) {
                /**
                 * If last page is not full then just add it
                 */
                lastPage.push(node);
            }
            else {
                /**
                 * If last page is full add a new page with just
                 * this node
                 */
                const newPage = [node];
                this.pagesToRender.push(newPage);
                this.removeLastPageIfNeeded(true);
            }
        }
    }
    /**
     * @param start
     * @param end
     * @param reversed Defines whether to add the page at the beginning or the end
     * @param onPageLoaded Callback for when all new nodes are rendered
     */
    async loadPage(timestamp, size, reversed, onPageRendered = () => { }) {
        this.isLoading = true;
        const data = (await this.fetchData(timestamp, size, reversed));
        this.isLoading = false;
        if (!(data === null || data === void 0 ? void 0 : data.length)) {
            /**
             * While scrolling down if there were no new items found
             * then start rendering new nodes;
             */
            if (!reversed) {
                this.hasNewNodesToRender = false;
                this.shouldRenderNewNodes = true;
            }
            onPageRendered([]);
            return;
        }
        // const page = this.createNodes(data);
        // const lastNodeToBeRendered = page[page.length - 1];
        // let lastNodeToBeRenderedProxy = new Proxy(lastNodeToBeRendered, {
        //   set(obj, prop, value) {
        //     /**
        //      * Whenever the last node has the 'elm' property added to it
        //      * we can assume it has been rendered
        //      */
        //     if (prop === '$elm$' && value && !obj.$elm$) onPageRendered();
        //     obj[prop] = value;
        //     return true;
        //   },
        // });
        // page[page.length - 1] = lastNodeToBeRenderedProxy;
        data.forEach((node) => this.addNodeToRender(node, reversed));
        this.rerender();
        onPageRendered(data);
    }
    rerender() {
        this.rerenderBoolean = !this.rerenderBoolean;
    }
    removeLastPageIfNeeded(removeFromStart) {
        if (this.pagesToRender.length > this.pagesAllowed) {
            if (removeFromStart)
                this.pagesToRender.shift();
            else
                this.pagesToRender.pop();
        }
    }
    onDownArrowClicked() {
        /**
         * Load the freshest pages
         */
        this.loadBottom();
    }
    render() {
        var _a;
        /**
         * div.container is flex=column-reverse
         * which is why div#bottom-scroll comes before div#top-scroll
         * div.page-wrapper prevents reversal of messages
         */
        return (h(Host, { key: '4f1521c422a134079a5def745ed85631c48a132a' }, h("div", { key: '0cadd9723fbc844bab7e595d18b6174ecb6ba10c', class: "scrollbar container", part: "container", ref: (el) => (this.$paginatedList = el) }, h("div", { key: '35a9b009d74a81159c7b856b9412b670051c9893', class: { 'show-new-messages-ctr': true, active: !this.shouldRenderNewNodes } }, h("rtk-button", { key: '2798fbf3da7200db72dfe1f985d4570163d77ff8', class: "show-new-messages", kind: "icon", variant: "secondary", part: "show-new-messages", onClick: () => this.onDownArrowClicked() }, h("rtk-icon", { key: '08b47cd4f472b240174cee559d4d39cf796aa788', icon: this.iconPack.chevron_down }))), h("div", { key: 'ae30f2391936a8a4f258384cc8da4300bf2c350c', class: "smallest-dom-element", id: "bottom-scroll", ref: (el) => (this.$bottomRef = el) }), this.isLoading && this.pagesToRender.flat().length === 0 && h("rtk-spinner", { key: '72f866d03e6d0d954a46443aa19d95f7033dfbe9', size: "lg" }), this.pagesToRender.flat().length === 0 && this.showEmptyListLabel ? (h("div", { class: "empty-list" }, (_a = this.emptyListLabel) !== null && _a !== void 0 ? _a : this.t('list.empty'))) : (h("div", { class: "page-wrapper" }, this.pagesToRender.map((page) => this.createNodes(page)))), h("div", { key: 'c96065eee8e01c56c0f6cb419b5e26ceef564678', class: "smallest-dom-element", id: "top-scroll", ref: (el) => (this.$topRef = el) }))));
    }
    static get watchers() { return {
        "selectedItemId": ["onItemChanged"]
    }; }
    static get style() { return RtkPaginatedListStyle0; }
}, [1, "rtk-paginated-list", {
        "pageSize": [2, "page-size"],
        "pagesAllowed": [2, "pages-allowed"],
        "fetchData": [16],
        "createNodes": [16],
        "selectedItemId": [1, "selected-item-id"],
        "autoScroll": [4, "auto-scroll"],
        "iconPack": [16],
        "t": [16],
        "emptyListLabel": [1, "empty-list-label"],
        "isLoading": [32],
        "rerenderBoolean": [32],
        "shouldRenderNewNodes": [32],
        "hasNewNodesToRender": [32],
        "showEmptyListLabel": [32],
        "onNewNode": [64],
        "onNodeDelete": [64],
        "onNodeUpdate": [64]
    }, undefined, {
        "selectedItemId": ["onItemChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkPaginatedList.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkPaginatedList.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-paginated-list", "rtk-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-paginated-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkPaginatedList);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkPaginatedList as R, defineCustomElement as d };
