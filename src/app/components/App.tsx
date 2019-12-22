import * as React from "react";
import {
  calculateMaxWidth,
  createLine,
  getRandomWidthsArray,
  createStringSVG
} from "../utils/wireframe.tsx";
import LeftIcon from "./Icons/LeftIcon";
import RightIcon from "./Icons/RightIcon";
import CenterIcon from "./Icons/CenterIcon";
import { ALIGNMENT_TYPES, createArrayFromInt } from "../utils/helpers.tsx";
import "../styles/ui.css";
import "../styles/figma-plugin-ds.min.css";
import BoldIcon from "./Icons/BoldIcon";
import RefreshIcon from "./Icons/RefreshIcon";

const { useState } = React;

declare function require(path: string): any;

const App = ({}) => {
  const [radius, setRadius] = useState(2);
  const [alignment, setAlignment] = useState(1);
  const [words, setWords] = useState(3);
  const [lines, setLines] = useState(2);
  const [height, setHeight] = useState(12);
  const [spacing, setSpacing] = useState(4);
  const [structure, setStructure] = useState([]);
  const [maxWidth, setMaxWidth] = useState(100);
  const [svg, setSvg] = useState("");
  const [colors, setColors] = useState(["#3d50fc"]);

  const onCreate = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-svg",
          svg: createStringSVG({
            words,
            height,
            spacing,
            structure,
            radius,
            alignment,
            maxWidth
          })
        }
      },
      "*"
    );
  };

  const refreshState = () => {
    setStructure(getRandomWidthsArray(lines, words, height, colors));
  };

  React.useEffect(() => {
    setStructure(getRandomWidthsArray(lines, words, height, colors));
  }, [lines, words, colors]);

  React.useEffect(() => {
    setMaxWidth(calculateMaxWidth(structure, words, spacing));
  }, [structure, spacing]);

  //   React.useEffect(() => {
  //     setSvg(
  //       createStringSVG({
  //         words,
  //         height,
  //         spacing,
  //         structure,
  //         radius,
  //         alignment,
  //         maxWidth
  //       })
  //     );
  //   });

  React.useEffect(() => {
    setStructure(getRandomWidthsArray(lines, words, height, colors));

    // This is how we read messages sent from the plugin controller
    window.onmessage = event => {
      const { type, message } = event.data.pluginMessage;
      if (type === "create-svg") {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  const createSvgElement = () => {
    return (
      <svg width={maxWidth} height={height * lines + spacing * lines}>
        {createArrayFromInt(lines).map((row, index) => {
          return (
            <g key={index}>
              {createLine(
                index,
                words,
                spacing,
                height,
                radius,
                structure[index],
                alignment,
                maxWidth
              ).map(rect => (
                <>{rect}</>
              ))}
            </g>
          );
        })}
      </svg>
    );
  };

  const updateColors = colors => setColors(colors);

  return (
    <div className="app-container">
      <img
        src={require("../assets/logo.svg")}
        style={{ marginBottom: "2rem" }}
      />

      <div className="container-row">
        <div>
          <p className="row">
            Radius:{" "}
            <input
              type="range"
              className="slider"
              value={radius}
              onChange={e => setRadius(e.target.value)}
              min={0}
              max={Math.ceil(height / 2)}
              step={1}
            />
          </p>
          <p className="row">
            Words:{" "}
            <input
              type="range"
              className="slider"
              value={words}
              onChange={e => setWords(e.target.value)}
              min={0}
              max={8}
              step={1}
            />
          </p>
          <p className="row">
            Lines:{" "}
            <input
              type="range"
              className="slider"
              value={lines}
              onChange={e => setLines(e.target.value)}
              min={0}
              max={10}
              step={1}
            />
          </p>
          <p className="row">
            Height:{" "}
            <input
              type="range"
              className="slider"
              value={height}
              onChange={e => setHeight(e.target.value)}
              min={4}
              max={20}
              step={1}
            />
          </p>
          <p className="row" style={{ marginBottom: "1rem" }}>
            Spacing:{" "}
            <input
              type="range"
              className="slider"
              value={spacing}
              onChange={e => setSpacing(e.target.value)}
              min={4}
              max={20}
              step={1}
            />
          </p>
          <div className="row">
            <p>Align:</p>
            <div
              style={{
                backgroundColor:
                  alignment === ALIGNMENT_TYPES.LEFT ? "#0419D8" : "#DEE1FF",
                padding: "0.5rem",
                borderRadius: "50%"
              }}
              onClick={() => setAlignment(ALIGNMENT_TYPES.LEFT)}
            >
              <LeftIcon
                color={alignment === ALIGNMENT_TYPES.LEFT ? "#fff" : "#92A1FF"}
              />
            </div>
            <div
              style={{
                backgroundColor:
                  alignment === ALIGNMENT_TYPES.CENTER ? "#0419D8" : "#DEE1FF",
                padding: "0.5rem",
                borderRadius: "50%"
              }}
              onClick={() => setAlignment(ALIGNMENT_TYPES.CENTER)}
            >
              <CenterIcon
                color={
                  alignment === ALIGNMENT_TYPES.CENTER ? "#fff" : "#92A1FF"
                }
              />
            </div>
            <div
              style={{
                backgroundColor:
                  alignment === ALIGNMENT_TYPES.RIGHT ? "#0419D8" : "#DEE1FF",
                padding: "0.5rem",
                borderRadius: "50%"
              }}
              onClick={() => setAlignment(ALIGNMENT_TYPES.RIGHT)}
            >
              <RightIcon
                color={alignment === ALIGNMENT_TYPES.RIGHT ? "#fff" : "#92A1FF"}
              />
            </div>
          </div>
        </div>
        <div className="preview">{createSvgElement()}</div>
      </div>

      <div className="buttons-group">
        <button className="button-secondary" onClick={refreshState}>
          <RefreshIcon color="#0419d8" style={{ marginRight: "0.5rem" }} />
          Refresh
        </button>
        <button id="create" onClick={onCreate}>
          <BoldIcon color="#fff" style={{ marginRight: "0.5rem" }} />
          Place It
        </button>
      </div>

      <p style={{ marginTop: "1.5rem" }}>
        For more options check the{" "}
        <span
          className="link"
          onClick={() => window.open("https://www.wireframer.art", "_system")}
        >
          web app
        </span>
        .
      </p>
    </div>
  );
};

export default App;
