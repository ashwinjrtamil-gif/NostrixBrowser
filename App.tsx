import React, { useEffect, useState } from "react";
import { TabBar } from "./components/TabBar";
import { Browser } from "./components/Browser";

export type Tab = {
  id: string;
  url: string;
  title: string;
};

const defaultTabs: Tab[] = [
  { id: "1", url: "https://example.com", title: "Home" },
];

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>(() => {
    const saved = localStorage.getItem("tabs");
    return saved ? JSON.parse(saved) : defaultTabs;
  });

  const [activeId, setActiveId] = useState("1");

  useEffect(() => {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }, [tabs]);

  const activeTab = tabs.find((t) => t.id === activeId)!;

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: "https://example.com",
      title: "New Tab",
    };
    setTabs([...tabs, newTab]);
    setActiveId(newTab.id);
  };

  const updateTab = (id: string, url: string, title: string) => {
    setTabs(
      tabs.map((t) => (t.id === id ? { ...t, url, title } : t))
    );
  };

  const closeTab = (id: string) => {
    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);
    if (activeId === id && filtered.length) {
      setActiveId(filtered[0].id);
    }
  };

  return (
    <div className="app">
      <TabBar
        tabs={tabs}
        activeId={activeId}
        setActive={setActiveId}
        addTab={addTab}
        closeTab={closeTab}
      />
      <Browser tab={activeTab} updateTab={updateTab} />
    </div>
  );
}
