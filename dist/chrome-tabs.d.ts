import Draggabilly from "draggabilly";
export interface TabProperties {
    id: string;
    title: string;
    active?: boolean;
    favicon?: boolean | string;
    faviconClass?: string;
    isCloseIconVisible?: boolean;
}
declare class ChromeTabs {
    el: HTMLElement;
    styleEl: HTMLStyleElement;
    instanceId?: number;
    draggabillies: Draggabilly[];
    isDragging: any;
    draggabillyDragging: any;
    isMouseEnter: boolean;
    mouseEnterLayoutResolve: null | (() => void);
    constructor();
    init(el: HTMLElement): void;
    emit(eventName: string, data: any): void;
    setupCustomProperties(): void;
    setupStyleEl(): void;
    translateX: number;
    setupEvents(): void;
    onResize: () => void;
    onMouseLeave: () => void;
    get tabEls(): any[];
    get tabContentEl(): HTMLDivElement;
    get toolbarEl(): Element;
    get tabContentWidths(): number[];
    get tabContentPositions(): number[];
    get tabPositions(): number[];
    doLayout(): Promise<void>;
    layoutPromise: Promise<void> | null;
    layoutTabs(): Promise<void>;
    getTabsWidth(): number;
    justifyContentWidth(): Promise<void>;
    translateToView(): Promise<void>;
    createNewTabEl(): Element | null;
    addTab(tabProperties?: TabProperties, { animate, background }?: {
        animate?: boolean | undefined;
        background?: boolean | undefined;
    }): HTMLElement;
    setTabCloseEventListener(tabEl: HTMLElement): void;
    get activeTabEl(): Element | null;
    hasActiveTab(): boolean;
    setCurrentTab(tabEl: HTMLElement): void;
    removeTab(tabEl: HTMLElement): void;
    updateTab(tabEl: HTMLElement, tabProperties: TabProperties): void;
    cleanUpPreviouslyDraggedTabs(): void;
    setupDraggabilly(): void;
    animateTabMove(tabEl: HTMLElement, originIndex: number, destinationIndex: number): void;
    destroy(): void;
}
export default ChromeTabs;
