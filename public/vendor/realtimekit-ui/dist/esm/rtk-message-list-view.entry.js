import { r as registerInstance, w as writeTask, h } from './index-c1fb98bb.js';
import { e as defaultIconPack } from './ui-store-0098d5c6.js';
import { S as SyncWithStore } from './index-914449da.js';
import { d as debounce } from './debounce-3ef43cb6.js';

const rtkMessageListViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.loading{cursor:wait}.content-wrapper{height:100%;overflow-y:auto;position:relative;contain:strict}.scroller{width:1px;opacity:0}.content{position:absolute;top:0;width:100%}.smallest-dom-element{width:100%;height:2px;background:red}.loader{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-2, 8px);display:flex;justify-content:center}";
const RtkMessageListViewStyle0 = rtkMessageListViewCss;

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
const MAX_VISIBLE_ITEMS = 20;
const OVERSCAN_BUFFER = 5;
const RtkMessageListView = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Maximum visible messages */
        this.visibleItemsCount = MAX_VISIBLE_ITEMS;
        /** Estimated height of an item */
        this.estimateItemSize = 100;
        /** Icon pack */
        this.iconPack = defaultIconPack;
        this.isFetching = false;
        this.autoScroll = true;
        this.totalHeight = 0;
        this.sizes = new Map();
        this.lastScrollTop = 0;
        this.scrollToBottomRetries = 0;
        this.elementObserver = (() => {
            let _ro = null;
            const get = () => {
                if (_ro) {
                    return _ro;
                }
                else if (typeof ResizeObserver !== 'undefined') {
                    return (_ro = new ResizeObserver((entries) => {
                        entries.forEach((entry) => {
                            this.measureElement(entry.target, entry);
                        });
                    }));
                }
                else {
                    return null;
                }
            };
            return {
                disconnect: () => { var _a; return (_a = get()) === null || _a === void 0 ? void 0 : _a.disconnect(); },
                observe: (target) => { var _a; return (_a = get()) === null || _a === void 0 ? void 0 : _a.observe(target, { box: 'border-box' }); },
                unobserve: (target) => { var _a; return (_a = get()) === null || _a === void 0 ? void 0 : _a.unobserve(target); },
            };
        })();
        this.measureElement = (node, entry) => {
            if (!node)
                return;
            const id = node.dataset.id;
            if (this.sizes.has(id)) {
                this.elementObserver.unobserve(node);
                return;
            }
            if (entry) {
                const box = entry.borderBoxSize[0];
                if (box && box.blockSize > 0) {
                    this.saveItemSize(id, box.blockSize);
                    this.elementObserver.unobserve(node);
                    return;
                }
            }
            const rect = node.getBoundingClientRect();
            if (rect.height > 0)
                this.saveItemSize(id, rect.height);
        };
        this.getVisibleItems = () => {
            return this.messages.slice(this.range.start, this.range.end + 1);
        };
        this.updateVisibleItems = (start, end) => {
            const total = this.messages.length;
            let newStart = start;
            let newEnd = end;
            if (total <= this.visibleItemsCount) {
                // render all
                newStart = 0;
                newEnd = total - 1;
            }
            else if (end - start < this.visibleItemsCount - 1) {
                // if range is less then visible, adjust start based on end
                newStart = this.range.end - this.visibleItemsCount + 1;
            }
            if (this.range.start !== newStart) {
                this.range = { start: newStart, end: newEnd };
                this.totalHeight = this.getRangeSize(0, total);
            }
        };
        this.getEstimatedItemSize = () => {
            return this.estimateItemSize;
        };
        this.getRangeSize = (start, end) => {
            let total = 0;
            let itemSize = 0;
            for (let index = start; index < end; index++) {
                itemSize = this.sizes.get(this.messages[index].id);
                total = total + (!!itemSize ? itemSize : this.getEstimatedItemSize());
            }
            return total;
        };
        this.getScrollTop = () => {
            return this.$listRef ? Math.ceil(this.$listRef.scrollTop) : 0;
        };
        this.getClientHeight = () => {
            return this.$listRef ? Math.ceil(this.$listRef.clientHeight) : 0;
        };
        this.getScrollHeight = () => {
            return this.$listRef ? Math.ceil(this.$listRef.scrollHeight) : 0;
        };
        this.getItemsScrolled = () => {
            const offset = this.lastScrollTop;
            if (offset <= 0) {
                return 0;
            }
            let low = 0;
            let middle = 0;
            let middleOffset = 0;
            let high = this.messages.length;
            while (low <= high) {
                middle = (low + high) >>> 1;
                middleOffset = this.getRangeSize(0, middle);
                if (middleOffset === offset) {
                    return middle;
                }
                else if (middleOffset < offset) {
                    low = middle + 1;
                }
                else if (middleOffset > offset) {
                    high = middle - 1;
                }
            }
            return low > 0 ? --low : 0;
        };
        this.getEndByStart = (start) => {
            return Math.min(start + this.visibleItemsCount, this.messages.length - 1);
        };
        this.scrollToOffset = (offset) => {
            if (this.$listRef) {
                this.$listRef.scrollTop = offset;
            }
        };
        this.scrollToIndex = (index) => {
            if (index >= this.messages.length - 1) {
                this.scrollToBottom();
            }
            else {
                const offset = index < 1 ? 0 : this.getRangeSize(0, index);
                this.scrollToOffset(offset);
            }
        };
        this.scrollToBottom = () => {
            if (!this.$listEndRef)
                return;
            writeTask(() => {
                this.$listEndRef.scrollIntoView();
                if (this.getScrollHeight() - (this.getScrollTop() + this.getClientHeight()) > 0 &&
                    this.scrollToBottomRetries < 10) {
                    setTimeout(() => {
                        this.scrollToBottom();
                    }, 1000 / 60);
                }
                else {
                    this.scrollToBottomRetries = 0;
                    this.autoScroll = true;
                }
            });
        };
        this.handleScroll = async () => {
            if (this.isFetching)
                return;
            const scrollTop = this.getScrollTop();
            const direction = scrollTop < this.lastScrollTop || scrollTop === 0 ? 'UP' : 'DOWN';
            this.lastScrollTop = scrollTop;
            if (this.loadMore && scrollTop === 0 && direction === 'UP' && this.isFetching === false) {
                this.isFetching = true;
                const newMessages = await this.loadMore(this.messages[0]);
                if (newMessages && newMessages.length) {
                    this.messages = [...newMessages, ...this.messages];
                }
                this.isFetching = false;
            }
            if (direction === 'UP') {
                this.handleTop();
            }
            else if (direction === 'DOWN') {
                this.handleBottom();
            }
        };
        this.handleTop = () => {
            const scrolledItems = this.getItemsScrolled();
            if (scrolledItems <= this.range.end - OVERSCAN_BUFFER) {
                this.autoScroll = false;
            }
            if (scrolledItems > this.range.start + OVERSCAN_BUFFER) {
                return;
            }
            const newStart = Math.max(this.range.start - OVERSCAN_BUFFER, 0);
            this.updateVisibleItems(newStart, this.getEndByStart(newStart));
        };
        this.handleBottom = () => {
            const scrolledItems = this.getItemsScrolled();
            if (scrolledItems < this.range.start + OVERSCAN_BUFFER) {
                return;
            }
            const newStart = this.range.start + OVERSCAN_BUFFER;
            const newEnd = this.getEndByStart(newStart);
            if (newEnd === this.messages.length - 1) {
                this.updateVisibleItems(newEnd - this.visibleItemsCount, newEnd);
            }
            else {
                this.updateVisibleItems(newStart, newEnd);
            }
        };
        this.updateTotalHeight = debounce(() => {
            this.totalHeight = this.getRangeSize(0, this.messages.length);
        }, 1000 / 30, { leading: true });
        this.rendererInternal = (containerElement, message, index) => {
            if (!containerElement)
                return;
            if (containerElement.dataset.id === message.id)
                return;
            const viewElement = this.renderer(message, index);
            if (containerElement.hasChildNodes) {
                containerElement.innerHTML = '';
            }
            this.elementObserver.observe(containerElement);
            containerElement.dataset.id = message.id;
            containerElement.appendChild(viewElement);
        };
    }
    connectedCallback() {
        const total = this.messages.length - 1;
        this.range = { start: total - this.visibleItemsCount, end: total };
        this.updateVisibleItems(this.range.start, this.range.end);
        this.totalHeight = this.getRangeSize(0, total);
    }
    componentDidLoad() {
        if (this.autoScroll) {
            this.scrollToBottom();
        }
    }
    messagesUpdated(newValue, previousValue) {
        if (newValue.length > previousValue.length) {
            const diff = newValue.length - previousValue.length;
            this.updateVisibleItems(diff, this.getEndByStart(diff));
            this.scrollToIndex(this.range.start);
        }
    }
    saveItemSize(id, height) {
        this.sizes.set(id, Math.round(height));
        this.updateTotalHeight();
    }
    render() {
        return (h("div", { key: '4da03366f085b87729d946b1633d031e4656f2ac', class: "scrollbar content-wrapper", ref: (el) => (this.$listRef = el), onScroll: this.handleScroll }, h("div", { key: '7a8268e8a3d5326d359f4722c341e6487e1f21f6', class: "scroller" }, h("div", { key: 'b856c5ec8c602963ab9bd74e9838b4ce6bf05f85', style: {
                height: `${this.totalHeight}px`,
            } }), h("div", { key: 'a7fe4267408199ffe0f81b56c00f3dffb5e2e59f', class: "smallest-dom-element", id: "list-end", ref: (el) => (this.$listEndRef = el) })), h("div", { key: 'bcd29a59a370c975ab344cabeefdd7ce905f37fe', class: "content", style: {
                transform: `translateY(${this.getRangeSize(0, this.range.start)}px)`,
            } }, this.isFetching && (h("div", { key: '6529fdc824381737d75e489f262dcf90bd12e186', class: "loader" }, h("rtk-spinner", { key: '8785a6b44007f8ce834639b5e6ae9221a6df704c', size: "md" }))), this.getVisibleItems().map((msg, index) => (h("div", { key: msg.id, ref: (el) => this.rendererInternal(el, msg, index) }))))));
    }
    static get watchers() { return {
        "messages": ["messagesUpdated"]
    }; }
};
__decorate([
    SyncWithStore()
], RtkMessageListView.prototype, "iconPack", void 0);
RtkMessageListView.style = RtkMessageListViewStyle0;

export { RtkMessageListView as rtk_message_list_view };
