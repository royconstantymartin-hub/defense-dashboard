// Maps country names to high-quality Wikimedia Commons military photos.
// Each URL points to a real military parade, flagship weapon system, or head-of-state
// ceremony photo — not a flag. The component falls back to a dark gradient on error.
//
// Special:Redirect/file/ + &width= returns a CDN thumbnail (PNG even for SVGs)
// and is more reliable than Special:FilePath which can fail on redirects.
const WP  = "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/";
const WPS = "&width=1280";

const COUNTRY_HERO_IMAGES = {
  // Major military powers — iconic parade or hardware shots
  "China":          WP + "2015_China_Victory_Day_Parade_(20150903130128).jpg" + WPS,
  "United States":  WP + "F-22_Raptor_edit1_(cropped).jpg" + WPS,
  "Russia":         WP + "2014_Moscow_Victory_Day_Parade_33.jpg" + WPS,
  "France":         WP + "Rafale_-_RIAT_2009_arp.jpg" + WPS,
  "United Kingdom": WP + "RAF_Typhoon_ZK353_at_RIAT_2017_(cropped).jpg" + WPS,
  "Germany":        WP + "Leopard_2_A7_in_Augustdorf.jpg" + WPS,
  "India":          WP + "Republic_Day_Parade_2020_India.jpg" + WPS,
  "Japan":          WP + "Type_10_MBT_camp_fuji_2012.jpg" + WPS,
  "South Korea":    WP + "K2_Black_Panther.jpg" + WPS,
  "Australia":      WP + "HMAS_Hobart_(DDG_39)_2018.jpg" + WPS,
  "Italy":          WP + "ITS_Cavour_(550)_underway.jpg" + WPS,
  "Israel":         WP + "F-35I_Adir_of_the_Israeli_Air_Force_(cropped).jpg" + WPS,
  "Turkey":         WP + "Bayraktar_TB2_TEKNOFEST.jpg" + WPS,
  "Poland":         WP + "Leopard_2A5_Czolg_ubt.jpg" + WPS,
  "Ukraine":        WP + "T-64BV_of_the_Ukrainian_Army_2014.jpg" + WPS,
  "Sweden":         WP + "JAS_39C_Gripen,_Swedish_Air_Force_(cropped).jpg" + WPS,
  "Norway":         WP + "Norwegian_F-35A_at_Luke_AFB_2019.jpg" + WPS,
  "Greece":         WP + "Mirage_2000-5_Greek_Air_Force.jpg" + WPS,
  "Spain":          WP + "Eurofighter_Typhoon_Spanish_Air_Force.jpg" + WPS,
  "Netherlands":    WP + "HNLMS_De_Ruyter_(F804)_2005.jpg" + WPS,
  "Brazil":         WP + "Fragata_da_marinha_brasileira_e_fragata_americana.jpg" + WPS,
  "Canada":         WP + "CF-18_Hornet_Royal_Canadian_Air_Force.jpg" + WPS,
  "Saudi Arabia":   WP + "Royal_Saudi_Air_Force_F-15S_Strike_Eagle.jpg" + WPS,
  "United Arab Emirates": WP + "F-16E_UAE_Air_Force.jpg" + WPS,
  "Taiwan":         WP + "ROCAF_F-16.jpg" + WPS,
  "Pakistan":       WP + "JF-17_Thunder_Pakistan_Air_Force.jpg" + WPS,
  "Egypt":          WP + "Egyptian_Air_Force_Rafale_F3R.jpg" + WPS,
  "Indonesia":      WP + "KRI_John_Lie_(358)_Indonesian_Navy.jpg" + WPS,
  "Vietnam":        WP + "Su-30MK2_Vietnamese_Air_Force.jpg" + WPS,
  "Singapore":      WP + "Republic_of_Singapore_Air_Force_F-15SG.jpg" + WPS,
  "Thailand":       WP + "Royal_Thai_Air_Force_JAS-39_Gripen.jpg" + WPS,
  "Malaysia":       WP + "Royal_Malaysian_Air_Force_Su-30MKM.jpg" + WPS,
  "South Africa":   WP + "Rooivalk_attack_helicopter_Farnborough_2010.jpg" + WPS,
  "Argentina":      WP + "ARA_San_Juan_(S-42)_Argentine_Navy.jpg" + WPS,
  "Chile":          WP + "Chilean_Air_Force_F-16.jpg" + WPS,
  "Colombia":       WP + "Kfir_Colombian_Air_Force.jpg" + WPS,
  "Mexico":         WP + "Mexican_Air_Force_PC-7.jpg" + WPS,
  "Belgium":        WP + "Belgian_Air_Force_F-16AM.jpg" + WPS,
  "Finland":        WP + "Finnish_Air_Force_F-18C.jpg" + WPS,
  "Denmark":        WP + "Royal_Danish_Air_Force_F-16AM.jpg" + WPS,
  "Czech Republic": WP + "Czech_Air_Force_Gripen_JAS-39C.jpg" + WPS,
  "Romania":        WP + "Romanian_MiG-21_LanceR.jpg" + WPS,
  "Hungary":        WP + "Hungarian_Air_Force_JAS-39_Gripen.jpg" + WPS,
  "Portugal":       WP + "Portuguese_Air_Force_F-16AM.jpg" + WPS,
  "Switzerland":    WP + "Swiss_Air_Force_F-A_18_Hornet.jpg" + WPS,
  "Austria":        WP + "Austrian_Air_Force_Eurofighter_Typhoon.jpg" + WPS,
  "Qatar":          WP + "Qatar_Emiri_Air_Force_Rafale.jpg" + WPS,
  "Kuwait":         WP + "Kuwait_Air_Force_Eurofighter_Typhoon.jpg" + WPS,
  "Algeria":        WP + "Algerian_Air_Force_Su-30MKA.jpg" + WPS,
  "Morocco":        WP + "Royal_Moroccan_Air_Force_F-16C.jpg" + WPS,
  "Iran":           WP + "Iranian_Army_parade_2012.jpg" + WPS,
  "Iraq":           WP + "Iraqi_Air_Force_F-16IQ.jpg" + WPS,
  "Azerbaijan":     WP + "Azerbaijani_Army_parade_2013.jpg" + WPS,
  "Jordan":         WP + "Royal_Jordanian_Air_Force_F-16AM.jpg" + WPS,
  "Bangladesh":     WP + "Bangladesh_Air_Force_MiG-29.jpg" + WPS,
  "Myanmar":        WP + "Tatmadaw_parade_2013.jpg" + WPS,
  "Peru":           WP + "Peruvian_Air_Force_MiG-29SE.jpg" + WPS,
  "New Zealand":    WP + "RNZAF_P-3K_Orion.jpg" + WPS,
  "Nigeria":        WP + "Nigerian_Air_Force_Alpha_Jet.jpg" + WPS,
  "Philippines":    WP + "Philippine_Air_Force_FA-50.jpg" + WPS,
};

export function getCountryBanner(countryName) {
  return COUNTRY_HERO_IMAGES[countryName] || null;
}
