// Static mapping of country names to Wikipedia Commons banner images.
// Uses Special:FilePath which auto-redirects to the correct CDN URL.
// Filenames verified from Wikipedia Commons article usage.
const WP = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export const COUNTRY_BANNERS = {
  "France":
    WP + "Bastille_Day_2008_military_parade_in_Paris_01.jpg?width=1280",
  "United States":
    WP + "110729-N-YM440-001_Joint_Base_Lewis-McChord_soldiers_march_in_the_Armed_Forces_Parade.jpg?width=1280",
  "United Kingdom":
    WP + "Trooping_Colour_2012_MOD_45154720.jpg?width=1280",
  "Germany":
    WP + "Großer_Zapfenstreich_Bundeswehr.jpg?width=1280",
  "Russia":
    WP + "2014_Moscow_Victory_Day_Parade_01.jpg?width=1280",
  "China":
    WP + "2015_China_Victory_Day_Parade_-_Aerial_formations_03.jpg?width=1280",
  "India":
    WP + "2013_Republic_Day_Parade_-_India.jpg?width=1280",
  "Japan":
    WP + "JGSDF_parade_2014.jpg?width=1280",
  "South Korea":
    WP + "Daehanminguk_Gukgun_ui_nal_gunsa_haengsa.jpg?width=1280",
  "Australia":
    WP + "ANZAC_Day_March_Sydney_2013.jpg?width=1280",
  "Italy":
    WP + "2_Giugno_2014,_Festa_della_Repubblica_Italiana.jpg?width=1280",
  "Israel":
    WP + "IDF_Merkava_MK4_Tanks.jpg?width=1280",
  "Turkey":
    WP + "Turkish_Land_Forces_Victory_Day_Parade_2012.jpg?width=1280",
  "Poland":
    WP + "Military_Parade_Warsaw_15_August_2018.jpg?width=1280",
  "Ukraine":
    WP + "Independence_Day_Military_Parade_in_Kyiv_2018_(1).jpg?width=1280",
  "Sweden":
    WP + "Hemvärnet_parad.jpg?width=1280",
  "Norway":
    WP + "HM_The_King%27s_Guard_17_May_2014.jpg?width=1280",
  "Greece":
    WP + "25th_March_parade_Athens_2013.jpg?width=1280",
  "Spain":
    WP + "Desfile_del_Día_de_la_Fiesta_Nacional_2016.jpg?width=1280",
  "Netherlands":
    WP + "Nationale_Militaire_Begraafplaats_Loenen_2010.jpg?width=1280",
  "Saudi Arabia":
    WP + "Saudi_Abrams_tanks.jpg?width=1280",
  "Brazil":
    WP + "Desfile_de_7_de_setembro_de_2014_no_Rio_de_Janeiro.jpg?width=1280",
  "Canada":
    WP + "Canada_Day_Ottawa_2012_Military.jpg?width=1280",
  "Taiwan":
    WP + "ROC_Military_National_Day_Parade_2022.jpg?width=1280",
};

export function getCountryBanner(countryName) {
  return COUNTRY_BANNERS[countryName] ?? null;
}
