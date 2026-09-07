import {
  parse
} from "./chunk-EKA43EV6.js";
import "./chunk-LYYA6GB5.js";
import "./chunk-33MMWIVA.js";
import "./chunk-Q3OM67IS.js";
import "./chunk-IPNFK5KL.js";
import "./chunk-HCTQ3TIS.js";
import "./chunk-D6A7MOVM.js";
import "./chunk-M52XIXW5.js";
import "./chunk-RNOSOWOT.js";
import {
  package_default
} from "./chunk-JT737LX2.js";
import {
  selectSvgElement
} from "./chunk-JKLI5UEW.js";
import {
  __name,
  configureSvgSize,
  log
} from "./chunk-BZX2WZI6.js";
import "./chunk-QSCUV4CX.js";
import "./chunk-T4KQPHTV.js";
import "./chunk-FDBJFBLO.js";

// node_modules/mermaid/dist/chunks/mermaid.core/infoDiagram-PH2N3AL5.mjs
var parser = {
  parse: __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};
var DEFAULT_INFO_DB = { version: package_default.version };
var getVersion = __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};
var draw = __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
//# sourceMappingURL=infoDiagram-PH2N3AL5-UJXOWCGK.js.map
