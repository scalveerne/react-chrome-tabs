import React from "react";
import { Listeners } from "./hooks/useChromeTabs";
import { TabProperties } from "./chrome-tabs";
export declare type TabsProps = Listeners & {
    tabs: TabProperties[];
    className?: string;
    darkMode?: boolean;
    pinnedRight?: React.ReactNode;
};
export declare function Tabs({ tabs, className, darkMode, onTabActive: onTabActive, onTabClose: onTabClose, onTabReorder, onContextMenu, pinnedRight: toolbar, }: TabsProps): React.JSX.Element;
