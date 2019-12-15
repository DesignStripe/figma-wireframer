import * as React from "react";
import { getRandomInt, createArrayFromInt, ALIGNMENT_TYPES } from "./helpers";

const RECTANGLE_MIN_WIDTH = 10;
const RECTANGLE_MAX_WIDTH = 80;
const COLOR = "#aaa";

export function getRandomWidthsArray(lines, words, min, colors) {
  return createArrayFromInt(lines).map(() =>
    createArrayFromInt(getRandomInt(1, words)).map(() => ({
      width: getRandomInt(min, RECTANGLE_MAX_WIDTH),
      color: colors[getRandomInt(0, colors.length - 1)]
    }))
  );
}

export function calculateMaxWidth(structure, words, spacing) {
  if (structure.length === 0) return;
  const widthArray = structure.map(line => line.map(row => row.width));

  const lines = widthArray.map(line => line.reduce((a, b) => a + b, 0));
  const max = lines.reduce((a, b) => Math.max(a, b));

  return max + words * spacing;
}

function rectangle(x = 0, y = 0, width, height, color = COLOR, radius = 0) {
  return (
    <rect x={x} y={y} fill={color} width={width} height={height} rx={radius} />
  );
}

export function createLine(
  rowNum,
  words,
  spacing,
  height,
  radius,
  structure = [],
  alignment = ALIGNMENT_TYPES.LEFT,
  maxWidth
) {
  let lastWidth = 0;
  let totalWidth = 0;
  const firstRow = rowNum === 0;
  const numOfWords = firstRow ? words : getRandomInt(1, words);

  const rects = createArrayFromInt(structure.length).map((useless, i) => {
    const currentWidth = structure[i].width;
    const color = structure[i].color;
    totalWidth += lastWidth;
    lastWidth = currentWidth;

    var lineWidth = 0;
    structure.forEach(item => (lineWidth += item.width));
    lineWidth += (structure.length - 1) * spacing;

    const x = findX(
      alignment,
      maxWidth,
      lineWidth,
      totalWidth + i * spacing,
      currentWidth
    );

    return rectangle(
      x,
      height * rowNum + spacing * rowNum,
      currentWidth,
      height,
      color,
      radius
    );
  });

  return rects;
}

export function createStringSVG({
  words,
  height,
  spacing,
  structure,
  radius,
  alignment,
  maxWidth
}) {
  const widthAttr = maxWidth;
  const heightAttr = height * structure.length + spacing * structure.length;

  return `
    <svg
      width="${widthAttr}"
      height="${heightAttr}"
      viewBox="0 0 ${widthAttr} ${heightAttr}"
      xmlns="http://www.w3.org/2000/svg"
    >
      ${createArrayFromInt(structure.length)
        .map((notNeeded, rowIndex) => {
          let lastWidth = 0;
          let totalWidth = 0;
          var lineWidth = 0;
          structure[rowIndex].forEach(item => (lineWidth += item.width));
          lineWidth += (structure[rowIndex].length - 1) * spacing;
          return `<g>
            ${createArrayFromInt(structure[rowIndex].length)
              .map((y, columnIndex) => {
                const currentWidth = structure[rowIndex][columnIndex].width;
                const currentColor = structure[rowIndex][columnIndex].color;
                totalWidth += lastWidth;
                lastWidth = currentWidth;
                const x = findX(
                  alignment,
                  maxWidth,
                  lineWidth,
                  totalWidth + columnIndex * spacing,
                  currentWidth
                );
                return `
                <rect 
                  x="${x}"
                  y="${height * rowIndex + spacing * rowIndex}"
                  fill="${currentColor}"
                  width="${currentWidth}"
                  height="${height}"
                  rx="${radius}"
                />
              `;
              })
              .join(" ")}
          </g>`;
        })
        .join(" ")}
    </svg>
  `;
}

function findX(alignment, maxWidth, lineWidth, widthSoFar, currentWidth) {
  switch (alignment) {
    case ALIGNMENT_TYPES.LEFT:
      return widthSoFar;

    case ALIGNMENT_TYPES.CENTER:
      return (maxWidth - lineWidth) / 2 + widthSoFar;

    case ALIGNMENT_TYPES.RIGHT:
      return maxWidth - currentWidth - widthSoFar;

    default:
      return 0;
  }
}
