import React from "react";
import { Tab } from "../App";

export function TabBar({
  tabs,
  activeId,
  setActive,
  addTab,
  closeTab,
}: {
  tabs: Tab[];
  activeId: string;
  setActive: (id: string) => void;
  addTab: () => void;
  closeTab: (id: string) => void;
}) {
  return (
    <div className="tabbar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.id === activeId ? "active" : ""}`}
          onClick={() => setActive(tab.id)}
        >
          {tab.title}
          <button onClick={() => closeTab(tab.id)}>x</button>
        </div>
      ))}
      <button onClick={addTab}>+</button>
    </div>
  );
}
