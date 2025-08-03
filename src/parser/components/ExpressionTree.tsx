import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { IAst, INode } from "../type";

export function ExpressionTree({ ast }: { ast: IAst | null }) {
  const svgRef = useRef(null);

  function convertAstToD3Tree(node: IAst): INode {
    const name =
      node.type + (node.value !== undefined ? ` = ${node.value}` : "");
    const children = [];

    if (node.first) children.push(convertAstToD3Tree(node.first));
    if (node.second) children.push(convertAstToD3Tree(node.second));

    return { name, children };
  }

  useEffect(() => {
    if (!ast) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 800;
    const height = 600;

    const rootData = convertAstToD3Tree(ast);
    const root = d3.hierarchy(rootData);
    const treeLayout = d3.tree().size([width - 100, height - 100]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(50, 50)");

    // Draw links
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .linkVertical()
          .x((d) => d.x)
          .y((d) => d.y)
      );

    // Draw nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#fff")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2);

    node
      .append("text")
      .attr("dy", 5)
      .attr("text-anchor", "middle")
      .text((d) => d.data.name);
  }, [ast]);

  if (!ast) return null;

  return (
    <pre className="mt-6 bg-gray-100 rounded text-sm overflow-x-auto text-black ast-tree">
      <b>Expression Tree</b>
      <svg ref={svgRef} width={800} height={600} role="img"></svg>
    </pre>
  );
}
