import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API, useAuth } from "@/App";
import { getLogoUrl } from "@/lib/companyLogos";
import CompanyProfileSheet from "@/components/CompanyProfileSheet";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Search, ArrowRight, ArrowLeftRight, Plus, CircleDot,
  Clock, Database, Filter, TrendingUp, ChevronDown, ChevronUp,
  ChevronLeft, ChevronRight,
  ExternalLink, Download, Calendar, User, AlertTriangle,
  RefreshCw, Trophy, Info, SlidersHorizontal, FileText, X, Zap,
} from "lucide-react";
import { format } from "date-fns";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

// ── Constants ──────────────────────────────────────────────────────────────

const PAGE_SIZE      = 50;
const HIST_PAGE_SIZE = 100;

// Auto-refresh: re-fetch deals on this interval so newly-scraped acquisitions show
// up in the spotlight + table without a manual refresh. The backend scrapes new
// deals on its own schedule; the page just re-reads them. We also refresh whenever
// the tab regains focus, which is the practical trigger for most visits.
const AUTO_REFRESH_MS = 6 * 60 * 60 * 1000; // 6 hours

const MIN_VALUE_OPTIONS = [
  { value: 0,    label: "All" },
  { value: 100,  label: "≥$100M" },
  { value: 500,  label: "≥$500M" },
  { value: 1000, label: "≥$1B" },
  { value: 5000, label: "≥$5B" },
];

const STATUS_OPTIONS = [
  { value: "all",          label: "All Statuses" },
  { value: "announced",    label: "Announced" },
  { value: "pending",      label: "Pending" },
  { value: "under_review", label: "Under Review" },
  { value: "completed",    label: "Completed" },
  { value: "active",       label: "Active (JV/Structure)" },
  { value: "cancelled",    label: "Cancelled" },
  { value: "dissolved",    label: "Dissolved" },
  { value: "exited",       label: "Exited" },
];

const INVEST_TYPES = ["strategic_investment", "minority_stake", "funding_round"];

const YEAR_OPTIONS = [
  { value: "all", label: "All Years" },
  ...[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => ({
    value: String(y), label: String(y),
  })),
];

const PERIOD_OPTIONS = [
  { value: "7",  label: "7D" },
  { value: "30", label: "30D" },
  { value: "90", label: "90D" },
  { value: "0",  label: "All" },
];

const SECTOR_OPTIONS = [
  { value: "all",                label: "All Sectors" },
  { value: "cyber",              label: "Cyber" },
  { value: "space",              label: "Space" },
  { value: "uas_drones",         label: "UAS / Drones" },
  { value: "missiles_munitions", label: "Missiles & Munitions" },
  { value: "naval",              label: "Naval" },
  { value: "land_systems",       label: "Land Systems" },
  { value: "c2_electronics",     label: "C2 & Electronics" },
  { value: "aircraft",           label: "Aircraft" },
  { value: "services_it",        label: "Services & IT" },
  { value: "other",              label: "Other" },
];

const COMPANY_TICKER_MAP = {
  "Lockheed Martin":            "LMT",
  "Raytheon Technologies":      "RTX",
  "Northrop Grumman":           "NOC",
  "General Dynamics":           "GD",
  "Boeing Defense":             "BA",
  "L3Harris Technologies":      "LHX",
  "BAE Systems":                "BA.L",
  "Thales":                     "HO.PA",
  "Airbus Defence & Space":     "AIR.PA",
  "Rheinmetall":                "RHM.DE",
  "Safran":                     "SAF.PA",
  "Leonardo":                   "LDO.MI",
  "Dassault Aviation":          "AM.PA",
  "HEICO Corporation":          "HEI",
  "TransDigm":                  "TDG",
  "Mercury Systems":            "MRCY",
  "Teledyne Technologies":      "TDY",
  "Leidos Holdings":            "LDOS",
  "SAIC":                       "SAIC",
  "Booz Allen Hamilton":        "BAH",
};

const LOGO_FALLBACK = {
  // ── US Primes ────────────────────────────────────────────────────────────────
  "Lockheed Martin":                      "lockheedmartin.com",
  "Raytheon Technologies":               "rtx.com",
  "RTX":                                 "rtx.com",
  "RTX Ventures":                        "rtx.com",
  "L3Harris":                            "l3harris.com",
  "L3Harris Technologies":               "l3harris.com",
  "Harris Corporation":                  "harris.com",
  "L3 Technologies":                     "l3t.com",
  "United Technologies Corporation":     "utc.com",
  "Northrop Grumman":                    "northropgrumman.com",
  "General Dynamics":                    "gd.com",
  "BAE Systems":                         "baesystems.com",
  "Thales":                              "thalesgroup.com",
  "Leonardo":                            "leonardo.com",
  "Leonardo DRS":                        "leonardodrs.com",
  "Airbus":                              "airbus.com",
  "Rheinmetall":                         "rheinmetall.com",
  "Safran":                              "safran-group.com",
  "KNDS":                                "knds.com",
  "KNDS France":                         "knds.com",
  "KNDS Germany":                        "knds.com",
  "Hanwha":                              "hanwha.com",
  "Hanwha Ocean":                        "hanwha.com",
  "Boeing":                              "boeing.com",
  "Teledyne Technologies":               "teledyne.com",
  "FLIR Systems":                        "flir.com",
  "Parker Hannifin":                     "parker.com",
  "Meggitt":                             "meggitt.com",
  "Cobham":                              "cobham.com",
  "Ultra Electronics":                   "ultra.group",
  "TransDigm":                           "transdigm.com",
  "Mercury Systems":                     "mrcy.com",
  "AeroVironment":                       "avinc.com",
  "Shield AI":                           "shield.ai",
  "SAIC":                                "saic.com",
  "Spirit AeroSystems":                  "spiritaero.com",
  "Collins Aerospace Actuation":         "collinsaerospace.com",
  "Ball Aerospace":                      "ball.com",
  "Terran Orbital":                      "terranorbital.com",
  "Dassault Aviation":                   "dassault-aviation.com",
  "Dassault":                            "dassault-aviation.com",
  "Naval Group":                         "naval-group.com",
  "Fincantieri":                         "fincantieri.com",
  "Shark Robotics":                      "shark-robotics.com",
  "RBSL":                                "rbsl.co.uk",
  "KNDS Deutschland":                    "knds.com",
  "Airbus D&S":                          "airbus.com",
  "Thales Alenia Space":                 "thalesgroup.com",
  "Airbus Helicopters":                  "airbus.com",
  "Airbus Defence & Space":              "airbus.com",
  "Airbus Defence and Space":            "airbus.com",
  "Fokker":                              "fokker.com",
  "GKN Fokker":                          "fokker.com",
  "Eurosam":                             "eurosam.com",
  "NHIndustries":                        "nhindustries.com",
  "Tencore":                             "tencore.com",
  "Anduril":                             "anduril.com",
  "Anduril Industries":                  "anduril.com",
  "Palantir":                            "palantir.com",
  "Kratos":                              "kratosdefense.com",
  "Helsing":                             "helsing.ai",
  "Milrem Robotics":                     "milremrobotics.com",
  "Preligens":                           "preligens.com",
  "Capella Space":                       "capellaspace.com",
  "Epirus":                              "epirusinc.com",
  "Harmattan.ai":                        "harmattan.ai",
  "Hermeus":                             "hermeus.com",
  "Skydio":                              "skydio.com",
  "True Anomaly":                        "trueanomaly.space",
  "Ursa Major":                          "ursamajor.com",
  "Mach Industries":                     "machindustries.co",
  // ── Investors / VCs ─────────────────────────────────────────────────────────
  "Andreessen Horowitz":                 "a16z.com",
  "Andreessen Horowitz / Founders Fund": "a16z.com",
  "Founders Fund":                       "foundersfund.com",
  "General Catalyst":                    "generalcatalyst.com",
  "Lux Capital":                         "luxcapital.com",
  "General Atlantic":                    "generalatlantic.com",
  "Tiger Global Management":             "tigerglobal.com",
  "Carlyle Group":                       "carlyle.com",
  // ── New acquirers / targets (2019-2026) ─────────────────────────────────────
  "Viasat":                              "viasat.com",
  "Inmarsat":                            "inmarsat.com",
  "Orolia":                              "orolia.com",
  "Extant Aerospace":                    "extantaerospace.com",
  "Veritas Capital":                     "veritascapital.com",
  "Cubic Corporation":                   "cubic.com",
  "Vectrus":                             "vectrus.com",
  "Vertex Aerospace":                    "vertexaero.com",
  "LGS Innovations":                     "lgsinnovations.com",
  "Liberty IT Solutions":                "libertyits.com",
  "Booz Allen Hamilton":                 "boozallen.com",
  "Blue Force Technologies":             "blueforcetechnologies.com",
  "Parsons Corporation":                 "parsons.com",
  "Xator Corporation":                   "xator.com",
  "Axon Enterprise":                     "axon.com",
  "Dedrone":                             "dedrone.com",
  "DART Aerospace":                      "dartaerospace.com",
  "Hanwha Systems":                      "hanwha.com",
  "Phasor Solutions":                    "phasor.co.uk",
  "Hirtenberger Defence Products":       "hirtenbergerdefence.com",
  "Chemring Group":                      "chemring.co.uk",
  "Roke Manor Research":                 "roke.co.uk",
  "Integrated Defense Technologies":     "idt-usa.com",
  "Rocket Crafters":                     "rocketcrafters.com",
  "Tactical Robotics":                   "tacticalrobotics.com",
  "1901 Group":                          "1901group.com",
  "Universal Avionics":                  "uasc.com",
  // ── Defense / Aerospace ─────────────────────────────────────────────────────
  "ArianeGroup":                         "arianegroup.com",
  "MBDA":                                "mbda-systems.com",
  "RADA Electronic Industries":          "rada.com",
  "Nightwing Group":                     "nightwing.com",
  "Nightwing":                           "nightwing.com",
  "Rebellion Defense":                   "rebelliondefense.com",
  "EDGE Group":                          "edgegroup.ae",
  "Texelis":                             "texelis.com",
  "Texelis Defense":                     "texelis.com",
  "Tomahawk Robotics":                   "tomahawkrobotics.com",
  "Saab":                                "saabgroup.com",
  "Saab AB":                             "saabgroup.com",
  "MD Helicopters":                      "mdhelicopters.com",
  "Calspan Corporation":                 "calspan.com",
  "Kongsberg":                           "kongsberg.com",
  "Kongsberg Defence & Aerospace":       "kongsberg.com",
  "Patria":                              "patriagroup.com",
  "Patria Oyj":                          "patriagroup.com",
  "Leidos":                              "leidos.com",
  "Dynetics":                            "dynetics.com",
  "Loc Performance Products":            "rheinmetall.com",
  "Indra":                               "indracompany.com",
  "Expal Systems":                       "expal.com",
  "Imperva":                             "imperva.com",
  "Aerojet Rocketdyne":                  "aerojetrocketdyne.com",
  "Aerojet":                             "aerojetrocketdyne.com",
  "Hensoldt":                            "hensoldt.net",
  "QinetiQ":                             "qinetiq.com",
  "Babcock":                             "babcock.com",
  "Babcock International":               "babcock.com",
  "Frazer-Nash Consultancy":             "fnc.co.uk",
  "Elbit Systems":                       "elbitsystems.com",
  "IMI Systems":                         "elbitsystems.com",
  "HEICO":                               "heico.com",
  "HEICO Corporation":                   "heico.com",
  "Wencor Group":                        "wencorgroup.com",
  "Huntington Ingalls Industries":       "hii.com",
  "HII":                                 "hii.com",
  "Alion Science and Technology":        "alionscience.com",
  "Peraton":                             "peraton.com",
  "Perspecta":                           "perspecta.com",
  "ManTech International":               "mantech.com",
  "Exail":                               "exail.com",
  "iXBlue":                              "ixblue.com",
  "ECA Group":                           "ecagroup.com",
  "Avantus Federal":                     "avantus.com",
  "Condor Systems":                      "condorsystems.com",
  "Blue Canyon Technologies":            "bluecanyontech.com",
  "Martin UAV":                          "martinuav.com",
  "Gibbs & Cox":                         "gibbscox.com",
  "Ercom":                               "ercom.fr",
  "Bombardier":                          "bombardier.com",
  "Bombardier C Series":                 "bombardier.com",
  "Bombardier C Series programme":       "bombardier.com",
  "Adranos":                             "adranos.com",
  "Area-I":                              "area-i.com",
  // ── European deals (Top-30 list) ────────────────────────────────────────────
  "Viasat":                              "viasat.com",
  "Inmarsat":                            "inmarsat.com",
  "Thoma Bravo":                         "thomabravo.com",
  "Darktrace":                           "darktrace.com",
  "SES":                                 "ses.com",
  "Intelsat":                            "intelsat.com",
  "Eutelsat":                            "eutelsat.com",
  "OneWeb":                              "oneweb.net",
  "Bain Capital":                        "baincapital.com",
  "ITP Aero":                            "itp.com",
  "Iveco Defence Vehicles":              "ivecodefence.com",
  "Eaton":                               "eaton.com",
  "Ultra PCS":                           "ultra.group",
  "CPI TMD":                             "cpii.com",
  "Cobham Aerospace Communications":     "cobham.com",
  "KKR":                                 "kkr.com",
  "OHB SE":                              "ohb.de",
  "Hispasat":                            "hispasat.com",
  "Hisdesat":                            "hispasat.com",
  "Fiocchi Munizioni":                   "fiocchi.com",
  "Czechoslovak Group":                  "czechoslovakgroup.cz",
  "ESG Elektroniksystem":                "esg.de",
  "Colt CZ Group":                       "cz-group.eu",
  "Sellier & Bellot":                    "sellier-bellot.cz",
  "AE Industrial Partners":              "aeroequity.com",
  "Beretta Holding":                     "beretta.com",
  "RUAG Ammotec":                        "ruag.com",
  "Kratos Defense":                      "kratosdefense.com",
  "Orbit Intelligence":                  "orbitgt.com",
  "Ondas Holdings":                      "ondas.com",
  "Sentrycs":                            "sentrycs.com",
  "Destinus":                            "destinus.ch",
  "Daedalean":                           "daedalean.ai",
  "Orolia":                              "orolia.com",
  "Ancala Partners":                     "ancalapartners.com",
  "Avincis":                             "avincis.com",
  "S21sec":                              "s21sec.com",
  "Roboteam":                            "robo-team.com",
  "Paragon Solutions":                   "paragonsolutions.io",
  // ── European Defense Startups (2025 funding cohort) ──────────────────────────
  "TEKEVER":                             "tekever.com",
  "Roark Aerospace":                     "roarkaerospace.com",
  "Quantum Systems":                     "quantum-systems.com",
  "ICEYE":                               "iceye.com",
  "Stark":                               "stark.defense",
  "Isembard":                            "isembard.com",
  "UFORCE":                              "uforce.com",
  "Knogin":                              "knogin.com",
  "ARX Robotics":                        "arx-robotics.com",
  "Onodrim Industries":                  "onodrimindustries.com",
  "Cailabs":                             "cailabs.com",
  "Frankenburg Tech":                    "frankenburg.tech",
  "Tytan Technologies":                  "tytantechnologies.com",
  "Optics11":                            "optics11.com",
  "Hypersonica":                         "hypersonica.com",
  "Twentyfour Industries":               "twentyfourindustries.com",
  "Alpine Eagle":                        "alpineeagle.aero",
  "Ammunity":                            "ammunity.com",
  "EGIDE":                               "egide-group.com",
  "Belss":                               "belss.com",
  "Orbotix":                             "orbotix.io",
  "Harmattan AI":                        "harmattan.ai",
  // ── European VCs & deep-tech investors ───────────────────────────────────────
  "Prima Materia":                       "primamateria.com",
  "Lightspeed":                          "lsvp.com",
  "Ventura Capital":                     "ventura.capital",
  "Baillie Gifford":                     "bailliegifford.com",
  "Lakestar":                            "lakestar.com",
  "Index":                               "indexventures.com",
  "Index Ventures":                      "indexventures.com",
  "Balderton":                           "balderton.com",
  "Balderton Capital":                   "balderton.com",
  "HV Capital":                          "hvcapital.com",
  "Bpifrance":                           "bpifrance.fr",
  "A.P. Møller":                         "apmollerholding.com",
  "Sequoia":                             "sequoiacap.com",
  "Thiel Capital":                       "thielcapital.com",
  "Plug and Play":                       "plugandplaytechcenter.com",
  "OneRagtime":                          "oneragtime.com",
  "NATO Innovation Fund":                "natoinnovationfund.nato.int",
  "Hadean Ventures":                     "hadeanventures.com",
  "Plural":                              "plural.vc",
  "Atlantic Bridge":                     "abven.com",
  "Keen Venture Partners":               "keen.vc",
  "Speedinvest":                         "speedinvest.com",
  "PMV":                                 "pmv.eu",
  "Invest-NL":                           "invest-nl.nl",
  "Aismia":                              "aismia.com",
  "UVC Partners":                        "uvcpartners.com",
  "IQ Capital":                          "iqcapital.vc",
  "EFFEN Capital":                       "effencapital.com",
  "Tesi Ventures":                       "tesi.fi",
  "CDF Ventures":                        "cdfventures.com",
  "Early Game Ventures":                 "earlygame.vc",
  // ── European JV Programs (2024-2026) ────────────────────────────────────────
  "Auterion":                            "auterion.com",
  "Airlogix":                            "airlogix.com",
  "WIY Drones":                          "wiydrones.com",
  "Culver Aerospace":                    "culveraerospace.com",
  "THYRA":                               "thyra.ai",
  "TAF Industries":                      "tafindustries.fi",
  "Summa Defence":                       "summadefence.com",
  "New Paakkola Oy":                     "paakkola.fi",
  "Skyeton":                             "skyeton.com",
  "Wingcopter":                          "wingcopter.com",
  "Space42":                             "space42.ai",
  "AIRO":                                "airo.at",
  "Griselda":                            "griselda.fi",
  "Frontline Robotics":                  "frontlinerobotics.com",
  "Prevail Partners":                    "prevailpartners.co.uk",
  "PGZ":                                 "pgzsa.pl",
  "Bullet":                              "bullet.fi",
  "Remtecnology":                        "remtecnology.com",
  // ── Missing single companies ─────────────────────────────────────────────────
  "Arquus":                              "arquus-defense.com",
  "Atlas Elektronik":                    "atlas-elektronik.com",
  "Austal":                              "austal.com",
  "Bharat Forge":                        "bharatforge.com",
  "Blackstone":                          "blackstone.com",
  "BlueBear Systems Research":           "blue-bear.com",
  "Bohemia Interactive Simulations":     "bisimulations.com",
  "CACI International":                  "caci.com",
  "CSRA":                                "csra.com",
  "Cobham Advanced Electronic Systems":  "cobham.com",
  "Cobham PLC":                          "cobham.com",
  "Daewoo Shipbuilding & Marine Engineering": "dsme.co.kr",
  "Engility Holdings":                   "engility.com",
  "Engility":                            "engility.com",
  "Esterline Technologies":              "esterline.com",
  "Gemalto":                             "gemalto.com",
  "Halfaker and Associates":             "halfaker.com",
  "Hanwha Aerospace":                    "hanwha.com",
  "Hanwha Group":                        "hanwha.com",
  "Heron Systems":                       "heronsystems.com",
  "John Cockerill Defense":              "john-cockerill.com",
  "John Cockerill":                      "john-cockerill.com",
  "Kinetic Group":                       "vistaoutdoor.com",
  "Naviris":                             "naviris.eu",
  "Nexter":                              "nexter-group.fr",
  "KMW":                                 "kmweg.com",
  "Orbital ATK":                         "northropgrumman.com",
  "Physical Optics Corporation":         "poc.com",
  "RADMOR":                              "radmor.com.pl",
  "RBSL":                                "rbsl.co.uk",
  "Renk":                                "renk-group.com",
  "Rocketdyne":                          "aerojetrocketdyne.com",
  "Telerob":                             "telerob.com",
  "Telerob GmbH":                        "telerob.com",
  "ThyssenKrupp Marine Systems":         "thyssenkrupp-marinesystems.com",
  "Advent International":                "adventinternational.com",
  "AAM Defence":                         "aam-defence.fr",
  "Raytheon Cybersecurity Services":     "rtx.com",
  "American Rheinmetall Vehicles":       "rheinmetall.com",
  "NVL":                                 "nvl-group.de",
  "Kraken Technology":                   "krakenrobotics.com",
  "Nord Drone Group":                    "norddrone.no",
  "HDAT":                                "heidelberger-druckmaschinen.com",
  "S21sec":                              "s21sec.com",
  "Excellium":                           "excellium-services.com",
  "Vista Outdoor":                       "vistaoutdoor.com",
  // ── New 2025-2026 acquirers ─────────────────────────────────────────────────
  "Teledyne FLIR":                        "teledyne.com",
  "MBDA Holdings":                        "mbda-systems.com",
  "Redwire":                              "redwirespace.com",
  "Warburg Pincus":                       "warburgpincus.com",
  "Berkshire Partners":                   "berkshirepartners.com",
  "Frontgrade Technologies":              "frontgrade.com",
  "T2S Solutions":                        "t2ssolutions.com",
  "De Havilland Canada":                  "dehavilland.ca",
  "Repkon USA":                           "repkon.com.tr",
  "Repkon":                               "repkon.com.tr",
  "Tinicum":                              "tinicuminc.com",
  "Karman Space and Defence":             "karman.com",
  "Karman":                               "karman.com",
  "Lockmasters":                          "lockmasters.com",
  "Cicor Group":                          "cicor.com",
  "Cicor":                                "cicor.com",
  "J.F. Taylor":                          "jftaylorinc.com",
  "Safran Aircraft Engines":              "safran-group.com",
  "Safran Defense and Space":             "safran-group.com",
  "VSE Corporation":                      "vsecorp.com",
  "RBC Bearings":                         "rbcbearings.com",
  "Motorola Solutions":                   "motorolasolutions.com",
  "Fjord Defence Group":                  "fjorddefencegroup.com",
  "Diehl Stiftung":                       "diehl.com",
  "Diehl":                                "diehl.com",
  "Crane Company":                        "craneco.com",
  "Crane":                                "craneco.com",
  "Moog":                                 "moog.com",
  "Scanfil":                              "scanfil.com",
  "Wakeb":                                "wakeb.tech",
  "Scandinavian Astor Group":             "astor-group.no",
  "Cogenuity":                            "cogenuity.com",
  "AEVEX Aerospace":                      "aevex.com",
  "IonQ":                                 "ionq.com",
  "Firefly Aerospace":                    "fireflyspace.com",
  "NFM Holding":                          "nfm.no",
  "NFM":                                  "nfm.no",
  "Theon International":                  "theon.com",
  "Intuitive Machines":                   "intuitivemachines.com",
  "Palladyne AI":                         "palladyne.ai",
  "Flowing River Capital Partners":       "flowingrivercapital.com",
  "Terma":                                "terma.com",
  "Howmet Aerospace":                     "howmet.com",
  "Howmet":                               "howmet.com",
  "Quantum-Systems":                      "quantum-systems.com",
  // ── New 2025-2026 targets ───────────────────────────────────────────────────
  "Excelitas":                            "excelitas.com",
  "Excelitas Defence Electronics":        "excelitas.com",
  "ROXEL":                                "roxelgroup.com",
  "Edge Autonomy":                        "edgeautonomy.io",
  "Triumph Group":                        "triumphgroup.com",
  "AirRobot":                             "airrobot.de",
  "Crescend Technologies":                "crescend.com",
  "Crescend Technologies Defence Division": "crescend.com",
  "Blue Marble Communications":           "bluemarble.com",
  "Aerialtronics":                        "aerialtronics.com",
  "Fleet Canada":                         "fleetcanada.com",
  "General Dynamics Ordnance Garland Operations": "gd.com",
  "Leggett and Platt Aerospace Products Group": "leggett.com",
  "Leggett":                              "leggett.com",
  "Metal Technologies":                   "metaltechnologies.com",
  "Signals Defense":                      "signalsdefense.com",
  "MADES":                                "mades.es",
  "Bugeye Technologies":                  "bugeye-tech.com",
  "Stascheit Kampfmittelraeumung":        "stascheit.de",
  "Stascheit":                            "stascheit.de",
  "Boeing Digital Aviation Solutions":    "boeing.com",
  "Aero Sud Ouest":                       "aero-sud-ouest.fr",
  "Turbine Weld Industries":              "turbineweld.com",
  "BlueHalo":                             "bluehalo.com",
  "VACCO Industries":                     "vacco.com",
  "Silvus Technologies":                  "silvustechnologies.com",
  "Fjord Defence":                        "fjorddefencegroup.com",
  "e.sigma systems":                      "esigma.de",
  "Grob Aircraft":                        "grob-aircraft.com",
  "Baker Hughes PSI Product Line":        "bakerhughes.com",
  "Baker Hughes PSI":                     "bakerhughes.com",
  "Baker Hughes":                         "bakerhughes.com",
  "Simmonds Precision Products":          "simmondsprecision.com",
  "Chesapeake Technology International":  "chesapeaketechnology.com",
  "COTSWORKS":                            "cotsworks.com",
  "MB Elettronica":                       "mbelettronica.com",
  "Resilient Power Systems":              "rpsi.com",
  "Collins Aerospace Flight Control Business": "collinsaerospace.com",
  "Iveco Defence Vehicles and ASTRA":     "ivecodefence.com",
  "Woot Tech Aerospace":                  "woottech.com",
  "Nordic Shield Group":                  "nordicshieldgroup.com",
  "Naval Vessels Lurssen":                "lurssen.com",
  "Naval Vessels Lürssen":               "lurssen.com",
  "Saab TransponderTech":                 "saabgroup.com",
  "Interconnect Solutions Company":       "iscco.com",
  "Attollo Engineering":                  "attollo.com",
  "RapidFlight":                          "rapidflight.com",
  "Vector Atomic":                        "vectoratomic.com",
  "SciTec":                               "scitec.com",
  "Paul Boye Technologies":               "paul-boye.com",
  "Paul Boyé Technologies":              "paul-boye.com",
  "Exosens":                              "exosens.com",
  "Lanteris Space Systems":               "lanteris.com",
  "GuideTech":                            "guidetech.com",
  "Marshall Land Systems":                "marshalllandsystems.com",
  "Operational Solutions":                "operationalsolutions.co.uk",
  "SilverEdge Government Solutions":      "silveredge.us",
  "Consolidated Aerospace Manufacturing": "camdistributors.com",
  "Stellant Systems":                     "stellant.com",
  "Seemann Composites and MSC":           "seemanncomposites.com",
  "Seemann Composites":                   "seemanncomposites.com",
  "Orbit Technologies":                   "orbit-cs.com",
  "ARKA Group":                           "arka.org",
  "Aechelon Technology":                  "aechelon.com",
  "ExoAnalytic Solutions":                "exoanalytic.com",
  "Empirical Systems Aerospace":          "esaero.com",
  // ── 2025-2026 additional acquirers ───────────────────────────────────────────
  "FCDE":                                 "fcde.fr",
  "D-Wave Quantum":                       "dwavequantum.com",
  "Electro Optic Systems":                "eos-aus.com",
  "Bridgepoint":                          "bridgepoint.eu",
  "Kongsberg Defence":                    "kongsberg.com",
  "Indra":                                "indracompany.com",
  "Ondas":                                "ondas.com",
  "Ondas Holdings":                       "ondas.com",
  "Amphenol":                             "amphenol.com",
  "Gleason":                              "gleason.com",
  "Novaria Group":                        "novariagroup.com",
  "PrecisionX Group":                     "precisionxgroup.com",
  "ELTA North America":                   "eltanorthamerica.com",
  "Mercury Systems":                      "mrcy.com",
  "Piasecki Aircraft":                    "piasecki.com",
  "AMETEK":                               "ametek.com",
  "Gooch and Housego":                    "goochandhousego.com",
  "Gooch & Housego":                      "goochandhousego.com",
  "Thales":                               "thalesgroup.com",
  // ── 2025-2026 additional targets ────────────────────────────────────────────
  "Hemeria":                              "hemeria.com",
  "Quantum Circuits":                     "quantumcircuits.com",
  "MARSS":                                "marss.com",
  "Altamira Technologies":                "altamiratechnologies.com",
  "Comrod":                               "comrod.com",
  "Zone 5 Technologies":                  "zone5tech.com",
  "WAKE Engineering UAS Portfolio":       "wake-eng.com",
  "Sentrycs":                             "sentrycs.com",
  "Kappa Optronics":                      "kappa-optronics.com",
  "Coherent Aerospace and Defence Business": "coherent.com",
  "Coherent":                             "coherent.com",
  "Trexon":                               "trexon.com",
  "Apeiro":                               "apeiro-motion.com",
  "Intra":                                "intra.co.uk",
  "Tube Methods and Tech Tube":           "tubemethods.com",
  "Precision Aerospace Corporation":      "precisionaerospace.com",
  "Hudson Technologies":                  "hudsontech.com",
  "ADCO Circuits":                        "adcocircuits.com",
  "Chemring Explosive Hazard Detection Business": "chemring.co.uk",
  "Sonatech":                             "sonatech.com",
  "Star Lab":                             "starlabsecurity.com",
  "Kaman KARGO UAV Programme":            "kaman.com",
  "Kaman":                                "kaman.com",
  "Klas":                                 "klastelecom.com",
  "FARO Technologies":                    "faro.com",
  "Global Photonics":                     "globalphotonics.com",
  "Cobham Aerospace Communications":      "cobham.com",
  "ESG Elektroniksystem und Logistik":    "esg.de",
  // ── 2026 Q1-Q2 new entries ──────────────────────────────────────────────────
  "D-Fend Solutions":                    "d-fendsolutions.com",
  "CIRCOR":                              "circor.com",
  "CIRCOR Commercial and Defense Aerospace business": "circor.com",
  "PMGC Holdings":                       "pmgcholdings.com",
  "A&B Aerospace":                       "abaerospace.com",
  "Meloche Group":                       "melocheinc.com",
  "Groupe Rossi Aéro":                   "rossiaero.com",
  "Precinmac":                           "precinmac.com",
  "Precision Aerospace Holdings":        "precisionaerospaceholdings.com",
  "Godspeed Capital":                    "godspeedcapital.com",
  "GALT Aerospace":                      "galt.aero",
  "Sensofusion":                         "sensofusion.com",
  "Atol Aviation":                       "atolaviation.com",
  "Southwest Antennas":                  "southwestantennas.com",
  "BiomX":                               "biomx.com",
  "DFSL":                                "dfsl.co.il",
  "Windjammer Capital":                  "windjammercapital.com",
  "PrecisionX Group":                    "precisionxgroup.com",
  "Talica":                              "talica.com",
  "AeroDynamics Metal Finishing":        "aerodynamicsmetalfinishing.com",
  "Solestra Group":                      "solestragroup.com",
  "Aerofab":                             "aerofab-corp.com",
  "Aeromax Industries":                  "aeromax.com",
  "The Ely Company":                     "elyco.com",
  "DCS Corporation":                     "dcscorp.com",
  "ARCTOS Technology Solutions":         "arctos-us.com",
  "Trident Systems":                     "tridsys.com",
  "Ibeos":                               "ibeos.com",
};

