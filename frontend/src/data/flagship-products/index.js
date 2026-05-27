import rafale from "./rafale.js";
import f35 from "./f35.js";
import f22 from "./f22.js";
import eurofighter from "./eurofighter.js";
import gripen from "./gripen.js";
import mq9 from "./mq9.js";
import m1a2 from "./m1a2.js";
import leopard2 from "./leopard2.js";
import patriot from "./patriot.js";
import thaad from "./thaad.js";
import ironDome from "./iron_dome.js";
import virginiaClass from "./virginia_class.js";
import caesar from "./caesar.js";
import ah64Apache from "./ah64_apache.js";
import b21Raider from "./b21_raider.js";
import tomahawk from "./tomahawk.js";
import bayraktarTB2 from "./bayraktar_tb2.js";
import k2BlackPanther from "./k2_black_panther.js";
import su57 from "./su57.js";
import type26 from "./type26.js";
import fremm from "./fremm.js";

// Registry: product name (must match seed data exactly) → enriched detail object.
export const FLAGSHIP_PRODUCTS = {
  "Rafale F4": rafale,
  "F-35 Lightning II": f35,
  "F-22 Raptor": f22,
  "Eurofighter Typhoon": eurofighter,
  "Gripen E": gripen,
  "MQ-9 Reaper": mq9,
  "M1A2 Abrams SEPv3": m1a2,
  "Leopard 2A7+": leopard2,
  "Patriot PAC-3": patriot,
  "THAAD": thaad,
  "Iron Dome": ironDome,
  "Virginia-class Submarine": virginiaClass,
  "CAESAR": caesar,
  "AH-64E Apache Guardian": ah64Apache,
  "B-21 Raider": b21Raider,
  "Tomahawk Block V": tomahawk,
  "Bayraktar TB2": bayraktarTB2,
  "K2 Black Panther": k2BlackPanther,
  "Su-57 Felon": su57,
  "Type 26 Frigate": type26,
  "FREMM Frigate": fremm,
};
