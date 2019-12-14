import * as React from "react";
import "../styles/ui.css";

const { useState } = React;

declare function require(path: string): any;

const App = ({}) => {
  const [radius, setRadius] = useState(1);
  const [align, setAlign] = useState(1);
  const [words, setWords] = useState(1);
  const [lines, setLines] = useState(1);
  const [height, setHeight] = useState(1);
  const [spacing, setSpacing] = useState(1);
  const [color, setColor] = useState("#ff0000");

  const onCreate = React.useCallback(() => {
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", align } },
      "*"
    );
  }, []);

  const onCancel = React.useCallback(() => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }, []);

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-rectangles") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <img src={require("../assets/logo.svg")} />
      <p>
        Align: <input value={align} onChange={e => setAlign(e.target.value)} />
      </p>
      <p>
        Radius:{" "}
        <input value={radius} onChange={e => setRadius(e.target.value)} />
      </p>
      <p>
        Words: <input value={words} onChange={e => setWords(e.target.value)} />
      </p>
      <p>
        Lines: <input value={lines} onChange={e => setLines(e.target.value)} />
      </p>
      <p>
        Height:{" "}
        <input value={height} onChange={e => setHeight(e.target.value)} />
      </p>
      <p>
        Spacing:{" "}
        <input value={spacing} onChange={e => setSpacing(e.target.value)} />
      </p>
      <button id="create" onClick={onCreate}>
        Place It
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default App;