// Initials avatar colour palette (deterministic by name)
const AVATAR_COLORS = [
  "bg-slate-700", "bg-slate-600", "bg-blue-900",
  "bg-zinc-600",  "bg-slate-800", "bg-indigo-800",
];
function avatarColor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// ── Country flag (flagcdn.com image, more reliable than emoji) ────────────
function FlagImg({ iso2, className = "" }) {
  if (!iso2 || iso2.length !== 2) return null;
  return (
    <img
      src={`https://flagcdn.com/w20/${iso2.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${iso2.toLowerCase()}.png 2x`}
      alt={iso2}
      className={`object-cover rounded-[2px] shadow-sm border border-white/60 ${className}`}
      style={{ width: 16, height: 11 }}
    />
  );
}

// EU member states (ISO 3166-1 alpha-2)
const EU_MEMBERS = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU",
  "IE","IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
]);

// Programme structures (no legal entity, no logo)
const PROGRAMME_ENTITIES = new Set([
  "SCAF/FCAS Programme",
  "MGCS Programme Alliance",
  "Eurodrone Programme JV",
]);

// JV from partners in DIFFERENT EU countries → the entity is a European JV → EU flag.
// Same-country JVs (e.g. Airbus FR + Safran FR → ArianeGroup FR) stay with their country.
function resolveTargetCountry(activity) {
  if (
    activity.deal_type === "joint_venture" &&
    activity.acquirer?.includes("+") &&
    activity.acquirer_country &&
    activity.target_country &&
    activity.acquirer_country !== activity.target_country &&
    EU_MEMBERS.has(activity.acquirer_country) &&
    EU_MEMBERS.has(activity.target_country)
  ) {
    return "EU";
  }
  return activity.target_country;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getStatusStyle(status) {
  switch (status) {
    case "completed":
    case "active":       return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
    case "under_review": return "bg-amber-50 text-amber-700 border-amber-200";
    case "announced":    return "bg-blue-50 text-blue-700 border-blue-200";
    case "cancelled":    return "bg-rose-50 text-rose-700 border-rose-200";
    default:             return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

function formatStatus(s) {
  const map = { under_review: "Under Review", joint_venture: "Joint Venture" };
  return map[s] ?? (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
}

function formatValue(dealValue, isDisclosed = true) {
  if (!isDisclosed) return "Undisclosed";
  if (!dealValue || dealValue === 0) return "—";
  return dealValue >= 1000 ? `$${(dealValue / 1000).toFixed(1)}B` : `$${dealValue}M`;
}

// Filter out scraper artifacts: sentence fragments captured instead of company names
const GARBAGE_NAME_RE = /\binitially\b|\breportedly\b|\bconfirmed\b|\bannounced\b|^the\s+\w+-|^over\s+\d|^up to\s+\d|^approximately\s+\d/i;
function isValidCompanyName(name) {
  if (!name) return false;
  if (name.length > 80) return false;
  return !GARBAGE_NAME_RE.test(name);
}

function getStatusAccentBg(status) {
  switch (status) {
    case "completed": case "active":       return "bg-emerald-500";
    case "pending":   case "under_review": return "bg-amber-400";
    case "announced":                      return "bg-blue-500";
    case "cancelled":                      return "bg-rose-500";
    case "dissolved": case "exited":       return "bg-slate-400";
    default:                               return "bg-slate-400";
  }
}
function getStatusBorderL(status) {
  switch (status) {
    case "completed": case "active":       return "border-l-emerald-500";
    case "pending":   case "under_review": return "border-l-amber-400";
    case "announced":                      return "border-l-blue-500";
    case "cancelled":                      return "border-l-rose-500";
    case "dissolved": case "exited":       return "border-l-slate-400";
    default:                               return "border-l-slate-400";
  }
}

// ── C7 — Confidence & value-basis surfacing ─────────────────────────────────
// Makes data quality legible: an auto-extracted, single-source, low-confidence
// deal must never look as trustworthy as a human-verified one.
const CONFIDENCE_STYLE = {
  high:   { dot: "bg-emerald-500", text: "text-emerald-700", label: "High" },
  medium: { dot: "bg-amber-400",   text: "text-amber-700",   label: "Medium" },
  low:    { dot: "bg-slate-400",   text: "text-slate-500",   label: "Low" },
};
function ConfidenceBadge({ activity }) {
  const level = activity?.confidence || (activity?.verification_status === "human_verified" ? "high" : null);
  if (!level || !CONFIDENCE_STYLE[level]) return null;
  const cfg = CONFIDENCE_STYLE[level];
  const verified = activity?.verification_status === "human_verified";
  const title = `Confidence: ${cfg.label}${verified ? " · human-verified" : " · auto-extracted"}`
    + (activity?.confidence_score != null ? ` (${activity.confidence_score})` : "");
  return (
    <span title={title}
      className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white border border-slate-200 ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
// Human-readable label for value_basis (C1) — tells the reader HOW to read a number.
const VALUE_BASIS_LABEL = {
  equity:       "equity value",
  enterprise:   "enterprise value",
  round_amount: "amount raised",
  undisclosed:  "undisclosed",
};

function getDealSizeBadge(value) {
  if (!value || value === 0) return null;
  if (value >= 5000)  return { label: "Mega deal",  cls: "bg-slate-100 text-slate-700 border-slate-300" };
  if (value >= 1000)  return { label: "Large deal",  cls: "bg-slate-100 text-slate-600 border-slate-200" };
  if (value >= 100)   return { label: "Mid-size",    cls: "bg-slate-100 text-slate-500 border-slate-200" };
  return null;
}

function getDealLabels(dealType) {
  switch (dealType) {
    case "merger":               return { left: "PARTY A",    right: "PARTY B",       sep: "merger" };
    case "joint_venture":        return { left: "CO-FOUNDER", right: "JV ENTITY",     sep: "jv" };
    case "minority_stake":       return { left: "INVESTOR",   right: "PORTFOLIO CO.", sep: "invest" };
    case "strategic_investment": return { left: "INVESTOR",   right: "PORTFOLIO CO.", sep: "invest" };
    case "funding_round":        return { left: "LEAD INVESTOR", right: "STARTUP",    sep: "invest" };
    default:                     return { left: "ACQUIRER",   right: "TARGET",        sep: "arrow" };
  }
}

function DealSep({ type }) {
  const base = "w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 border border-slate-200";
  if (type === "merger")  return <div className="w-12 flex justify-center shrink-0"><div className={base}><ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" /></div></div>;
  if (type === "jv")      return <div className="w-12 flex justify-center shrink-0"><div className={base}><Plus className="w-3.5 h-3.5 text-slate-500" /></div></div>;
  if (type === "invest")  return <div className="w-12 flex justify-center shrink-0"><div className={base}><CircleDot className="w-3.5 h-3.5 text-slate-500" /></div></div>;
  return <div className="w-12 flex justify-center shrink-0"><div className={base}><ArrowRight className="w-3.5 h-3.5 text-slate-500" /></div></div>;
}

function RoundBadge({ roundType }) {
  const valid = new Set(["seed","series_a","series_b","series_c","series_d","series_e","series_f","growth","buyout"]);
  if (!valid.has(roundType)) return null;
  const label = roundType.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase());
  return <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-200">{label}</span>;
}

// Corporate suffixes to strip when doing fuzzy name matching
const CORP_SUFFIX_RE = /\s+(se|ag|gmbh|kg|nv|bv|sa|sas|plc|ltd|llc|inc|corp|co\.|group|international|industries|technologies|systems|solutions|defense|defence|aerospace|aviation|naval|digital|ventures|federal|division|holding|holdings)\b.*/gi;

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, "") // strip parenthetical descriptions e.g. "RBSL (Rheinmetall BAE Systems Land)"
    .replace(CORP_SUFFIX_RE, "")
    .trim();
}

function getLogoDomain(activity, side) {
  const domainField = side === "acquirer" ? "acquirer_logo_domain" : "target_logo_domain";
  const nameField   = side === "acquirer" ? "acquirer" : "target";
  const name = activity[nameField] ?? "";

  // Programme structures have no company logo — always use initials
  if (PROGRAMME_ENTITIES.has(name)) return null;

  // 1. Explicit domain from DB
  if (activity[domainField]) return activity[domainField];

  // 2. Exact name match in LOGO_FALLBACK
  if (LOGO_FALLBACK[name]) return LOGO_FALLBACK[name];

  // 3. Fuzzy match: strip corporate suffixes, then compare
  const normName = normalizeName(name);
  for (const [key, domain] of Object.entries(LOGO_FALLBACK)) {
    if (normalizeName(key) === normName) return domain;
  }

  // 4. Partial match: LOGO_FALLBACK key is a prefix of the company name (e.g. "Airbus" in "Airbus Defence")
  for (const [key, domain] of Object.entries(LOGO_FALLBACK)) {
    const normKey = normalizeName(key);
    if (normKey.length >= 4 && normName.startsWith(normKey)) return domain;
  }

  return null;
}

// ── Logo source chain — live favicon providers, then coloured initials ──
// Clearbit shut down end-2025 and now serves a grey placeholder image at HTTP 200
// that never triggers onError. Left in the chain it stuck on every unknown domain
// and produced the "grey globe" — so it has been removed entirely. Both remaining
// providers return a clean HTTP 404 for domains that don't resolve, so onError
// fires and we fall through to the coloured initials avatar:
//   1. Google Favicon V2 (sz=128)  — real favicon, reliable, clean 404
//   2. DuckDuckGo icons (ip3)       — independent real-logo source
//   3. Coloured initials            — deterministic last resort, no network
function buildLogoUrls(domain) {
  if (!domain) return [];
  return [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ];
}

// Full ordered logo source list for a company: a curated direct logo URL
// (Wikipedia Commons / verified image, shared with the Private Players page via
// companyLogos.js) takes priority, then the domain favicon chain, then initials.
function logoUrlsFor(name, domain) {
  const curated = name ? getLogoUrl(name) : null;
  return curated ? [curated, ...buildLogoUrls(domain)] : buildLogoUrls(domain);
}

function CompanyLogo({ activity, side, size = "md" }) {
  const name   = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const domain = getLogoDomain(activity, side);
  const urls   = logoUrlsFor(name, domain);
  const [idx, setIdx] = useState(0);
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-12 h-12";
  const textSize  = size === "sm" ? "text-[9px]" : "text-[11px]";

  useEffect(() => { setIdx(0); }, [domain, name]);

  if (idx < urls.length) {
    return (
      <div className="relative shrink-0">
        <div className={`${sizeClass} rounded-xl bg-white border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center`}>
          <img
            src={urls[idx]}
            alt={name}
            className="w-full h-full object-contain p-1"
            onError={() => setIdx(i => i + 1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative shrink-0">
      <div className={`${sizeClass} rounded-xl overflow-hidden flex items-center justify-center border border-slate-200/60 ${avatarColor(name)}`}>
        <span className={`${textSize} font-bold text-white tracking-tight select-none`}>
          {initials(name)}
        </span>
      </div>
    </div>
  );
}

// ── Recent Deals Spotlight — same visual pattern as MarketCatalysts ───────────

const DEAL_TYPE_CFG = {
  acquisition:          { label: "ACQUISITION",  bg: "bg-indigo-50",  text: "text-indigo-800", bar: "bg-indigo-700" },
  merger:               { label: "MERGER",        bg: "bg-indigo-50",  text: "text-indigo-800", bar: "bg-indigo-700" },
  joint_venture:        { label: "JV",            bg: "bg-emerald-50", text: "text-emerald-700",bar: "bg-emerald-600" },
  minority_stake:       { label: "INVESTMENT",    bg: "bg-blue-50",    text: "text-blue-800",   bar: "bg-blue-800" },
  strategic_investment: { label: "INVESTMENT",    bg: "bg-blue-50",    text: "text-blue-800",   bar: "bg-blue-800" },
  funding_round:        { label: "FUNDING",       bg: "bg-violet-50",  text: "text-violet-700", bar: "bg-violet-600" },
};

// PE / financial firms — acquirer is a fund, not an operating defense company
const PE_FUND_KEYWORDS = [
  "capital","fund","equity","ventures","venture","partners","investments",
  "holdings","group","advisors","asset","management","financial",
  "kkr","carlyle","warburg","bain","advent","blackstone","bridgepoint",
  "apollo","ardian","eurazeo","sofinnova","bpifrance","novacap",
  "lux capital","general catalyst","andreessen","founders fund","sequoia",
  "3i","ancala","cdf","effen","early game","fjord","flowing river",
  "godspeed","windjammer","hadean","iq capital","keen","uvc","ventura",
  "pmv","rtx ventures","aismia","balderton","hv capital",
];
function isFundAcquirer(name = "") {
  const n = name.toLowerCase();
  return PE_FUND_KEYWORDS.some(k => n.includes(k));
}

// ── Non-M&A guard ─────────────────────────────────────────────────────────────
// A real M&A deal is one COMPANY acquiring another COMPANY. A sovereign state
// buying equipment (e.g. "Italy buys six Airbus-made A330 MRTT tankers") is
// procurement, NOT M&A — those entries must never appear in the table or spotlight.
const STATE_BUYERS = new Set([
  "united states","usa","u.s.","u.s","america","uk","united kingdom","britain",
  "italy","france","germany","spain","poland","netherlands","belgium","sweden",
  "norway","finland","denmark","greece","turkey","türkiye","india","japan",
  "south korea","korea","north korea","australia","canada","israel","saudi arabia",
  "uae","qatar","egypt","brazil","ukraine","russia","china","taiwan","nato",
  "european union","eu","pentagon","switzerland","austria","portugal","romania",
  "czech republic","czechia","hungary","slovakia","croatia","indonesia","philippines",
]);
const GOV_BUYER_RE = /\b(ministry of defen[cs]e|department of defen[cs]e|\bdod\b|\bmod\b|armed forces|air force|\bnavy\b|\barmy\b|government|military)\b/i;
// A target that reads like a QUANTITY of military hardware (e.g. "six A330 MRTT
// tankers", "12 F-35 jets") is a procurement order, not a company being bought.
const PROCUREMENT_RE = /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten|dozens?|fleet|squadron)\b.*\b(tankers?|fighters?|jets?|aircraft|helicopters?|drones?|uavs?|missiles?|frigates?|destroyers?|submarines?|corvettes?|warships?|vehicles?|tanks?|howitzers?|radars?|satellites?|units?)\b/i;
// Geopolitical / policy-initiative phrases that are NOT companies — scraper noise
// like "NATO's eastern flank", "Eastern Flank Watch" or "European Sky Shield".
// These read like a deal party but no legal entity exists, so they must never
// appear as an acquirer or target in any table or the spotlight.
const NON_CORPORATE_RE = /\b(eastern flank|flank watch|eastern sentry|sky shield)\b/i;

function isStateOrProcurement(activity) {
  const acq = (activity?.acquirer || "").trim().toLowerCase().replace(/^the\s+/, "");
  if (STATE_BUYERS.has(acq)) return true;
  if (GOV_BUYER_RE.test(activity?.acquirer || "")) return true;
  if (PROCUREMENT_RE.test(activity?.target || "")) return true;
  if (NON_CORPORATE_RE.test(activity?.acquirer || "") ||
      NON_CORPORATE_RE.test(activity?.target || "")) return true;
  return false;
}

function dealRelativeTime(isoStr) {
  if (!isoStr) return "recent";
  const diff = Date.now() - new Date(isoStr).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 24) return h < 1 ? "< 1h ago" : `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

function SpotlightLogo({ activity, side }) {
  const name   = activity[side] ?? "";
  const domain = getLogoDomain(activity, side);
  const urls   = logoUrlsFor(name, domain);
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [domain, name]);

  if (idx < urls.length) {
    return (
      <img
        src={urls[idx]}
        alt={name}
        className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-100 p-0.5 shrink-0"
        onError={() => setIdx(i => i + 1)}
      />
    );
  }
  return (
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200/60 shrink-0 ${avatarColor(name)}`}>
      <span className="text-[9px] font-bold text-white tracking-tight">{initials(name)}</span>
    </div>
  );
}

const SPOTLIGHT_TABS = [
  { value: "all",     label: "All deals" },
  { value: "defense", label: "Defense → Defense" },
  { value: "fund",    label: "Fund → Defense" },
];

function RecentDealsSpotlight({ activities, sourceFilter, onSourceFilter, sourceCounts }) {
  const spots = useMemo(() => {
    // Spotlight shows company-level deals: acquisitions, mergers and joint
    // ventures (trade-show announcements like ILA Berlin & Eurosatory are mostly
    // JVs). "Featured" deals are hand-picked as the most notable and always come
    // first; the rest fall back to most-recent-first. This guarantees a balanced
    // mix (e.g. ILA Berlin + Eurosatory) instead of just the latest-dated ones.
    // The Defense/Fund toggle below filters the TABLE, not these cards ("news").
    return [...activities]
      .filter(a => ["acquisition", "merger", "joint_venture"].includes(a.deal_type))
      .sort((a, b) =>
        (Number(Boolean(b.featured)) - Number(Boolean(a.featured))) ||
        (new Date(b.announced_date) - new Date(a.announced_date))
      )
      .slice(0, 4);
  }, [activities]);

  if (!activities.length) return null;

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Zap className="w-4 h-4 text-indigo-700" />
          <span className="font-heading text-base font-semibold text-slate-900">Recent Deals Spotlight</span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            latest acquisitions
          </span>
        </div>
        {/* Toggle filter — drives the deals TABLE below, not the spotlight cards */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 hidden sm:inline">Filter table ↓</span>
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            {SPOTLIGHT_TABS.map(t => (
              <button
                key={t.value}
                onClick={() => onSourceFilter(t.value)}
                className={`px-3 py-1 text-[11px] font-medium rounded-md transition-all whitespace-nowrap ${
                  sourceFilter === t.value
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
                <span className={`ml-1 font-mono text-[10px] ${sourceFilter === t.value ? "text-indigo-700" : "text-slate-400"}`}>
                  {sourceCounts?.[t.value] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <CardContent className="pt-4">
        {spots.length === 0 ? (
          <p className="text-center py-8 text-sm text-slate-400">No deals in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {spots.map((deal, i) => {
              const cfg = DEAL_TYPE_CFG[deal.deal_type] ?? DEAL_TYPE_CFG.acquisition;
              const isFund = isFundAcquirer(deal.acquirer);
              const acqFlag = deal.acquirer_country
                ? `https://flagcdn.com/w20/${deal.acquirer_country.toLowerCase()}.png` : null;
              const tgtFlag = deal.target_country
                ? `https://flagcdn.com/w20/${deal.target_country.toLowerCase()}.png` : null;
              const value = deal.deal_value > 0 && deal.is_disclosed !== false
                ? (deal.deal_value >= 1000
                    ? `$${(deal.deal_value / 1000).toFixed(1)}B`
                    : `$${deal.deal_value}M`)
                : "N/D";

              return (
                <div
                  key={deal.id ?? i}
                  className="relative rounded-xl border border-slate-100 overflow-hidden hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
                  onClick={() => deal.source_url && window.open(deal.source_url, "_blank", "noopener")}
                >
                  {/* Colour bar */}
                  <div className={`h-1 w-full ${cfg.bar}`} />

                  <div className="p-4">
                    {/* Badges row */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className={`text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full ${cfg.bg} ${cfg.text}`}>
                        {cfg.label}
                      </span>
                      {isFund ? (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                          FUND
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                          DEFENSE
                        </span>
                      )}
                      <ConfidenceBadge activity={deal} />
                    </div>

                    {/* Acquirer → Target row */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <SpotlightLogo activity={deal} side="acquirer" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-700 truncate leading-tight">{deal.acquirer}</p>
                          {acqFlag && (
                            <img src={acqFlag} alt={deal.acquirer_country}
                              className="w-4 h-3 object-cover rounded-sm mt-0.5"
                              onError={e => e.currentTarget.style.display="none"} />
                          )}
                        </div>
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <SpotlightLogo activity={deal} side="target" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-700 truncate leading-tight">{deal.target}</p>
                          {tgtFlag && (
                            <img src={tgtFlag} alt={deal.target_country}
                              className="w-4 h-3 object-cover rounded-sm mt-0.5"
                              onError={e => e.currentTarget.style.display="none"} />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="text-sm font-medium text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-800 transition-colors">
                      {deal.description ?? `${deal.acquirer} acquires ${deal.target}`}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between mt-2.5">
                      <span className="font-mono text-[11px] font-bold text-slate-700"
                        title={deal.value_basis ? VALUE_BASIS_LABEL[deal.value_basis] : undefined}>
                        {value}
                        {deal.value_basis && deal.value_basis !== "undisclosed" && (
                          <span className="ml-1 font-sans font-normal text-[9px] text-slate-400">
                            {VALUE_BASIS_LABEL[deal.value_basis]}
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400">{dealRelativeTime(deal.announced_date)}</span>
                    </div>

                    {deal.source_url && (
                      <p className="text-[10px] text-blue-700 mt-1.5 flex items-center gap-1 truncate group-hover:underline">
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        Source article
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Defense Tech Leaderboard ───────────────────────────────────────────────

function DefenseTechLeaderboard({ deals, onOpenProfile, onSelectDeal, players = [] }) {
  // C4 — This is a POST-MONEY valuation ranking. It must rank on `valuation`
  // only. The V1 bug used `valuation || deal_value`, which let an acquisition
  // PRICE (a different, non-comparable metric) stand in for a startup's
  // post-money valuation. We therefore consider only deals that actually carry
  // a valuation (VC rounds), and never fall back to deal_value.
  const valued = deals.filter((d) => (d.valuation || 0) > 0);

  // Deduplicate by target company — keep entry with highest valuation, then latest date
  const byCompany = new Map();
  for (const d of valued) {
    const prev = byCompany.get(d.target);
    if (!prev) { byCompany.set(d.target, d); continue; }
    const better = (d.valuation || 0) > (prev.valuation || 0) ||
      ((d.valuation || 0) === (prev.valuation || 0) &&
        new Date(d.announced_date) > new Date(prev.announced_date));
    if (better) byCompany.set(d.target, d);
  }

  const rows = [...byCompany.values()].sort((a, b) => {
    const va = a.valuation || 0;
    const vb = b.valuation || 0;
    return vb - va;
  });

  const fmtVal = (v) => v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`;

  if (rows.length === 0) {
    return <div className="text-center py-16 text-slate-400 text-sm">No defense tech companies indexed.</div>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-slate-600" />
          <div>
            <p className="text-sm font-bold text-slate-900">Post-Money Valuation Ranking</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{rows.length} companies · based on latest funding rounds</p>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded font-mono uppercase tracking-wider">Post-money</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400 w-8">#</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">Company</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">Latest Round</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">Amount Raised</th>
              <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-400">Valuation</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">Date</th>
              <th className="px-3 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => (
              <tr
                key={d.id || d.target}
                className={`border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}
                onClick={() => onSelectDeal?.(d)}
              >
                <td className="px-3 py-3 text-slate-400 font-mono text-[11px]">
                  {i === 0
                    ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold">1</span>
                    : i === 1
                    ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-300 text-slate-700 text-[10px] font-bold">2</span>
                    : i === 2
                    ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-500 text-[10px] font-bold">3</span>
                    : <span className="text-slate-300 text-[11px] font-mono">{i + 1}</span>}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <button onClick={() => onOpenProfile(resolvePlayerName(d.target) || d.target)} className="shrink-0">
                      <CompanyLogo activity={d} side="target" size="sm" />
                    </button>
                    <div>
                      <button
                        onClick={() => onOpenProfile(resolvePlayerName(d.target) || d.target)}
                        className="font-semibold text-slate-900 hover:text-slate-900 transition-colors text-left text-xs"
                      >
                        {d.target}
                      </button>
                      {d.target_country && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <FlagImg iso2={d.target_country} />
                          <span className="text-[9px] text-slate-400 font-mono">{d.target_country}</span>
                        </div>
                      )}
                      {(() => {
                        const player = players.find(p => p.name.toLowerCase() === d.target.toLowerCase());
                        if (!player?.specializations?.length) return null;
                        return (
                          <div className="flex flex-wrap gap-0.5 mt-1">
                            {player.specializations.slice(0, 3).map(s => (
                              <span key={s} className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded-full font-medium">{s}</span>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  {d.round_type
                    ? <RoundBadge roundType={d.round_type} />
                    : <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded capitalize">{d.deal_type.replaceAll("_", " ")}</span>
                  }
                </td>
                <td className="px-3 py-3 text-right font-mono font-semibold text-slate-900 whitespace-nowrap">
                  {formatValue(d.deal_value, d.is_disclosed ?? true)}
                </td>
                <td className="px-3 py-3 text-right">
                  {d.valuation
                    ? <span className="font-mono font-bold text-slate-900 text-sm">{fmtVal(d.valuation)}</span>
                    : <span className="text-slate-300 text-[10px]">n/d</span>
                  }
                </td>
                <td className="px-3 py-3 text-slate-500 whitespace-nowrap">
                  {format(new Date(d.announced_date), "MMM yyyy")}
                </td>
                <td className="px-3 py-3 text-center">
                  {d.source_url ? (
                    <a
                      href={d.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-700 transition-colors inline-flex"
                      title="View official press release"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────

// ── Parse multi-party acquirer strings like "Airbus + BAE Systems + Leonardo" ─
function parseParties(name) {
  if (!name) return [{ name: "", stake: null }];
  return name.split(/\s*\+\s*/).map(n => n.trim()).filter(Boolean).map(n => ({ name: n, stake: null }));
}

// Build a synthetic activity for a single named party (so CompanyLogo works)
function partyActivity(name, activity, side) {
  // Only use LOGO_FALLBACK — never inherit the parent activity's domain.
  // Inheriting causes the first party's logo to duplicate across all unlisted partners.
  const domain = LOGO_FALLBACK[name] ?? null;
  return {
    ...activity,
    acquirer: side === "acquirer" ? name : activity.acquirer,
    target:   side === "target"   ? name : activity.target,
    acquirer_logo_domain: side === "acquirer" ? domain : activity.acquirer_logo_domain,
    target_logo_domain:   side === "target"   ? domain : activity.target_logo_domain,
  };
}

function CompanyNameBtn({ name, onOpenProfile, className = "" }) {
  const canonical = resolvePlayerName(name);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onOpenProfile(canonical || name); }}
      className={`hover:text-slate-900 transition-colors text-left ${className}`}
    >
      {name}
    </button>
  );
}

function MACard({ activity, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const labels   = getDealLabels(activity.deal_type);
  const accent   = getStatusAccentBg(activity.status);
  const sizeBadge = getDealSizeBadge(activity.is_disclosed !== false ? activity.deal_value : 0);
  const daysAgo  = Math.floor((Date.now() - new Date(activity.announced_date).getTime()) / 86_400_000);

  return (
    <div
      className="relative bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
      data-testid={`ma-item-${activity.id}`}
    >
      <div className="p-5 pl-5">
        {/* ── Top: companies + meta ── */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">

          {/* Companies */}
          <div className="flex items-center gap-3 flex-1 min-w-0 flex-wrap">
            {/* Acquirer — single or multi-party */}
            {(() => {
              const parties = parseParties(activity.acquirer);
              const isMulti = parties.length > 1;
              return (
                <div className="flex flex-col gap-1 shrink-0">
                  <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{labels.left}</span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {parties.map((p, idx) => {
                      const synth = partyActivity(p.name, activity, "acquirer");
                      return (
                        <div key={idx} className="flex items-center gap-1.5">
                          {idx > 0 && <span className="text-slate-300 text-xs font-light select-none">+</span>}
                          <button onClick={(e) => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }} className="shrink-0">
                            <CompanyLogo activity={synth} side="acquirer" size={isMulti ? "sm" : "md"} />
                          </button>
                          <div>
                            <CompanyNameBtn
                              name={p.name}
                              onOpenProfile={onOpenProfile}
                              className="text-slate-900 font-semibold text-sm leading-snug"
                            />
                            {activity.stake_percentage != null && isMulti && (
                              <p className="text-[9px] text-emerald-600 font-mono font-semibold">{activity.stake_percentage}%</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            <DealSep type={labels.sep} />

            {/* Target */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button onClick={(e) => { e.stopPropagation(); onOpenProfile(resolvePlayerName(activity.target) || activity.target); }} className="shrink-0">
                <CompanyLogo activity={activity} side="target" />
              </button>
              <div className="min-w-0">
                <CompanyNameBtn
                  name={activity.target}
                  onOpenProfile={onOpenProfile}
                  className="text-slate-900 font-semibold text-sm leading-snug truncate block"
                />
                <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">{labels.right}</span>
              </div>
            </div>
          </div>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:justify-end">

            {/* Value */}
            <div className="min-w-[70px]">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">
                {["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type) ? "Amount Raised" : "Value"}
              </p>
              <p className="text-lg font-mono font-bold text-slate-900 leading-none">
                {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
              </p>
              {activity.stake_percentage != null && (
                <p className="text-[9px] text-emerald-600 font-mono font-semibold mt-0.5">{activity.stake_percentage}% stake</p>
              )}
            </div>

            {/* Date */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Date</p>
              <p className="text-xs text-slate-700 font-medium whitespace-nowrap">
                {format(new Date(activity.announced_date), "d MMM yyyy")}
              </p>
              {daysAgo >= 0 && daysAgo <= 14 && (
                <p className="text-[9px] text-slate-600 font-semibold mt-0.5">
                  {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                </p>
              )}
            </div>

            {/* Status + badges column */}
            <div className="flex flex-col items-start gap-1">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(activity.status)}`}>
                {formatStatus(activity.status)}
              </span>
              {activity.round_type && <RoundBadge roundType={activity.round_type} />}
              {sizeBadge && (
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${sizeBadge.cls}`}>
                  {sizeBadge.label}
                </span>
              )}
              {activity.regulatory_status && activity.regulatory_status !== "not_required" && (
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                  activity.regulatory_status === "cleared" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                  activity.regulatory_status === "blocked" ? "bg-rose-50 text-rose-700 border-rose-200" :
                  "bg-amber-50 text-amber-700 border-amber-200"
                }`}>
                  {activity.regulatory_status === "cleared" ? "Reg. Cleared" : activity.regulatory_status === "blocked" ? "Reg. Blocked" : "Reg. Review"}
                </span>
              )}
              {/* Sector badge */}
              {activity.sector && (
                <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full capitalize">
                  {SECTOR_OPTIONS.find(s => s.value === activity.sector)?.label ?? activity.sector.replaceAll("_", " ")}
                </span>
              )}
              {/* Market data ticker links */}
              {[activity.acquirer, activity.target].map(name => COMPANY_TICKER_MAP[name] ? (
                <Link
                  key={name}
                  to="/market-data"
                  onClick={e => e.stopPropagation()}
                  className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded hover:bg-blue-100"
                  title={`View ${name} on Market Data`}
                >
                  {COMPANY_TICKER_MAP[name]}
                </Link>
              ) : null)}
            </div>

            {/* Source + details */}
            <div className="flex flex-col items-start gap-1">
              {activity.source_url && (
                <div className="flex items-center gap-1">
                  <a
                    href={activity.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[9px] font-semibold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink className="w-2.5 h-2.5" /> Source
                  </a>
                  {!SPECIFIC_URL_RE.test(activity.source_url) && (
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-default"><AlertTriangle className="w-3 h-3 text-amber-500" /></span>
                        </TooltipTrigger>
                        <TooltipContent className="text-xs max-w-[180px]">Link may point to homepage only</TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  )}
                </div>
              )}
              {(activity.rationale || activity.description) && (
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-0.5 text-[11px] text-blue-800 hover:text-blue-900 font-semibold transition-colors mt-0.5"
                >
                  {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {open ? "Less" : "Details"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description — always visible */}
        {activity.description && (
          <p className="text-slate-500 text-[13px] mt-4 pt-3 border-t border-slate-100 leading-relaxed">
            {activity.description}
          </p>
        )}

        {/* Accordion — rationale + investment details + source link */}
        {open && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-3">
            {activity.rationale && (
              <p className="text-slate-600 text-sm leading-relaxed">{activity.rationale}</p>
            )}

            {/* Investment detail box — shown for investment/funding types */}
            {["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type) && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Investment Details</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {activity.deal_value > 0 && (activity.is_disclosed ?? true) && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Amount Raised / Invested</p>
                      <p className="text-base font-mono font-bold text-slate-900">{formatValue(activity.deal_value, true)}</p>
                    </div>
                  )}
                  {activity.stake_percentage != null && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Equity Acquired</p>
                      <p className="text-base font-mono font-bold text-slate-800">{activity.stake_percentage}%</p>
                    </div>
                  )}
                  {activity.round_type && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Funding Round</p>
                      <RoundBadge roundType={activity.round_type} />
                    </div>
                  )}
                </div>
                {activity.source_url && (
                  <a
                    href={activity.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-800 bg-white border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View official press release
                  </a>
                )}
              </div>
            )}

            {activity.regulatory_status && activity.regulatory_status !== "not_required" && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Regulatory Review</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {activity.regulatory_body && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Body</p>
                      <p className="text-xs font-medium text-slate-700">{activity.regulatory_body}</p>
                    </div>
                  )}
                  {activity.regulatory_notes && (
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Notes</p>
                      <p className="text-xs text-slate-600">{activity.regulatory_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 items-center">
              {activity.acquirer_country && (
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <FlagImg iso2={activity.acquirer_country} /> {activity.acquirer_country}
                  {" → "}
                  {activity.target_country && <><FlagImg iso2={activity.target_country} /> {activity.target_country}</>}
                </span>
              )}
              {activity.source_url && !["strategic_investment", "minority_stake", "funding_round"].includes(activity.deal_type) && (
                <a
                  href={activity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-800 hover:text-blue-900 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Read source
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Historical table row ───────────────────────────────────────────────────

function HistoricalRow({ activity, index, onOpenProfile }) {
  const [open, setOpen] = useState(false);
  const hasDetail = !!(activity.rationale || activity.source_url);
  const labels = getDealLabels(activity.deal_type);

  return (
    <>
      <tr
        className={`${index % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-slate-50 transition-colors cursor-pointer`}
        onClick={() => hasDetail && setOpen((v) => !v)}
      >
        <td className="px-4 py-3 text-sm text-slate-700 font-medium">
          {format(new Date(activity.announced_date), "MMM yyyy")}
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-mono">{labels.left}</p>
            <CompanyCell activity={activity} side="acquirer" onOpenProfile={onOpenProfile} />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] text-slate-400 font-mono">{labels.right}</p>
            <CompanyCell activity={activity} side="target" onOpenProfile={onOpenProfile} />
          </div>
        </td>
        <td className="px-4 py-3 text-sm font-mono font-semibold text-slate-900">
          <div>
            {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
            {activity.stake_percentage != null && (
              <p className="text-[10px] text-slate-400 font-mono">{activity.stake_percentage}%</p>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs capitalize bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {activity.deal_type.replaceAll("_", " ")}
            </span>
            <RoundBadge roundType={activity.round_type} />
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border w-fit ${getStatusStyle(activity.status)}`}>
              {formatStatus(activity.status)}
            </span>
            {activity.source_url && (
              <a
                href={activity.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-[10px] font-medium text-blue-800 hover:text-blue-900"
              >
                <ExternalLink className="w-2.5 h-2.5" /> Source
              </a>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-xs text-slate-500 hidden lg:table-cell max-w-xs truncate">
          {activity.description}
        </td>
        <td className="px-4 py-3 text-center">
          {hasDetail && (
            <button className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Expand">
              {open ? <ChevronUp className="w-4 h-4 mx-auto" /> : <ChevronDown className="w-4 h-4 mx-auto" />}
            </button>
          )}
        </td>
      </tr>

      {open && hasDetail && (
        <tr className="bg-slate-50">
          <td colSpan={10} className="px-6 py-4">
            {activity.rationale && (
              <p className="text-slate-600 text-sm leading-relaxed mb-2">{activity.rationale}</p>
            )}
            {activity.source_url && (
              <a
                href={activity.source_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs text-blue-800 hover:text-blue-900 font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Source article
              </a>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

// ── CSV export ─────────────────────────────────────────────────────────────

function exportCSV(data) {
  const headers = [
    "Date", "Acquirer", "Acquirer Country", "Target", "Target Country",
    "Deal Value (M USD)", "Value Basis", "Is Disclosed", "Stake %", "Class", "Type", "Round",
    "Status", "Confidence", "Verification", "Source", "Description", "Rationale", "Source URL",
  ];
  const rows = data.map((a) => [
    format(new Date(a.announced_date), "yyyy-MM-dd"),
    `"${a.acquirer}"`,
    a.acquirer_country || "",
    `"${a.target}"`,
    a.target_country || "",
    a.deal_value || 0,
    a.value_basis || "",                 // C1 — how to read the number
    a.is_disclosed ?? true,
    a.stake_percentage ?? "",
    a.deal_class || "",                  // C4 — ma | jv | vc
    a.deal_type,
    a.round_type || "",
    a.status,
    a.confidence || "",                  // C1 — high | medium | low
    a.verification_status || "",         // auto | human_verified
    a.extraction_method || "",           // regex | llm | manual
    `"${(a.description || "").replace(/"/g, "'")}"`,
    `"${(a.rationale || "").replace(/"/g, "'")}"`,
    a.source_url || "",
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `defense-ma-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── European JV Programs data (static fallback, sourced from public filings) ──

const JV_EU_PROGRAMS_FALLBACK = [
  // 2026 ──────────────────────────────────────────────────────────────────────
  { id: 1,  party1: "Auterion",          p1_iso: "DE", party2: "Airlogix",                p2_iso: "DE", products: "AI strike drones",             year: 2026,
    description: "Auterion, the software platform behind the open-source Skynode flight controller, partners with strike drone startup Airlogix to develop AI-guided autonomous drone systems. The JV targets procurement bids from German and European armed forces under the accelerated post-2022 rearmament drive." },
  { id: 2,  party1: "Quantum Systems",   p1_iso: "DE", party2: "WIY Drones",              p2_iso: "DE", products: "STRILA interceptors",            year: 2026,
    description: "Quantum Systems (Vector VTOL reconnaissance drones) and WIY Drones collaborate to produce STRILA interceptors, an autonomous-guided counter-drone system. The deal targets short-range air defense markets in central and eastern Europe, where the drone threat is considered a top priority." },
  { id: 3,  party1: "Quantum Systems",   p1_iso: "DE", party2: "Tencore",                 p2_iso: "UA", products: "UGVs (TerMit UGV)",              year: 2026,
    description: "Quantum Systems pairs its aerial reconnaissance capabilities (Vector drone) with Tencore's ground unmanned vehicle expertise (TerMit UGV, 800+ units deployed in Ukraine). The partnership aims at a combined drone-ground robot solution meeting NATO standards." },
  { id: 4,  party1: "Tencore",           p1_iso: "UA", party2: "Shark Robotics",          p2_iso: "FR", products: "Combat UGVs",                    year: 2026,
    description: "Strategic alliance announced on 21 April 2026 between Tencore (Ukraine, TerMit UGV) and Shark Robotics (France, Colossus UGV). The two ground robotics champions combine their expertise to develop and co-produce next-generation multi-mission UGVs for European and NATO markets." },
  { id: 5,  party1: "Rheinmetall",       p1_iso: "DE", party2: "Destinus",                p2_iso: "CH", products: "Cruise missiles",                year: 2026,
    description: "German armament giant Rheinmetall partners with Destinus, a Swiss hydrogen hypersonic flight startup, to develop high-speed cruise missiles. The JV combines Rheinmetall's industrial ammunition know-how with Destinus's advanced propulsion technology." },
  { id: 6,  party1: "Helsing",           p1_iso: "DE", party2: "Culver Aerospace",        p2_iso: "DE", products: "Deep-strike UAS",                year: 2026,
    description: "Helsing, a defense AI company specializing in signal processing and targeting software, teams with Culver Aerospace to develop long-range strike drones. Helsing provides the autonomous decision AI layer while Culver supplies the airframe architecture and propulsion." },
  { id: 7,  party1: "THYRA",             p1_iso: "DE", party2: "TAF Industries",          p2_iso: "FI", products: "Interceptors / C-UAS",           year: 2026,
    description: "German defense AI startup THYRA and Finnish manufacturer TAF Industries combine their technologies for counter-drone interceptors. THYRA brings AI-based detection and targeting, TAF the physical interception systems, targeting Nordic and central European armed forces." },
  { id: 8,  party1: "Summa Defence",     p1_iso: "FI", party2: "TAF Industries",          p2_iso: "FI", products: "FPV / ISR / C-UAS",              year: 2026,
    description: "Two Finnish companies from the drone ecosystem form a JV to produce FPV attack drones, ISR surveillance platforms, and counter-drone systems. The consortium responds to accelerated procurement programs of the Finnish armed forces and Nordic NATO allies." },
  { id: 9,  party1: "Frankenburg Tech",  p1_iso: "DE", party2: "PGZ",                    p2_iso: "PL", products: "LEGIT tactical UGV",             year: 2026,
    description: "Frankenburg Tech (autonomous robotics, Germany) partners with PGZ, Poland's public defense industrial group, to co-develop the LEGIT tactical ground robot. The JV gives Frankenburg access to the Polish procurement apparatus, one of Europe's fastest-growing defense budgets." },
  { id: 10, party1: "Remtecnology",      p1_iso: "DE", party2: "New Paakkola Oy",         p2_iso: "FI", products: "LEGIT tactical UGV",             year: 2026,
    description: "Remtecnology (robotic systems, Germany) and Finnish manufacturer New Paakkola Oy collaborate to produce the LEGIT tactical ground robot. The deal combines Remtecnology's robot engineering with Paakkola's established vehicle manufacturing capabilities in Finland." },
  { id: 11, party1: "Ondas",             p1_iso: "US", party2: "HDAT (Heidelberger)",     p2_iso: "DE", products: "C-UAS Iron Drone",               year: 2026,
    description: "Ondas Holdings (USA) and HDAT (Heidelberger, Germany) partner to deploy the Iron Drone system — an autonomous interceptor drone — on European markets. The system protects critical infrastructure and military bases against drone threats by physically neutralizing them." },
  // 2025 ──────────────────────────────────────────────────────────────────────
  { id: 12, party1: "Rheinmetall",       p1_iso: "DE", party2: "ICEYE",                  p2_iso: "FI", products: "SAR satellites",                 year: 2025,
    description: "Rheinmetall and Finnish radar satellite operator ICEYE form a JV to supply persistent SAR (Synthetic Aperture Radar) satellite imagery to armed forces. ICEYE brings its mini-satellite constellation, Rheinmetall its defense customer network and C2 systems integration." },
  { id: 13, party1: "Quantum Systems",   p1_iso: "DE", party2: "Frontline Robotics",      p2_iso: "DE", products: "Recon UAV",                      year: 2025,
    description: "Quantum Systems and Frontline Robotics collaborate on the next generation of fixed-wing VTOL reconnaissance drones. The JV combines Quantum's proven Vector platform with Frontline's sensor integration and communications for European defense customers." },
  { id: 14, party1: "Prevail Partners",  p1_iso: "GB", party2: "Skyeton",                p2_iso: "UA", products: "Raybird UAS",                     year: 2025,
    description: "British investment fund Prevail Partners finances Ukrainian drone manufacturer Skyeton to accelerate production of the Raybird-3, a long-endurance reconnaissance drone combat-tested in Ukraine. The deal opens the British and NATO defense market to Skyeton." },
  { id: 15, party1: "NVL",              p1_iso: "DE", party2: "Rheinmetall",             p2_iso: "DE", party3: "Kraken Technology", p3_iso: "NO",   products: "Autonomous vessels",              year: 2025,
    description: "German shipyard NVL and Rheinmetall partner with Norwegian specialist Kraken Technology to develop autonomous surface vessels (USV). The tri-party consortium targets NATO naval requirements: mine countermeasures, maritime ISR, and coastal force protection." },
  { id: 16, party1: "AIRO",             p1_iso: "AT", party2: "Nord Drone Group",        p2_iso: "NO", products: "FPV / loitering",                year: 2025,
    description: "Austrian company AIRO and Norwegian group Nord Drone partner to develop FPV attack drones and loitering munitions. The JV targets Scandinavian and central European markets where demand for low-cost autonomous munitions is growing rapidly." },
  { id: 17, party1: "Summa Defence",     p1_iso: "FI", party2: "Griselda",               p2_iso: "FI", products: "AI situational awareness",       year: 2025,
    description: "Summa Defence (Finland) and Griselda collaborate to develop AI-powered battlefield situational awareness systems. The JV aggregates drone and sensor data streams to deliver real-time operational intelligence to Nordic armed forces." },
  { id: 18, party1: "MITS Industries",   p1_iso: "DE", party2: "Tencore / Infozahyst",   p2_iso: "UA", products: "UGVs",                           year: 2025,
    description: "MITS Industries (Germany) partners with the Ukrainian consortium Tencore / Infozahyst to develop ground robots combining autonomous mobility and electronic warfare. The deal integrates Ukrainian combat-proven technology into systems meeting German quality standards." },
  { id: 19, party1: "Wingcopter",        p1_iso: "DE", party2: "TAF Industries",         p2_iso: "FI", products: "Recon UAVs",                     year: 2025,
    description: "German VTOL drone manufacturer Wingcopter (known for medical delivery) pivots its expertise to the military domain in partnership with Finnish TAF Industries. The JV adapts civilian VTOL platforms for ISR and tactical reconnaissance missions for Nordic defense customers." },
  { id: 20, party1: "AIRO",             p1_iso: "AT", party2: "Bullet",                 p2_iso: "FI", products: "Interceptors",                   year: 2025,
    description: "AIRO (Austria) and Bullet (Finland) develop drone interception systems, responding to growing Nordic NATO demand for C-UAS capabilities. The deal combines AIRO's aerial platforms with Bullet's interception payloads." },
  { id: 21, party1: "Kongsberg",         p1_iso: "NO", party2: "Helsing",                p2_iso: "DE", products: "ISR satellite constellation",    year: 2025,
    description: "Kongsberg (Norway, defense systems leader) and Helsing (defense AI, Germany) partner to develop an ISR satellite constellation with onboard AI processing. The JV aims to provide European armed forces with persistent, autonomous space surveillance at an affordable cost." },
  // 2024 ──────────────────────────────────────────────────────────────────────
  { id: 22, party1: "Summa Defence",     p1_iso: "FI", party2: "Kort / Elf / Skyassist", p2_iso: "FI", products: "UAV / UGV / USV",               year: 2024,
    description: "Summa Defence leads a multi-company consortium with Kort, Elf, and Skyassist to build a comprehensive autonomous systems portfolio covering air, ground, and sea. This broad-spectrum JV targets Finnish armed forces procurement within the defense investment framework post-NATO accession." },
  { id: 23, party1: "Space42",           p1_iso: "AE", party2: "ICEYE",                 p2_iso: "FI", products: "SAR satellite manufacturing",    year: 2024,
    description: "Space42 (UAE, formerly Yahsat) and ICEYE (Finland) partner to localize SAR radar satellite manufacturing in the United Arab Emirates. The JV creates a Middle Eastern hub for advanced reconnaissance satellite production, leveraging ICEYE's Finnish expertise." },
  // Structural programmes ───────────────────────────────────────────────────
  { id: 24, party1: "Airbus D&S",        p1_iso: "DE", party2: "Thales Alenia Space",    p2_iso: "FR", party3: "RADMOR",           p3_iso: "PL",   products: "Poland military GEO satellite",   year: 2026,
    description: "Airbus Defence & Space, Thales Alenia Space, and Polish firm RADMOR (WB Group) signed an industrial cooperation agreement on 20 April 2026 in Gdańsk for Poland's first sovereign military geostationary satellite. Airbus leads the platform, Thales the military communication payloads, RADMOR the cyber-secure ground infrastructure." },
  { id: 25, party1: "Rheinmetall",       p1_iso: "DE", party2: "American Rheinmetall Vehicles", p2_iso: "US", products: "Lynx KF41 OMFV (US Army)", year: 2022,
    description: "Rheinmetall establishes American Rheinmetall Vehicles LLC to compete for the US Army's OMFV bid (next-generation infantry fighting vehicle). The proposal is based on the Lynx KF41 manufactured in the United States, with the program estimated at over $45 billion over its lifetime." },
  { id: 26, party1: "Naval Group",       p1_iso: "FR", party2: "Fincantieri",            p2_iso: "IT", products: "Naviris — naval export JV",     year: 2020,
    description: "Naval Group (France) and Fincantieri (Italy) establish Naviris, a 50/50 JV based in Genoa, to coordinate naval export programs and European cooperation. Naviris serves as the common vehicle for European tenders (PANG, FREMM) and strengthens Franco-Italian naval consolidation." },
  { id: 27, party1: "Airbus D&S",        p1_iso: "DE", party2: "Dassault Aviation",      p2_iso: "FR", party3: "Leonardo",         p3_iso: "IT",   products: "Eurodrone MALE UAS",             year: 2020,
    description: "Airbus D&S (40%), Dassault Aviation (40%), and Leonardo (20%) form a JV to develop the Eurodrone, the European MALE drone ordered under an ESA/OCCAR contract worth €7.1 billion. The Eurodrone will serve Germany, France, Spain, and Italy with a first flight targeted for 2028." },
  { id: 28, party1: "Rheinmetall",       p1_iso: "DE", party2: "BAE Systems",            p2_iso: "GB", products: "RBSL — Ajax / Boxer / CR3",     year: 2019,
    description: "Rheinmetall and BAE Systems create RBSL (Rheinmetall BAE Systems Land), a 50/50 JV, to deliver next-generation armored vehicles for the British Army. RBSL holds the Ajax prime contract, manages Boxer national integration, and supports Challenger 3 modernization." },
  { id: 29, party1: "KNDS France",       p1_iso: "FR", party2: "KNDS Deutschland",       p2_iso: "DE", party3: "Rheinmetall",       p3_iso: "DE",   products: "MGCS next-gen battle tank (2035+)", year: 2018,
    description: "The Franco-German MGCS program targets a next-generation main battle tank to replace the Leclerc and Leopard 2 by 2035+. The industrial alliance brings together KNDS France, KNDS Deutschland, and Rheinmetall — with Thales for mission systems — with workshare negotiations ongoing in 2026." },
  { id: 30, party1: "Dassault Aviation", p1_iso: "FR", party2: "Airbus D&S",             p2_iso: "DE", party3: "Indra",             p3_iso: "ES",   products: "FCAS / SCAF NGF (2040+)",        year: 2017,
    description: "France, Germany, and Spain launched the SCAF (Future Air Combat System) program with Dassault (NGF prime), Airbus D&S (Remote Carriers), and Indra (EW). Phase 1B contracts worth €3.5 billion were signed in 2022; persistent tensions over industrial workshare between Airbus and Dassault remain." },
  { id: 31, party1: "Airbus",            p1_iso: "FR", party2: "Safran",                 p2_iso: "FR", products: "ArianeGroup — Ariane 6 / M51",  year: 2015,
    description: "Airbus and Safran merged their launcher and space propulsion activities into ArianeGroup, a 50/50 holding company, creating Europe's sovereign space access champion. ArianeGroup is ESA's exclusive prime contractor for Ariane 6 and develops the M51 ballistic missile for the French Navy." },
  { id: 32, party1: "Airbus",            p1_iso: "FR", party2: "BAE Systems",            p2_iso: "GB", party3: "Leonardo",         p3_iso: "IT",   products: "MBDA — Meteor / Aster / Storm Shadow", year: 2001,
    description: "Airbus (37.5%), BAE Systems (37.5%), and Leonardo (25%) create MBDA, Europe's largest missile integrator. MBDA produces Meteor, Aster, Brimstone, Exocet, Storm Shadow/SCALP, and the CAMM family. The tri-national governance preserves each nation's export sovereignty while pooling R&D." },
  { id: 33, party1: "MBDA",              p1_iso: "FR", party2: "Thales",                 p2_iso: "FR", products: "Eurosam — SAMP/T Aster 30",     year: 1989,
    description: "Eurosam is a JV between MBDA (66%) and Thales (34%) producing the SAMP/T ground-to-air system (Aster 30), deployed in France, Italy, Singapore, and Ukraine. The JV is developing the modernized SAMP/T NG version delivered to NATO allies, offering medium-range theater missile defense." },
  { id: 34, party1: "Airbus Helicopters", p1_iso: "FR", party2: "Leonardo",              p2_iso: "IT", party3: "GKN Fokker",       p3_iso: "NL",   products: "NHIndustries — NH90 helicopter",  year: 1992,
    description: "NHIndustries is the industrial consortium of Airbus Helicopters, Leonardo, and GKN Fokker to develop, produce, and support the NH90 medium tactical helicopter. Over 800 aircraft have been delivered to 14 operator nations, making the NH90 the most produced European military helicopter." },
];

// ── JV Programs table view ────────────────────────────────────────────────────

function PartyLogoSmall({ name, iso }) {
  // Resolve a domain by exact then fuzzy match against LOGO_FALLBACK
  const domain = useMemo(() => {
    if (LOGO_FALLBACK[name]) return LOGO_FALLBACK[name];
    const nn = normalizeName(name ?? "");
    for (const [k, d] of Object.entries(LOGO_FALLBACK)) {
      if (normalizeName(k) === nn) return d;
    }
    for (const [k, d] of Object.entries(LOGO_FALLBACK)) {
      const nk = normalizeName(k);
      if (nk.length >= 4 && nn.startsWith(nk)) return d;
    }
    return null;
  }, [name]);
  const urls = logoUrlsFor(name, domain);
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [name]);

  if (idx < urls.length) {
    return (
      <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
        <img src={urls[idx]} alt={name} className="w-full h-full object-contain p-0.5" onError={() => setIdx(i => i + 1)} />
      </div>
    );
  }
  return (
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${avatarColor(name)}`}>
      <span className="text-[8px] font-bold text-white">{initials(name)}</span>
    </div>
  );
}

// Short product/sector labels for M&A joint-venture deals shown in this tab.
const JV_SECTOR_LABELS = {
  uas_drones:         "Drones / C-UAS",
  missiles_munitions: "Missiles / munitions",
  land_systems:       "Land systems",
  naval:              "Naval",
  aircraft:           "Aircraft",
  space:              "Space",
  cyber:              "Cyber",
  c2_electronics:     "C2 / electronics",
  services_it:        "Services / IT",
};

function JVProgramsView({ activities = [] }) {
  const [sortYear, setSortYear] = useState("desc");
  const [filterYear, setFilterYear] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [jvData, setJvData] = useState(JV_EU_PROGRAMS_FALLBACK);

  useEffect(() => {
    axios.get(`${API}/jv-programs`)
      .then(res => { if (res.data && res.data.length > 0) setJvData(res.data); })
      .catch(() => { /* keep fallback */ });
  }, []);

  // Joint-venture deals from the M&A collection (e.g. Eurosatory) mapped into the
  // JV-programme row shape so they appear in this tab next to the curated JV list.
  const maJvRows = useMemo(() => {
    return (activities || [])
      .filter(a => a.deal_type === "joint_venture" && a.acquirer && a.target)
      .map(a => ({
        id: `ma-${a.id}`,
        party1: a.acquirer, p1_iso: a.acquirer_country,
        party2: a.target,   p2_iso: a.target_country,
        products: JV_SECTOR_LABELS[a.sector] || "Joint venture",
        year: a.announced_date ? new Date(a.announced_date).getFullYear() : null,
        description: a.rationale || a.description,
        source_url: a.source_url,
      }));
  }, [activities]);

  // Merge M&A JV rows in front of the curated programmes, de-duplicating on the
  // (party1, party2) pair so a deal is never listed twice.
  const mergedData = useMemo(() => {
    const seen = new Set();
    const out = [];
    for (const r of [...maJvRows, ...jvData]) {
      const key = `${(r.party1 || "").toLowerCase()}|${(r.party2 || "").toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(r);
    }
    return out;
  }, [maJvRows, jvData]);

  const jvDataAsOf = useMemo(() => {
    const max = Math.max(...mergedData.map(r => r.year || 0));
    if (!max || max === -Infinity) return null;
    return `Data as of ${max}`;
  }, [mergedData]);

  const years = [...new Set(mergedData.map(r => r.year))].sort((a, b) => b - a);

  const rows = useMemo(() => {
    let list = mergedData.filter(r => {
      if (filterYear !== "all" && String(r.year) !== filterYear) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.party1.toLowerCase().includes(q) ||
          r.party2.toLowerCase().includes(q) ||
          r.products.toLowerCase().includes(q)
        );
      }
      return true;
    });
    list = [...list].sort((a, b) => sortYear === "desc" ? b.year - a.year : a.year - b.year);
    return list;
  }, [mergedData, filterYear, search, sortYear]);

  function yearColor(y) {
    return y >= 2025 ? "text-slate-900 font-semibold" : "text-slate-500";
  }

  function handlePartyClick(e, name) {
    e.stopPropagation();
    const resolved = resolvePlayerName(name);
    if (resolved) setProfileName(resolved);
  }

  function PartyCell({ name, iso }) {
    return (
      <div className="flex items-center gap-2">
        <PartyLogoSmall name={name} iso={iso} />
        <div className="flex items-center gap-1.5">
          <FlagImg iso2={iso} />
          <button
            onClick={e => handlePartyClick(e, name)}
            className={`text-xs font-medium text-left ${resolvePlayerName(name) ? "text-slate-800 hover:text-slate-900 hover:underline cursor-pointer" : "text-slate-600 cursor-default"}`}
          >
            {name}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header + filters */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-400 uppercase mb-0.5">Aerospace &amp; Defense</p>
          <h2 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Joint Ventures — Europe</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[10px] text-slate-400">Sources: company press releases, regulatory filings, Breaking Defense, Defense News, Reuters, Bloomberg</p>
            {jvDataAsOf && (
              <span className="text-[10px] text-slate-400 font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{jvDataAsOf}</span>
            )}
          </div>
        </div>

        {/* Filters bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50/60">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search party or program…"
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
          <select
            value={filterYear}
            onChange={e => setFilterYear(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="all">All Years</option>
            {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
          </select>
          <span className="text-xs text-slate-400 ml-auto">{rows.length} joint ventures</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 w-8">#</th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Party 1</th>
                <th className="px-1 py-2.5 w-5" />
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Party 2</th>
                <th className="px-1 py-2.5 w-5" />
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Party 3</th>
                <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Product(s) / Programme</th>
                <th
                  onClick={() => setSortYear(s => s === "desc" ? "asc" : "desc")}
                  className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                >
                  Year {sortYear === "desc" ? "↓" : "↑"}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isOpen = expandedId === row.id;
                return (
                  <>
                    <tr
                      key={row.id}
                      onClick={() => setExpandedId(isOpen ? null : row.id)}
                      className={`border-b border-slate-50 transition-colors cursor-pointer group ${isOpen ? "bg-slate-50" : "hover:bg-slate-50"}`}
                    >
                      {/* Index */}
                      <td className="px-4 py-3 text-[11px] font-mono text-slate-400">
                        {String(i + 1).padStart(2, "0")}
                      </td>

                      {/* Party 1 */}
                      <td className="px-3 py-3">
                        <PartyCell name={row.party1} iso={row.p1_iso} />
                      </td>

                      {/* Arrow 1→2 */}
                      <td className="px-1 py-3 text-slate-300 text-center">
                        <ArrowRight className="w-3 h-3" />
                      </td>

                      {/* Party 2 */}
                      <td className="px-3 py-3">
                        <PartyCell name={row.party2} iso={row.p2_iso} />
                      </td>

                      {/* Arrow 2→3 (only shown when party3 exists) */}
                      <td className="px-1 py-3 text-center">
                        {row.party3
                          ? <ArrowRight className="w-3 h-3 text-slate-300" />
                          : <span className="block w-3" />
                        }
                      </td>

                      {/* Party 3 */}
                      <td className="px-3 py-3">
                        {row.party3
                          ? <PartyCell name={row.party3} iso={row.p3_iso} />
                          : <span className="text-slate-200 text-xs font-mono">—</span>
                        }
                      </td>

                      {/* Products */}
                      <td className="px-3 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-700">
                          {row.products}
                        </span>
                      </td>

                      {/* Year */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold font-mono ${yearColor(row.year)}`}>
                            {row.year}
                          </span>
                          {row.description && (
                            <ChevronDown className={`w-3 h-3 text-slate-300 group-hover:text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-slate-500" : ""}`} />
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded description row */}
                    {isOpen && row.description && (
                      <tr key={`desc-${row.id}`} className="bg-slate-50 border-b border-slate-100">
                        <td />
                        <td colSpan={7} className="px-3 pb-4 pt-2">
                          <div className="flex items-start gap-2">
                            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-[12px] text-slate-600 leading-relaxed">{row.description}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company profile slide-over */}
      <CompanyProfileSheet name={profileName} onClose={() => setProfileName(null)} />
    </div>
  );
}

// ── Deal-type tabs ─────────────────────────────────────────────────────────

const DEAL_TYPE_TABS = [
  { value: "all",           label: "All deals",             types: null },
  { value: "acquisitions",  label: "Acquisitions",          types: ["acquisition"] },
  { value: "mergers",       label: "Mergers",               types: ["merger"] },
  { value: "investments",   label: "Investments & Funding", types: INVEST_TYPES },
  { value: "jv",            label: "Joint Ventures",        types: ["joint_venture"] },
];

// ── Known defense players: name variant → canonical DB name ───────────────
// Canonical names must match exactly what's stored in defense_players.name

const PROFILE_NAME_MAP = {
  // Lockheed Martin
  "Lockheed Martin": "Lockheed Martin",
  // Raytheon / RTX
  "Raytheon Technologies": "Raytheon Technologies",
  "Raytheon": "Raytheon Technologies",
  "RTX": "Raytheon Technologies",
  "RTX Ventures": "Raytheon Technologies",
  // Northrop Grumman
  "Northrop Grumman": "Northrop Grumman",
  // General Dynamics
  "General Dynamics": "General Dynamics",
  // Boeing
  "Boeing": "Boeing Defense",
  "Boeing Defense": "Boeing Defense",
  // L3Harris
  "L3Harris Technologies": "L3Harris Technologies",
  "L3Harris": "L3Harris Technologies",
  // HII
  "Huntington Ingalls Industries": "Huntington Ingalls",
  "Huntington Ingalls": "Huntington Ingalls",
  "HII": "Huntington Ingalls",
  // Leidos
  "Leidos Holdings": "Leidos Holdings",
  "Leidos": "Leidos Holdings",
  // BAE Systems
  "BAE Systems": "BAE Systems",
  // Thales
  "Thales": "Thales",
  "Thales Group": "Thales",
  // Leonardo
  "Leonardo": "Leonardo",
  "Leonardo DRS": "Leonardo",
  "Leonardo Finmeccanica": "Leonardo",
  // Airbus
  "Airbus": "Airbus Defence & Space",
  "Airbus Defence & Space": "Airbus Defence & Space",
  "Airbus Defense": "Airbus Defence & Space",
  "Airbus D&S": "Airbus Defence & Space",
  "Airbus Helicopters": "Airbus Defence & Space",
  // Thales subsidiaries / JV names
  "Thales Alenia Space": "Thales",
  // Rheinmetall
  "Rheinmetall": "Rheinmetall",
  "Rheinmetall AG": "Rheinmetall",
  // Safran
  "Safran": "Safran",
  // KNDS
  "KNDS": "KNDS",
  "KNDS France": "KNDS",
  "KNDS Germany": "KNDS",
  "KNDS Deutschland": "KNDS",
  // Hanwha
  "Hanwha": "Hanwha Aerospace",
  "Hanwha Aerospace": "Hanwha Aerospace",
  "Hanwha Defense": "Hanwha Aerospace",
  "Hanwha Ocean": "Hanwha Aerospace",
  // Saab
  "Saab": "Saab AB",
  "Saab AB": "Saab AB",
  // Dassault
  "Dassault": "Dassault Aviation",
  "Dassault Aviation": "Dassault Aviation",
  // Naval Group
  "Naval Group": "Naval Group",
  // MBDA
  "MBDA": "MBDA",
  // Elbit
  "Elbit Systems": "Elbit Systems",
  // Rafael
  "Rafael": "Rafael Advanced Defense",
  "Rafael Advanced Defense Systems": "Rafael Advanced Defense",
  "Rafael Advanced Defense": "Rafael Advanced Defense",
  // Hensoldt
  "Hensoldt": "Hensoldt",
  // QinetiQ
  "QinetiQ": "QinetiQ",
  // Babcock
  "Babcock": "Babcock International",
  "Babcock International": "Babcock International",
  // HEICO
  "HEICO": "HEICO Corporation",
  "HEICO Corporation": "HEICO Corporation",
  // TransDigm
  "TransDigm": "TransDigm",
  // Mercury Systems
  "Mercury Systems": "Mercury Systems",
  // AeroVironment
  "AeroVironment": "AeroVironment",
  // Shield AI
  "Shield AI": "Shield AI",
  // SAIC
  "SAIC": "SAIC",
  // Kratos
  "Kratos": "Kratos Defense",
  "Kratos Defense": "Kratos Defense",
  "Kratos Defense & Security Solutions": "Kratos Defense",
  // Palantir
  "Palantir": "Palantir Technologies",
  "Palantir Technologies": "Palantir Technologies",
  // Anduril
  "Anduril": "Anduril Industries",
  "Anduril Industries": "Anduril Industries",
  // Booz Allen
  "Booz Allen Hamilton": "Booz Allen Hamilton",
  // CACI
  "CACI": "CACI International",
  "CACI International": "CACI International",
  // Teledyne
  "Teledyne Technologies": "Teledyne Technologies",
  "Teledyne": "Teledyne Technologies",
  // Curtiss-Wright
  "Curtiss-Wright": "Curtiss-Wright",
  // Textron
  "Textron": "Textron",
  // Rolls-Royce
  "Rolls-Royce": "Rolls-Royce Holdings",
  "Rolls-Royce Holdings": "Rolls-Royce Holdings",
  // Parker Hannifin
  "Parker Hannifin": "Parker Hannifin",
  // Collins Aerospace
  "Collins Aerospace": "Raytheon Technologies",
  // European companies in defense_players
  "Indra": "Indra Sistemas",
  "Indra Sistemas": "Indra Sistemas",
  "Hensoldt": "Hensoldt",
  "QinetiQ": "QinetiQ",
  "Ultra Electronics": "Ultra Electronics",
  "Kratos": "Kratos Defense",
  "Kratos Defense": "Kratos Defense",
  "Kratos Defense & Security Solutions": "Kratos Defense",
};

/**
 * Returns the canonical DB name if the company is a known defense player,
 * or null if it's a fund / VC / unknown entity.
 */
function resolvePlayerName(name) {
  if (!name) return null;
  if (PROFILE_NAME_MAP[name] !== undefined) return PROFILE_NAME_MAP[name];
  // Partial match — first word of a known player contained in the name
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(PROFILE_NAME_MAP)) {
    if (key.length >= 5 && lower.includes(key.toLowerCase())) return val;
  }
  return null;
}

// ── Company cell — opens profile sheet for known players, website for others ─
// Supports multi-party strings like "Airbus + BAE Systems + Leonardo"

// Avatar group — overlapping horizontal logo stack, max 3 visible + "+N" badge
function AvatarGroup({ parties, activity, side, onOpenProfile }) {
  const MAX_VIS = 3;
  const visible  = parties.slice(0, MAX_VIS);
  const overflow = parties.length - MAX_VIS;

  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild>
          {/* Inline-flex so row height tracks logo height, not flex-col */}
          <div className="inline-flex items-center" style={{ lineHeight: 0 }}>
            {visible.map((p, i) => {
              const synth = partyActivity(p.name, activity, side);
              return (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
                  className="relative shrink-0 rounded-xl hover:ring-2 hover:ring-slate-300 focus:outline-none transition-all"
                  style={{ marginLeft: i > 0 ? -10 : 0, zIndex: MAX_VIS - i }}
                  aria-label={p.name}
                >
                  <CompanyLogo activity={synth} side={side} size="sm" />
                </button>
              );
            })}
            {overflow > 0 && (
              <div
                className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 border-2 border-white text-[9px] font-bold text-slate-500 shrink-0 select-none"
                style={{ marginLeft: -10, zIndex: 0 }}
              >
                +{overflow}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-xs max-w-[240px] p-2">
          <div className="space-y-1">
            {parties.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-slate-400 select-none shrink-0">·</span>
                <span className="font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
}

// CompanyCell used in the main deal TABLE — logo + bold name + country flag
// Multi-party: overlapping logos (max 2) + comma-separated names on one line
function CompanyCell({ activity, side, onOpenProfile }) {
  const rawName = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const countryField = side === "acquirer" ? "acquirer_country" : "target_country";
  const country = side === "target" ? resolveTargetCountry(activity) : activity[countryField];
  const parties = parseParties(rawName);
  const isMulti = parties.length > 1;

  if (!isMulti) {
    const canonical = resolvePlayerName(rawName);
    return (
      <div className="flex items-center gap-2.5 min-w-0">
        <button onClick={e => { e.stopPropagation(); onOpenProfile(canonical || rawName); }} className="shrink-0">
          <CompanyLogo activity={activity} side={side} size="sm" />
        </button>
        <div className="min-w-0">
          <button
            onClick={e => { e.stopPropagation(); onOpenProfile(canonical || rawName); }}
            className="block text-[13px] font-semibold text-slate-800 hover:text-slate-900 transition-colors text-left leading-snug truncate max-w-[160px]"
          >
            {rawName}
          </button>
          {country && (
            <div className="flex items-center gap-1 mt-0.5">
              <FlagImg iso2={country} />
              <span className="text-[9px] text-slate-400 font-mono">{country}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Multi-party: 2 overlapping logos + names on a single truncated line
  const visible = parties.slice(0, 2);
  const overflow = parties.length - 2;
  return (
    <div className="flex items-center gap-2 min-w-0">
      {/* Overlapping logos */}
      <div className="inline-flex items-center shrink-0">
        {visible.map((p, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
            className="relative rounded-lg hover:ring-2 hover:ring-slate-300 focus:outline-none transition-all shrink-0"
            style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 2 - i }}
          >
            <CompanyLogo activity={partyActivity(p.name, activity, side)} side={side} size="sm" />
          </button>
        ))}
        {overflow > 0 && (
          <div className="relative w-8 h-8 rounded-lg bg-slate-100 border-2 border-white text-[9px] font-bold text-slate-500 flex items-center justify-center shrink-0" style={{ marginLeft: -8, zIndex: 0 }}>
            +{overflow}
          </div>
        )}
      </div>
      {/* Compact name list — single line */}
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-slate-700 leading-snug truncate max-w-[130px]">
          {parties.map((p, i) => (
            <span key={i}>
              {i > 0 && <span className="text-slate-300 mx-0.5">·</span>}
              <button
                onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
                className="hover:text-slate-900 transition-colors"
              >{p.name}</button>
            </span>
          ))}
        </p>
        {country && (
          <div className="flex items-center gap-1 mt-0.5">
            <FlagImg iso2={country} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Table row ──────────────────────────────────────────────────────────────

// Detect URLs that point to a specific article/press-release (not just a homepage)
const SPECIFIC_URL_RE = /\/20\d{2}[/-]|press-release|news-release|newsroom\/20|mediaroom|prnewswire\.com|businesswire\.com|reuters\.com\/|bloomberg\.com\/news|breakingdefense|defensenews|janes\.com|aviationweek|spaceflightnow/i;

// Target cell without logo — used when acquirer and target share the same resolved logo domain
function CompanyCellNoLogo({ activity, side, onOpenProfile }) {
  const rawName = activity[side === "acquirer" ? "acquirer" : "target"] ?? "";
  const country = side === "target" ? resolveTargetCountry(activity) : activity.acquirer_country;
  const canonical = resolvePlayerName(rawName);
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[9px] font-bold text-white shrink-0 select-none ${avatarColor(rawName)}`}>
        {initials(rawName)}
      </div>
      <div className="min-w-0">
        <button
          onClick={e => { e.stopPropagation(); onOpenProfile(canonical || rawName); }}
          className="block text-[13px] font-semibold text-slate-800 hover:text-slate-900 transition-colors text-left leading-snug truncate max-w-[160px]"
        >
          {rawName}
        </button>
        {country && (
          <div className="flex items-center gap-1 mt-0.5">
            <FlagImg iso2={country} />
            <span className="text-[9px] text-slate-400 font-mono">{country}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function TableRow({ activity, index, onOpenProfile, onSelectDeal }) {
  const acquirerDomain = getLogoDomain(activity, "acquirer");
  const targetDomain   = getLogoDomain(activity, "target");
  const sameLogos      = !!(acquirerDomain && acquirerDomain === targetDomain);
  const isSpecificUrl  = !!(activity.source_url && SPECIFIC_URL_RE.test(activity.source_url));

  const rowBg = index % 2 === 0 ? "bg-white" : "bg-slate-50/40";

  return (
    <tr
      className={`${rowBg} hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 group`}
      onClick={() => onSelectDeal(activity)}
    >
      <td className="px-3 py-2 text-[11px] text-slate-400 font-mono w-10 select-none">{index + 1}</td>

      {/* Acquirer */}
      <td className="px-3 py-2">
        <CompanyCell activity={activity} side="acquirer" onOpenProfile={onOpenProfile} />
      </td>

      {/* Arrow */}
      <td className="px-1 py-2 text-slate-300 text-xs">→</td>

      {/* Target — use initials badge when logo would duplicate acquirer's */}
      <td className="px-3 py-2">
        {sameLogos
          ? <CompanyCellNoLogo activity={activity} side="target" onOpenProfile={onOpenProfile} />
          : <CompanyCell activity={activity} side="target" onOpenProfile={onOpenProfile} />
        }
      </td>

      {/* Value */}
      <td className="px-3 py-2 text-sm font-mono font-semibold text-slate-900 whitespace-nowrap">
        {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
        {activity.stake_percentage != null && (
          <span className="text-[10px] text-slate-400 ml-1">{activity.stake_percentage}%</span>
        )}
      </td>

      {/* Status */}
      <td className="px-3 py-2">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${getStatusStyle(activity.status)}`}>
          {formatStatus(activity.status)}
        </span>
      </td>

      {/* Reg. */}
      <td className="px-3 py-2">
        {activity.regulatory_status && activity.regulatory_status !== "not_required" && (
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border whitespace-nowrap ${
            activity.regulatory_status === "cleared" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
            activity.regulatory_status === "blocked" ? "bg-rose-50 text-rose-700 border-rose-200" :
            "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            {activity.regulatory_status === "cleared" ? "Reg. Cleared" : activity.regulatory_status === "blocked" ? "Reg. Blocked" : "Reg. Review"}
          </span>
        )}
      </td>

      {/* Date */}
      <td className="px-3 py-2 text-xs text-slate-500 whitespace-nowrap">
        {format(new Date(activity.announced_date), "MMM yyyy")}
      </td>

      {/* Source — only show for specific article URLs, not homepage links */}
      <td className="px-3 py-2 text-center">
        {isSpecificUrl && (
          <a
            href={activity.source_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-slate-300 hover:text-blue-600 transition-colors inline-flex opacity-0 group-hover:opacity-100"
            title="Source"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </td>

      {/* Open detail hint */}
      <td className="px-2 py-2 w-6">
        <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-slate-400 transition-colors" />
      </td>
    </tr>
  );
}

// ── Investment consolidated view ────────────────────────────────────────────
// Target company on LEFT, all investor rounds grouped and expandable.

function InvestmentConsolidatedView({ deals, onOpenProfile, onSelectDeal }) {
  const [expanded, setExpanded] = useState(new Set());

  const groups = useMemo(() => {
    const map = new Map();
    for (const d of deals) {
      if (!map.has(d.target)) {
        map.set(d.target, {
          target: d.target,
          target_country: d.target_country,
          target_logo_domain: d.target_logo_domain,
          rounds: [],
        });
      }
      map.get(d.target).rounds.push(d);
    }
    return [...map.values()].map(g => {
      const sorted = [...g.rounds].sort((a, b) => new Date(b.announced_date) - new Date(a.announced_date));
      const totalRaised = g.rounds
        .filter(r => (r.is_disclosed ?? true) && r.deal_value > 0)
        .reduce((s, r) => s + r.deal_value, 0);
      const latestValuation = Math.max(0, ...g.rounds.map(r => r.valuation || 0));
      return { ...g, rounds: sorted, totalRaised, latestValuation: latestValuation || null };
    }).sort((a, b) => {
      const va = a.latestValuation || a.totalRaised || 0;
      const vb = b.latestValuation || b.totalRaised || 0;
      return vb - va;
    });
  }, [deals]);

  const toggleAll = () => {
    if (expanded.size === groups.length) setExpanded(new Set());
    else setExpanded(new Set(groups.map(g => g.target)));
  };

  function toggle(target) {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(target)) next.delete(target); else next.add(target);
      return next;
    });
  }

  if (groups.length === 0) {
    return <div className="text-center py-16 text-slate-400 text-sm">No investment deals match the selected filters.</div>;
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-600">
          {groups.length} portfolio {groups.length === 1 ? "company" : "companies"}
          <span className="ml-2 text-slate-400 font-normal">{deals.length} total rounds</span>
        </p>
        <button
          onClick={toggleAll}
          className="text-xs text-blue-800 hover:text-blue-900 font-medium"
        >
          {expanded.size === groups.length ? "Collapse all" : "Expand all"}
        </button>
      </div>

      {groups.map((group) => {
        const isOpen = expanded.has(group.target);
        const latestRound = group.rounds[0];
        const synth = { target: group.target, target_country: group.target_country, target_logo_domain: group.target_logo_domain };

        return (
          <div key={group.target} className="border-b border-slate-100 last:border-0">
            <div
              className={`flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors ${isOpen ? "bg-slate-50" : "hover:bg-slate-50"}`}
              onClick={() => toggle(group.target)}
            >
              {/* Target company — LEFT */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(group.target) || group.target); }} className="shrink-0">
                  <CompanyLogo activity={synth} side="target" size="md" />
                </button>
                <div className="min-w-0">
                  <button
                    onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(group.target) || group.target); }}
                    className="font-semibold text-slate-900 hover:text-slate-900 text-sm leading-snug text-left block truncate"
                  >
                    {group.target}
                  </button>
                  {group.target_country && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <FlagImg iso2={group.target_country} />
                      <span className="text-[9px] text-slate-400 font-mono">{group.target_country}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Consolidated stats — RIGHT */}
              <div className="flex items-center gap-5 shrink-0">
                {group.latestValuation ? (
                  <div className="text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Valuation</p>
                    <p className="text-sm font-mono font-bold text-slate-900">
                      {group.latestValuation >= 1000 ? `$${(group.latestValuation / 1000).toFixed(1)}B` : `$${group.latestValuation}M`}
                    </p>
                  </div>
                ) : null}
                {group.totalRaised > 0 && (
                  <div className="text-right">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Total raised</p>
                    <p className="text-sm font-mono font-bold text-slate-900">
                      {group.totalRaised >= 1000 ? `$${(group.totalRaised / 1000).toFixed(1)}B` : `$${group.totalRaised}M`}
                    </p>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">Rounds</p>
                  <p className="text-sm font-mono font-bold text-slate-700">{group.rounds.length}</p>
                </div>
                {latestRound?.round_type && <RoundBadge roundType={latestRound.round_type} />}
                <span className="text-slate-400 ml-1">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </div>
            </div>

            {/* Expanded: investor rounds table */}
            {isOpen && (
              <div className="bg-slate-50 border-t border-slate-100">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="px-5 pl-16 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 text-left">Investor</th>
                      <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 text-left">Round</th>
                      <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 text-right">Amount</th>
                      <th className="px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Date</th>
                      <th className="px-3 py-2 w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {group.rounds.map((r, rIdx) => (
                      <tr key={r.id || rIdx} className={`border-b border-slate-100 last:border-0 cursor-pointer hover:bg-slate-100/40 transition-colors ${rIdx % 2 === 0 ? "bg-white/60" : "bg-slate-50/20"}`} onClick={() => onSelectDeal?.(r)}>
                        <td className="px-5 pl-16 py-2.5">
                          <div className="flex items-center gap-2">
                            <button onClick={e => { e.stopPropagation(); onOpenProfile(resolvePlayerName(r.acquirer) || r.acquirer); }} className="shrink-0">
                              <CompanyLogo activity={r} side="acquirer" size="sm" />
                            </button>
                            <CompanyNameBtn name={r.acquirer} onOpenProfile={onOpenProfile} className="text-slate-800 font-medium" />
                          </div>
                        </td>
                        <td className="px-3 py-2.5">
                          {r.round_type
                            ? <RoundBadge roundType={r.round_type} />
                            : <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded capitalize">{r.deal_type.replaceAll("_", " ")}</span>
                          }
                        </td>
                        <td className="px-3 py-2.5 text-right font-mono font-semibold text-slate-900 whitespace-nowrap">
                          {formatValue(r.deal_value, r.is_disclosed ?? true)}
                        </td>
                        <td className="px-3 py-2.5 text-slate-500 whitespace-nowrap">
                          {format(new Date(r.announced_date), "MMM yyyy")}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {r.source_url && (
                            <a
                              href={r.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="text-slate-400 hover:text-blue-700 transition-colors inline-flex"
                              title="Source"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Country filter — shows top countries across all deals ──────────────────

const COUNTRY_LABEL = {
  US: "USA", GB: "UK", FR: "France", DE: "Germany", IT: "Italy",
  ES: "Spain", IL: "Israel", CZ: "Czech Rep.", CH: "Switzerland",
  LU: "Luxembourg", SE: "Sweden", KR: "South Korea", AU: "Australia",
  NO: "Norway", BE: "Belgium", PL: "Poland", NL: "Netherlands",
  UA: "Ukraine", AE: "UAE", TR: "Turkey", IN: "India",
  BR: "Brazil", CA: "Canada", JP: "Japan", CN: "China",
};

function CountryFilter({ allDeals, selected, onSelect }) {
  const counts = useMemo(() => {
    const map = {};
    for (const d of allDeals) {
      if (d.acquirer_country) map[d.acquirer_country] = (map[d.acquirer_country] || 0) + 1;
      if (d.target_country && d.target_country !== d.acquirer_country) {
        map[d.target_country] = (map[d.target_country] || 0) + 1;
      }
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([code, count]) => ({ code, count }));
  }, [allDeals]);

  if (counts.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Country</p>
      <div className="space-y-0.5">
        <button
          onClick={() => onSelect("all")}
          className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
            selected === "all"
              ? "bg-slate-100 text-slate-900 font-semibold"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          All countries
        </button>
        {counts.map(({ code, count }) => (
          <button
            key={code}
            onClick={() => onSelect(selected === code ? "all" : code)}
            className={`w-full text-left text-xs px-2 py-1 rounded transition-colors flex items-center gap-2 ${
              selected === code
                ? "bg-slate-100 text-slate-900 font-semibold"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <FlagImg iso2={code} />
            <span className="flex-1 truncate">{COUNTRY_LABEL[code] || code}</span>
            <span className={`text-[9px] font-mono ${selected === code ? "text-slate-600" : "text-slate-400"}`}>{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Deal Detail Drawer ─────────────────────────────────────────────────────

function ConfidencePill({ confidence }) {
  const map = {
    high:   "bg-emerald-50 text-emerald-700 border-emerald-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low:    "bg-slate-100 text-slate-500 border-slate-200",
  };
  const cls = map[confidence] || map.low;
  const label = confidence ? confidence.charAt(0).toUpperCase() + confidence.slice(1) : "Low";
  return (
    <UITooltip>
      <TooltipTrigger asChild>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-default ${cls}`}>
          {label} confidence
        </span>
      </TooltipTrigger>
      <TooltipContent className="text-xs max-w-xs">
        High = 2+ concordant primary sources. Medium = 1 primary source. Low = unverified / estimated.
      </TooltipContent>
    </UITooltip>
  );
}

function DealDetailDrawer({ deal, onClose, onOpenProfile }) {
  if (!deal) return null;
  const labels = getDealLabels(deal.deal_type);
  const acquirerParties = parseParties(deal.acquirer);
  const isMultiAcquirer = acquirerParties.length > 1;

  return (
    <Sheet open={!!deal} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        className="w-full sm:max-w-lg overflow-y-auto p-0 border-l border-slate-200"
        style={{ maxWidth: 520 }}
      >
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Deal Detail
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Acquirer → Target */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest mb-1">{labels.left}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {acquirerParties.map((p, idx) => {
                  const synth = partyActivity(p.name, deal, "acquirer");
                  return (
                    <div key={idx} className="flex items-center gap-1.5">
                      {idx > 0 && <span className="text-slate-300 text-xs">+</span>}
                      <button onClick={() => onOpenProfile(resolvePlayerName(p.name) || p.name)} className="shrink-0">
                        <CompanyLogo activity={synth} side="acquirer" size="sm" />
                      </button>
                      <button
                        onClick={() => onOpenProfile(resolvePlayerName(p.name) || p.name)}
                        className="font-semibold text-slate-900 hover:text-slate-900 text-sm text-left transition-colors"
                      >
                        {p.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <DealSep type={labels.sep} />

            <div className="min-w-0">
              <p className="text-[9px] text-slate-400 font-mono uppercase tracking-widest mb-1">{labels.right}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => onOpenProfile(resolvePlayerName(deal.target) || deal.target)} className="shrink-0">
                  <CompanyLogo activity={deal} side="target" size="sm" />
                </button>
                <button
                  onClick={() => onOpenProfile(resolvePlayerName(deal.target) || deal.target)}
                  className="font-semibold text-slate-900 hover:text-slate-900 text-sm text-left transition-colors"
                >
                  {deal.target}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5 space-y-5">

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                {["strategic_investment","minority_stake","funding_round"].includes(deal.deal_type) ? "Amount Raised" : "Value"}
              </p>
              <p className="text-2xl font-mono font-bold text-slate-900 leading-none">
                {formatValue(deal.deal_value, deal.is_disclosed ?? true)}
              </p>
              {deal.stake_percentage != null && (
                <p className="text-xs text-emerald-600 font-mono font-semibold mt-0.5">{deal.stake_percentage}% stake</p>
              )}
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Status</p>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusStyle(deal.status)}`}>
                {formatStatus(deal.status)}
              </span>
              {deal.round_type && <div className="mt-1"><RoundBadge roundType={deal.round_type} /></div>}
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Type</p>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded capitalize font-medium">
                {deal.deal_type.replaceAll("_", " ")}
              </span>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">Data Quality</p>
              <TooltipProvider>
                <ConfidencePill confidence={deal.confidence} />
              </TooltipProvider>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Announced</p>
              <p className="text-sm font-medium text-slate-800">{format(new Date(deal.announced_date), "d MMM yyyy")}</p>
            </div>

            {deal.closed_date ? (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Closed</p>
                <p className="text-sm font-medium text-slate-800">{format(new Date(deal.closed_date), "d MMM yyyy")}</p>
              </div>
            ) : (
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 mb-1">Closed</p>
                <p className="text-sm text-slate-400">—</p>
              </div>
            )}
          </div>

          {/* Countries */}
          {(deal.acquirer_country || deal.target_country) && (
            <div className="flex items-center gap-2 py-2 border-t border-slate-100 text-xs text-slate-500">
              {deal.acquirer_country && (
                <span className="flex items-center gap-1.5">
                  <FlagImg iso2={deal.acquirer_country} />
                  {deal.acquirer_country}
                </span>
              )}
              {deal.acquirer_country && deal.target_country && (
                <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
              )}
              {deal.target_country && (
                <span className="flex items-center gap-1.5">
                  <FlagImg iso2={deal.target_country} />
                  {deal.target_country}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {deal.description && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Summary</p>
              <p className="text-sm text-slate-600 leading-relaxed">{deal.description}</p>
            </div>
          )}

          {/* Rationale */}
          {deal.rationale && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Strategic Rationale</p>
              <p className="text-sm text-slate-600 leading-relaxed">{deal.rationale}</p>
            </div>
          )}

          {/* Notes (deal structure) */}
          {deal.notes && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-2">Deal Structure Notes</p>
              <p className="text-sm text-amber-900 leading-relaxed">{deal.notes}</p>
            </div>
          )}

          {/* Source */}
          {deal.source_url ? (
            <a
              href={deal.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-blue-800 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              View primary source
            </a>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <ExternalLink className="w-4 h-4 shrink-0 opacity-40" />
              No source URL available
            </div>
          )}

          {/* Open profiles */}
          <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-3">
            {acquirerParties.slice(0, 1).map((p) => (
              <button
                key={p.name}
                onClick={() => { onClose(); onOpenProfile(resolvePlayerName(p.name) || p.name); }}
                className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-200 transition-colors"
              >
                <CompanyLogo activity={partyActivity(p.name, deal, "acquirer")} side="acquirer" size="sm" />
                <span className="truncate">{p.name}</span>
              </button>
            ))}
            <button
              onClick={() => { onClose(); onOpenProfile(resolvePlayerName(deal.target) || deal.target); }}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-200 transition-colors"
            >
              <CompanyLogo activity={deal} side="target" size="sm" />
              <span className="truncate">{deal.target}</span>
            </button>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Deal Pipeline View (Kanban by status) ──────────────────────────────────

const PIPELINE_COLUMNS = [
  { status: "announced",    label: "Announced" },
  { status: "pending",      label: "Pending" },
  { status: "under_review", label: "Under Review" },
  { status: "completed",    label: "Completed" },
  { status: "cancelled",    label: "Cancelled" },
];

function getStatusHeaderBg(status) {
  switch (status) {
    case "completed":    return "bg-emerald-50 border-emerald-200 text-emerald-700";
    case "pending":
    case "under_review": return "bg-amber-50 border-amber-200 text-amber-700";
    case "announced":    return "bg-blue-50 border-blue-200 text-blue-700";
    case "cancelled":    return "bg-rose-50 border-rose-200 text-rose-700";
    default:             return "bg-slate-50 border-slate-200 text-slate-600";
  }
}

function PipelineMiniCard({ activity, onSelectDeal }) {
  const acquirerDomain = getLogoDomain(activity, "acquirer");
  const targetDomain   = getLogoDomain(activity, "target");
  const labels         = getDealLabels(activity.deal_type);

  return (
    <button
      className="w-full text-left bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all space-y-1.5"
      onClick={() => onSelectDeal(activity)}
    >
      {/* Logos + arrow */}
      <div className="flex items-center gap-1.5">
        <CompanyLogo activity={activity} side="acquirer" size="sm" />
        <ArrowRight className="w-2.5 h-2.5 text-slate-300 shrink-0" />
        <CompanyLogo activity={activity} side="target" size="sm" />
        <span className="text-[10px] text-slate-500 truncate flex-1 ml-0.5 leading-snug">
          {activity.acquirer.split(/[\s,]/)[0]} → {activity.target.split(/[\s,]/)[0]}
        </span>
      </div>
      {/* Value */}
      <p className="text-[11px] font-mono font-bold text-slate-800">
        {formatValue(activity.deal_value, activity.is_disclosed ?? true)}
      </p>
      {/* Date + type */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[9px] text-slate-400 whitespace-nowrap">
          {format(new Date(activity.announced_date), "MMM yyyy")}
        </span>
        <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded capitalize leading-none">
          {activity.deal_type.replaceAll("_", " ")}
        </span>
        {activity.sector && (
          <span className="text-[9px] bg-slate-100 text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded-full capitalize leading-none">
            {SECTOR_OPTIONS.find(s => s.value === activity.sector)?.label ?? activity.sector.replaceAll("_", " ")}
          </span>
        )}
      </div>
    </button>
  );
}

function DealPipelineView({ deals, onSelectDeal }) {
  const columns = PIPELINE_COLUMNS.map(col => ({
    ...col,
    deals: deals.filter(a => a.status === col.status),
  }));

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3 min-w-[700px]">
        {columns.map(col => (
          <div key={col.status} className="flex-1 min-w-[160px]">
            {/* Column header */}
            <div className={`flex items-center justify-between px-3 py-2 rounded-t-lg border ${getStatusHeaderBg(col.status)}`}>
              <span className="text-[11px] font-semibold uppercase tracking-wider">{col.label}</span>
              <span className="text-[10px] font-mono font-bold bg-white/60 px-1.5 py-0.5 rounded-full border">
                {col.deals.length}
              </span>
            </div>
            {/* Cards */}
            <div className="bg-slate-50 border border-t-0 border-slate-200 rounded-b-lg p-2 space-y-2 min-h-[120px]">
              {col.deals.length === 0 ? (
                <p className="text-[10px] text-slate-300 text-center pt-6">No deals</p>
              ) : (
                col.deals.map(a => (
                  <PipelineMiniCard key={a.id} activity={a} onSelectDeal={onSelectDeal} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ── Main page ──────────────────────────────────────────────────────────────

export default function MAActivity() {
  const { token }                              = useAuth();
  const [activities,     setActivities]        = useState([]);
  const [historical,     setHistorical]        = useState([]);
  const [players,        setPlayers]           = useState([]);
  const [loading,        setLoading]           = useState(true);
  const [histLoading,    setHistLoading]       = useState(false);
  const [error,          setError]             = useState(null);
  const [dealTypeTab,    setDealTypeTab]       = useState("all");
  const [page,           setPage]              = useState(0);
  const [searchTerm,     setSearchTerm]        = useState("");
  const [selectedStatus, setSelectedStatus]    = useState("all");
  const [selectedYear,   setSelectedYear]      = useState("all");
  const [profileName,    setProfileName]       = useState(null);
  const [selectedDeal,   setSelectedDeal]      = useState(null);
  const [sortField,      setSortField]         = useState("announced_date");
  const [sortDir,        setSortDir]           = useState("desc");
  const [scraping,       setScraping]          = useState(false);
  const [metaTotal,      setMetaTotal]         = useState(null);
  const [metaLastScraped, setMetaLastScraped]  = useState(null);
  const [selectedCountry, setSelectedCountry]  = useState("all");
  const [minValue,       setMinValue]          = useState(0);
  const [selectedSector, setSelectedSector]    = useState("all");
  const [viewMode,       setViewMode]          = useState("table"); // "table" | "pipeline"
  const [dealSource,     setDealSource]        = useState("all");   // "all" | "defense" | "fund" — filters the table
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const fetchRecent = async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/ma-activities`, { params: { limit: 200, offset: 0, days: 0 } });
      setActivities(res.data);
    } catch {
      if (!silent) setError("Failed to load M&A deals.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const fetchHist = async () => {
    setHistLoading(true);
    try {
      const res = await axios.get(`${API}/ma-activities/historical`, { params: { limit: 500, offset: 0 } });
      setHistorical(res.data);
    } catch { /* silent */ } finally {
      setHistLoading(false);
    }
  };

  const fetchMeta = async () => {
    try {
      const res = await axios.get(`${API}/ma-activities/meta`);
      setMetaTotal(res.data.total);
      setMetaLastScraped(res.data.last_scraped_at);
    } catch { /* silent */ }
  };

  const handleRefresh = async () => {
    if (!token || scraping) return;
    setScraping(true);
    try {
      await axios.post(`${API}/ma-activities/scrape`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 60000,
      });
    } catch { /* silent */ } finally {
      await fetchRecent();
      await fetchMeta();
      setScraping(false);
    }
  };

  useEffect(() => {
    fetchRecent(); fetchHist(); fetchMeta();
    axios.get(`${API}/defense-players`).then(r => setPlayers(r.data)).catch(() => {});
  }, []);

  // Auto-refresh: pull newly-scraped deals on an interval + when the tab is refocused.
  // Each new deal flows straight into the spotlight and as a new row in the table.
  useEffect(() => {
    const refresh = () => { fetchRecent({ silent: true }); fetchHist(); fetchMeta(); };
    const timer = setInterval(refresh, AUTO_REFRESH_MS);
    const onVisible = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  // Merge + deduplicate recent and historical.
  // Dedup by id first; also dedup by (acquirer_first_word, target_first_word) to catch
  // near-duplicate scraper entries like "Bombardier" vs "Bombardier C Series".
  const allDeals = useMemo(() => {
    const seenId  = new Set();
    const seenKey = new Set();
    return [...activities, ...historical].filter(a => {
      // Drop scraper artifacts before dedup so they don't consume a seen-key slot
      if (!isValidCompanyName(a.acquirer) || !isValidCompanyName(a.target)) return false;
      // Drop state procurement (e.g. "Italy buys six A330 MRTT tankers") — not real M&A
      if (isStateOrProcurement(a)) return false;
      if (seenId.has(a.id)) return false;
      const normKey = `${(a.acquirer||'').toLowerCase().trim().split(/\s+/)[0]}|${(a.target||'').toLowerCase().trim().split(/\s+/)[0]}`;
      if (seenKey.has(normKey)) return false;
      seenId.add(a.id);
      seenKey.add(normKey);
      return true;
    });
  }, [activities, historical]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const raw = {};
    for (const a of allDeals) raw[a.deal_type] = (raw[a.deal_type] || 0) + 1;
    const fundingRounds = (raw.strategic_investment || 0) + (raw.minority_stake || 0) + (raw.funding_round || 0) + (raw.investment || 0);
    return {
      all:                  allDeals.length,
      acquisitions:         (raw.acquisition || 0) + (raw.asset_acquisition || 0),
      mergers:              raw.merger || 0,
      investments:          fundingRounds,
      jv:                   raw.joint_venture || 0,
    };
  }, [allDeals]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("desc"); }
  };

  // Apply filters + sort
  const filteredDeals = useMemo(() => {
    let list = allDeals;
    if (dealTypeTab !== "all") {
      const tabDef = DEAL_TYPE_TABS.find(t => t.value === dealTypeTab);
      if (tabDef?.types) list = list.filter(a => tabDef.types.includes(a.deal_type));
    }
    if (selectedStatus !== "all") list = list.filter(a => a.status === selectedStatus);
    if (selectedYear !== "all") list = list.filter(a => String(new Date(a.announced_date).getFullYear()) === selectedYear);
    if (selectedCountry !== "all") {
      list = list.filter(a =>
        a.acquirer_country === selectedCountry || a.target_country === selectedCountry
      );
    }
    if (minValue > 0) {
      list = list.filter(a => (a.is_disclosed ?? true) && (a.deal_value || 0) >= minValue);
    }
    if (selectedSector !== "all") {
      list = list.filter(a => a.sector === selectedSector);
    }
    if (dealSource === "defense") list = list.filter(a => !isFundAcquirer(a.acquirer));
    if (dealSource === "fund")    list = list.filter(a => isFundAcquirer(a.acquirer));
    if (searchTerm) {
      const t = searchTerm.toLowerCase();
      list = list.filter(a =>
        a.acquirer.toLowerCase().includes(t) ||
        a.target.toLowerCase().includes(t) ||
        (a.description || "").toLowerCase().includes(t)
      );
    }
    return [...list].sort((a, b) => {
      const va = sortField === "deal_value" ? (a.deal_value || 0) : new Date(a.announced_date).getTime();
      const vb = sortField === "deal_value" ? (b.deal_value || 0) : new Date(b.announced_date).getTime();
      return sortDir === "asc" ? va - vb : vb - va;
    });
  }, [allDeals, dealTypeTab, selectedStatus, selectedYear, searchTerm, sortField, sortDir, selectedCountry, minValue, selectedSector, dealSource]);

  // Counts for the Defense/Fund toggle (drives the table). Computed over all deals.
  const sourceCounts = useMemo(() => ({
    all:     allDeals.length,
    defense: allDeals.filter(a => !isFundAcquirer(a.acquirer)).length,
    fund:    allDeals.filter(a => isFundAcquirer(a.acquirer)).length,
  }), [allDeals]);

  // "Data as of" badge — max announced_date across all loaded deals
  const dataAsOf = useMemo(() => {
    if (allDeals.length === 0) return null;
    const max = Math.max(...allDeals.map(a => new Date(a.announced_date).getTime()));
    if (!isFinite(max)) return null;
    const d = new Date(max);
    return `Data as of ${d.toLocaleString("en-US", { month: "short", year: "numeric" })}`;
  }, [allDeals]);

  // Reset page on filter change
  useEffect(() => setPage(0), [dealTypeTab, selectedStatus, selectedYear, searchTerm, selectedCountry, sortField, sortDir, minValue, selectedSector, dealSource]);

  const pageDeals  = filteredDeals.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(filteredDeals.length / PAGE_SIZE);
  const rangeStart = filteredDeals.length === 0 ? 0 : page * PAGE_SIZE + 1;
  const rangeEnd   = Math.min((page + 1) * PAGE_SIZE, filteredDeals.length);

  const totalValue = filteredDeals.filter(a => a.is_disclosed ?? true).reduce((s, a) => s + (a.deal_value || 0), 0);
  const activeFilterCount = [selectedStatus !== "all", selectedYear !== "all", searchTerm.length > 0, selectedCountry !== "all", minValue > 0, selectedSector !== "all", dealSource !== "all"].filter(Boolean).length;

  // Quarterly chart — uses the same tab filter as the deal list, but ignores
  // the sidebar filters (status/year/country/value) so the chart always shows
  // the full shape of the tab's deal type over time.
  const chartDeals = useMemo(() => {
    if (dealTypeTab === "all") return allDeals;
    const tabDef = DEAL_TYPE_TABS.find(t => t.value === dealTypeTab);
    return tabDef?.types ? allDeals.filter(a => tabDef.types.includes(a.deal_type)) : allDeals;
  }, [allDeals, dealTypeTab]);

  const quarterlyData = useMemo(() => {
    const map = {};
    chartDeals.forEach(a => {
      const d = new Date(a.announced_date);
      const q = `Q${Math.ceil((d.getMonth() + 1) / 3)} ${d.getFullYear()}`;
      if (!map[q]) map[q] = { quarter: q, count: 0, value: 0, ts: d.getTime() };
      map[q].count += 1;
      map[q].value += a.deal_value || 0;
    });
    return Object.values(map).sort((a, b) => a.ts - b.ts).slice(-8);
  }, [chartDeals]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full" />
      </div>
    );
  }

  return (
    <div data-testid="ma-activity-page" className="space-y-5 animate-fade-in">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 tracking-tight">M&amp;A Activity</h1>
          <p className="text-slate-500 text-sm mt-1">
            Mergers, acquisitions &amp; strategic investments
            {metaTotal != null && (
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 font-mono text-slate-700 font-semibold inline-flex items-center gap-1 cursor-default">
                    {metaTotal} deals indexed
                    <Info className="w-3 h-3 text-slate-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs leading-relaxed">
                  Global count of all unique deals in the database. A deal may appear in multiple tabs
                  (e.g. an investment also counted under Investments &amp; Funding).
                  Tab badges count deals of that type.
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {metaLastScraped && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {format(new Date(metaLastScraped), "MMM d, HH:mm")}
            </span>
          )}
          {token && (
            <button
              onClick={handleRefresh}
              disabled={scraping}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scraping ? "animate-spin" : ""}`} />
              {scraping ? "Scraping…" : "Refresh"}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" /><span>{error}</span>
          <button onClick={fetchRecent} className="ml-auto text-xs font-medium underline">Retry</button>
        </div>
      )}

      {/* ── Recent Deals Spotlight ── */}
      {!loading && activities.length > 0 && (
        <RecentDealsSpotlight
          activities={activities.filter(a =>
            !isStateOrProcurement(a) &&
            isValidCompanyName(a.acquirer) &&
            isValidCompanyName(a.target)
          )}
          sourceFilter={dealSource}
          onSourceFilter={setDealSource}
          sourceCounts={sourceCounts}
        />
      )}

      {/* ── Deal-type tabs ── */}
      <div className="border-b border-slate-200 flex items-center overflow-x-auto" data-testid="deal-type-tabs">
        {DEAL_TYPE_TABS.map(t => (
          <button
            key={t.value}
            onClick={() => setDealTypeTab(t.value)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all -mb-px ${
              dealTypeTab === t.value
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            {t.label}
            <span className={`ml-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
              dealTypeTab === t.value ? "bg-slate-200 text-slate-900" : "bg-slate-100 text-slate-500"
            }`}>
              {t.value === "jv"
                ? JV_EU_PROGRAMS_FALLBACK.length + allDeals.filter(a => a.deal_type === "joint_venture").length
                : (tabCounts[t.value] || 0)}
            </span>
          </button>
        ))}
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" data-testid="kpi-strip">
        {[
            { label: "TOTAL DEALS", value: filteredDeals.length, sub: DEAL_TYPE_TABS.find(t => t.value === dealTypeTab)?.label, color: "text-slate-900", testid: "kpi-total-deals" },
          { label: "TOTAL VALUE",  value: formatValue(totalValue), sub: "Disclosed only",       color: "text-slate-900",  testid: "kpi-total-value" },
          { label: "IN PROGRESS",  value: filteredDeals.filter(a => ["announced","pending","under_review"].includes(a.status)).length, sub: "Announced + Pending", color: "text-slate-900",  testid: "kpi-in-progress" },
          { label: "CLOSED",       value: filteredDeals.filter(a => ["completed","active"].includes(a.status)).length,                sub: "Completed + Active", color: "text-slate-900", testid: "kpi-closed" },
        ].map(s => (
          <Card key={s.label} className="bg-white border-slate-200 shadow-sm" data-testid={s.testid}>
            <CardContent className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
              <p className={`text-2xl font-mono font-bold mt-1.5 ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Chart ── */}
      {quarterlyData.length > 1 && (
        <Card className="bg-white border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">Quarterly Activity</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {DEAL_TYPE_TABS.find(t => t.value === dealTypeTab)?.label ?? "All deals"}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="inline-block w-3 h-2.5 rounded-sm bg-slate-400" /> Deal count</span>
                <span className="flex items-center gap-1"><span className="inline-block w-6 border-t-2 border-dashed border-slate-400" /> Value ($B)</span>
                <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">Last 8 quarters</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={110}>
              <ComposedChart data={quarterlyData} margin={{ top: 4, right: 36, left: 0, bottom: 0 }}>
                <XAxis dataKey="quarter" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  yAxisId="count"
                  allowDecimals={false}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false} tickLine={false} width={22}
                />
                <YAxis
                  yAxisId="value"
                  orientation="right"
                  tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}B` : v > 0 ? `$${v}M` : ""}
                  tick={{ fill: "#94A3B8", fontSize: 10 }}
                  axisLine={false} tickLine={false} width={36}
                />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow text-xs">
                        <p className="font-semibold text-slate-700 mb-1">{d.quarter}</p>
                        <p className="text-slate-900 font-mono">{d.count} deal{d.count !== 1 ? "s" : ""}</p>
                        {d.value > 0 && <p className="text-slate-600 font-mono">{d.value >= 1000 ? `$${(d.value/1000).toFixed(1)}B` : `$${d.value}M`} disclosed</p>}
                      </div>
                    );
                  }
                  return null;
                }} />
                <Bar yAxisId="count" dataKey="count" radius={[3, 3, 0, 0]}>
                  {quarterlyData.map((_, i) => (
                    <Cell key={i} fill={i === quarterlyData.length - 1 ? "#1e40af" : "#cbd5e1"} />
                  ))}
                </Bar>
                <Line
                  yAxisId="value"
                  type="monotone"
                  dataKey="value"
                  stroke="#94A3B8"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  dot={false}
                  activeDot={{ r: 3, fill: "#1e40af" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* Left sidebar — filters */}
        <div className="w-full lg:w-52 shrink-0 space-y-3 lg:sticky lg:top-4">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <button
                className="flex items-center gap-1.5 lg:cursor-default"
                onClick={() => setMobileFiltersOpen(o => !o)}
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" /> Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">{activeFilterCount}</span>
                  )}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 lg:hidden transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
              </button>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setSelectedStatus("all"); setSelectedYear("all"); setSearchTerm(""); setSelectedCountry("all"); setMinValue(0); setSelectedSector("all"); setDealSource("all"); }}
                  className="text-[11px] text-rose-500 hover:text-rose-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
            <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block space-y-4`}>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                placeholder="Search companies…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                data-testid="search-ma"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Status</p>
              <div className="space-y-0.5">
                {STATUS_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setSelectedStatus(o.value)}
                    data-testid={o.value === "all" ? "status-filter" : undefined}
                    className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                      selectedStatus === o.value
                        ? "bg-slate-100 text-slate-900 font-semibold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Year</p>
              <div className="flex flex-wrap gap-1">
                {YEAR_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setSelectedYear(o.value)}
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                      selectedYear === o.value
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {o.value === "all" ? "All" : o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Min deal value */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Min Value
              </p>
              <div className="flex flex-wrap gap-1">
                {MIN_VALUE_OPTIONS.map(o => (
                  <button
                    key={o.value}
                    onClick={() => setMinValue(o.value)}
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                      minValue === o.value
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Sector</p>
              <select
                value={selectedSector}
                onChange={e => setSelectedSector(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {SECTOR_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Country */}
            <CountryFilter
              allDeals={allDeals}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
            </div>{/* end collapsible filters */}
          </div>
        </div>

        {/* Right — content */}
        <div className="flex-1 min-w-0 space-y-3">

          {/* ── Investment consolidated view ── */}
          {dealTypeTab === "investments" && (<>
            {dataAsOf && (
              <div className="flex justify-end">
                <span className="text-[10px] text-slate-400 font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{dataAsOf}</span>
              </div>
            )}
            <InvestmentConsolidatedView deals={filteredDeals} onOpenProfile={setProfileName} onSelectDeal={setSelectedDeal} />
          </>)}

          {/* ── JV Programs table ── */}
          {dealTypeTab === "jv" && <JVProgramsView activities={allDeals} />}

          {/* ── Normal deal table (Acquisitions, Mergers) ── */}
          {!["investments", "jv"].includes(dealTypeTab) && <>

          {/* Data as of badge */}
          {dataAsOf && (
            <div className="flex justify-end">
              <span className="text-[10px] text-slate-400 font-mono bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{dataAsOf}</span>
            </div>
          )}

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {searchTerm && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm("")} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              {selectedStatus !== "all" && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {STATUS_OPTIONS.find(o => o.value === selectedStatus)?.label ?? selectedStatus}
                  <button onClick={() => setSelectedStatus("all")} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              {selectedYear !== "all" && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {selectedYear}
                  <button onClick={() => setSelectedYear("all")} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              {minValue > 0 && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {MIN_VALUE_OPTIONS.find(o => o.value === minValue)?.label ?? `≥$${minValue}M`}
                  <button onClick={() => setMinValue(0)} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              {selectedSector !== "all" && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {SECTOR_OPTIONS.find(o => o.value === selectedSector)?.label ?? selectedSector}
                  <button onClick={() => setSelectedSector("all")} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              {selectedCountry !== "all" && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  Country: {selectedCountry.toUpperCase()}
                  <button onClick={() => setSelectedCountry("all")} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              {dealSource !== "all" && (
                <span className="text-xs bg-blue-50 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  {SPOTLIGHT_TABS.find(o => o.value === dealSource)?.label ?? dealSource}
                  <button onClick={() => setDealSource("all")} className="hover:text-blue-900 font-bold leading-none">×</button>
                </span>
              )}
              <button
                onClick={() => { setSelectedStatus("all"); setSelectedYear("all"); setSearchTerm(""); setSelectedCountry("all"); setMinValue(0); setSelectedSector("all"); }}
                className="text-xs text-slate-500 hover:text-slate-700 underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {viewMode === "table" && totalPages > 1 && (
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                  className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              <span className="font-mono text-slate-600">
                {viewMode === "table"
                  ? <>{rangeStart}–{rangeEnd} <span className="text-slate-400">of</span> <span className="font-semibold text-slate-700">{filteredDeals.length}</span> results</>
                  : <><span className="font-semibold text-slate-700">{filteredDeals.length}</span> deals</>
                }
              </span>
              {viewMode === "table" && totalPages > 1 && (
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                  className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* View mode toggle */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 gap-0.5">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === "table" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("pipeline")}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${viewMode === "pipeline" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Pipeline
                </button>
              </div>
              <button
                onClick={() => exportCSV(filteredDeals)}
                disabled={filteredDeals.length === 0}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors disabled:opacity-40"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
            </div>
          </div>

          {/* Table or Pipeline */}
          {viewMode === "pipeline" ? (
            filteredDeals.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No deals match the selected filters.</div>
            ) : (
              <DealPipelineView deals={filteredDeals} onSelectDeal={setSelectedDeal} />
            )
          ) : (
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden" data-testid="ma-activities-list">
            {(histLoading && allDeals.length === 0) ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-spin w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full" />
              </div>
            ) : filteredDeals.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No deals match the selected filters.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 w-10">#</th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Acquirer / Investor</th>
                      <th className="px-1 py-2.5 w-4" />
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Target / Portfolio Co.</th>
                      <th
                        onClick={() => handleSort("deal_value")}
                        className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      >
                        Value {sortField === "deal_value" ? (sortDir === "asc" ? "↑" : "↓") : <span className="text-slate-300">↕</span>}
                      </th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Reg.</th>
                      <th
                        onClick={() => handleSort("announced_date")}
                        className="px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 cursor-pointer hover:text-slate-800 select-none whitespace-nowrap"
                      >
                        Date {sortField === "announced_date" ? (sortDir === "asc" ? "↑" : "↓") : <span className="text-slate-300">↕</span>}
                      </th>
                      <th className="px-3 py-2.5 w-8" />
                      <th className="px-2 py-2.5 w-6" />
                    </tr>
                  </thead>
                  <tbody>
                    {pageDeals.map((activity, i) => (
                      <TableRow
                        key={activity.id}
                        activity={activity}
                        index={page * PAGE_SIZE + i}
                        onOpenProfile={setProfileName}
                        onSelectDeal={setSelectedDeal}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          )}

          {/* Bottom pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <span className="text-xs text-slate-500 font-mono">Page {page + 1} / {totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          </> /* end normal deal table */}

        </div>
      </div>

      {/* Company profile slide-over */}
      <CompanyProfileSheet
        name={profileName}
        onClose={() => setProfileName(null)}
      />

      {/* Deal detail drawer */}
      <DealDetailDrawer
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onOpenProfile={(name) => { setSelectedDeal(null); setProfileName(name); }}
      />
    </div>
  );
}
