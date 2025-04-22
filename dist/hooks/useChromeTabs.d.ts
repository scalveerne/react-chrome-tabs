import React from "react";
import { TabProperties } from "../chrome-tabs";
export declare type Listeners = {
    onTabActive?: (tabId: string) => void;
    onTabClose?: (tabId: string) => void;
    onTabReorder?: (tabId: string, fromIdex: number, toIndex: number) => void;
    onDragBegin?: () => void;
    onDragEnd?: () => void;
    onContextMenu?: (tabId: string, event: MouseEvent) => void;
};
export declare function useChromeTabs(listeners: Listeners): {
    ChromeTabs: (props: {
        className?: string;
        darkMode?: boolean;
        toolbar?: React.ReactNode;
    }) => React.JSX.Element;
    addTab: (tab: TabProperties) => void;
    updateTab: (tabId: string, tab: TabProperties) => void;
    removeTab: (tabId: string) => void;
    activeTab: (tabId: string) => void;
    updateTabByIndex: (index: number, tab: TabProperties) => void;
};
