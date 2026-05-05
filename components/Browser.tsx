import React, { useState } from "react";
import { Tab } from "../App";

export function Browser({
  tab,
  updateTab,
}: {
  tab: Tab;
  updateTab: (id: string, url: string, title: string) => void;
}) {
  const [input, setInput] = useState(tab.url);

  const navigate = () => {
    let url = input;
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const title = url.replace("https://", "").split("/")[0];

    updateTab(tab.id, url, title);
  };

  return (
    <div className="browser">
      <div className="nav">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL"
        />
        <button onClick={navigate}>Go</button>
      </div>

      <iframe src={tab.url} title="browser" />
    </div>
  );
}
