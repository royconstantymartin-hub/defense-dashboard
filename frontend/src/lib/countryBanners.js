// Maps country names to Unsplash source photos symbolizing each country's military.
// Uses the Unsplash Source API (no key required) — query terms aim for iconic hardware:
// France → Rafale, Sweden → Gripen, Germany → Leopard, Israel → F-35I, etc.
// Falls back to a dark gradient in the UI if the image fails to load.
const U = (q) =>
  `https://source.unsplash.com/featured/1280x400/?${encodeURIComponent(q)}`;

const COUNTRY_HERO_IMAGES = {
  // Major powers — iconic hardware or parade shots
  "United States":  U("f-22 raptor military aircraft fighter"),
  "China":          U("china military parade pla soldiers"),
  "Russia":         U("russia military parade armor soldiers"),
  "France":         U("rafale fighter jet military aircraft"),
  "United Kingdom": U("typhoon eurofighter military aircraft uk"),
  "Germany":        U("leopard tank military army germany"),
  "India":          U("india military parade republic day"),
  "Japan":          U("japan military defense aircraft"),
  "South Korea":    U("k2 tank south korea military"),
  "Australia":      U("royal australian navy warship military"),
  "Italy":          U("italian military aircraft eurofighter"),
  "Israel":         U("military aircraft fighter jet desert"),
  "Turkey":         U("military drone aircraft turkey defense"),
  "Poland":         U("military tank armor poland nato"),
  "Ukraine":        U("military tank ukraine armor army"),
  "Sweden":         U("gripen fighter jet aircraft military"),
  "Norway":         U("f-35 fighter jet military norway"),
  "Greece":         U("military aircraft fighter jet mediterranean"),
  "Spain":          U("eurofighter typhoon military spain aircraft"),
  "Netherlands":    U("royal netherlands navy frigate warship"),
  "Brazil":         U("brazil navy frigate warship military"),
  "Canada":         U("cf-18 hornet canadian military aircraft"),
  "Saudi Arabia":   U("military fighter jet aircraft saudi arabia"),
  "United Arab Emirates": U("f-16 military aircraft fighter desert"),
  "Taiwan":         U("military aircraft fighter jet taiwan"),
  "Pakistan":       U("military aircraft jet fighter pakistan"),
  "Egypt":          U("military aircraft egypt fighter jet"),
  "Indonesia":      U("indonesia navy warship frigate"),
  "Vietnam":        U("military aircraft su-30 fighter jet"),
  "Singapore":      U("singapore air force military aircraft"),
  "Thailand":       U("military aircraft jet fighter thailand"),
  "Malaysia":       U("malaysia air force military aircraft"),
  "South Africa":   U("rooivalk helicopter military africa"),
  "Argentina":      U("navy submarine military argentina"),
  "Chile":          U("military aircraft f-16 chile"),
  "Colombia":       U("military aircraft kfir colombia"),
  "Mexico":         U("mexico air force military aircraft"),
  "Belgium":        U("military aircraft f-16 belgium fighter"),
  "Finland":        U("military aircraft fighter finland"),
  "Denmark":        U("military aircraft f-16 denmark fighter"),
  "Czech Republic": U("gripen fighter aircraft czech republic"),
  "Romania":        U("military aircraft romania fighter"),
  "Hungary":        U("gripen fighter jet military hungary"),
  "Portugal":       U("military aircraft f-16 portugal"),
  "Switzerland":    U("swiss military aircraft fighter jet"),
  "Austria":        U("eurofighter military austria aircraft"),
  "Qatar":          U("rafale fighter jet military qatar"),
  "Kuwait":         U("military aircraft fighter jet kuwait"),
  "Algeria":        U("military aircraft su-30 algeria"),
  "Morocco":        U("military aircraft f-16 morocco"),
  "Iran":           U("iran military parade army soldiers"),
  "Iraq":           U("military aircraft f-16 iraq"),
  "Azerbaijan":     U("military drone army azerbaijani"),
  "Jordan":         U("military aircraft f-16 jordan"),
  "Bangladesh":     U("military aircraft bangladesh air force"),
  "Myanmar":        U("myanmar military parade army"),
  "Peru":           U("military aircraft peru fighter"),
  "New Zealand":    U("new zealand military navy patrol"),
  "Nigeria":        U("nigeria military aircraft jet"),
  "Philippines":    U("philippines military aircraft fighter"),
};

export function getCountryBanner(countryName) {
  return COUNTRY_HERO_IMAGES[countryName] || null;
}
