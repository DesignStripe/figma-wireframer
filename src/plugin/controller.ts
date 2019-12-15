figma.showUI(__html__, { width: 700, height: 520 });

figma.ui.onmessage = msg => {
  if (msg.type === "create-svg") {
    const nodes = [];

    const { svg } = msg;
    console.log(svg);

    const wireframe = figma.createNodeFromSvg(svg);
    wireframe.name = "Wireframer";
    figma.currentPage.appendChild(wireframe);
    figma.currentPage.selection = [wireframe];
    figma.viewport.scrollAndZoomIntoView(nodes);

    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }

    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: "create-svg",
      message: `Created SVG`
    });
  }

  //   figma.closePlugin();
};
