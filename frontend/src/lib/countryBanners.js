// Wikimedia Commons Special:FilePath — stable redirect regardless of hash path.
// Format: https://commons.wikimedia.org/wiki/Special:FilePath/<filename>
const WP = "https://commons.wikimedia.org/wiki/Special:FilePath/";

export const COUNTRY_BANNERS = {
  "France":
    WP + "Bastille_Day_2008_military_parade_in_Paris_01.jpg",
  "United States":
    WP + "Joint_Base_Lewis-McChord_soldiers_march_in_the_Armed_Forces_Parade.jpg",
  "United Kingdom":
    WP + "Trooping_Colour_2012_MOD_45154720.jpg",
  "Germany":
    WP + "Gro%C3%9Fer_Zapfenstreich_Bundeswehr.jpg",
  "Russia":
    WP + "2014_Moscow_Victory_Day_Parade_01.jpg",
  "China":
    WP + "2015_China_Victory_Day_Parade_-_Aerial_formations_03.jpg",
  "India":
    WP + "2013_Republic_Day_Parade_-_India.jpg",
  "Japan":
    WP + "JGSDF_parade_2014.jpg",
  "South Korea":
    WP + "Daehanminguk_Gukgun_ui_nal_gunsa_haengsa.jpg",
  "Australia":
    WP + "ANZAC_Day_March_Sydney_2013.jpg",
  "Italy":
    WP + "2_Giugno_2014%2C_Festa_della_Repubblica_Italiana.jpg",
  "Israel":
    WP + "IDF_Merkava_MK4_Tanks.jpg",
  "Turkey":
    WP + "Turkish_Land_Forces_Victory_Day_Parade_2012.jpg",
  "Poland":
    WP + "Military_Parade_Warsaw_15_August_2018.jpg",
  "Ukraine":
    WP + "Independence_Day_Military_Parade_in_Kyiv_2018_(1).jpg",
  "Sweden":
    WP + "Hemv%C3%A4rnet_parad.jpg",
  "Norway":
    WP + "HM_The_King%27s_Guard_17_May_2014.jpg",
  "Greece":
    WP + "25th_March_parade_Athens_2013.jpg",
  "Spain":
    WP + "Desfile_del_D%C3%ADa_de_la_Fiesta_Nacional_2016.jpg",
  "Netherlands":
    WP + "Nationale_Militaire_Begraafplaats_Loenen_2010.jpg",
  "Saudi Arabia":
    WP + "Saudi_Abrams_tanks.jpg",
  "Brazil":
    WP + "Desfile_de_7_de_setembro_de_2014_no_Rio_de_Janeiro.jpg",
  "Canada":
    WP + "Canada_Day_Ottawa_2012_Military.jpg",
  "Taiwan":
    WP + "ROC_Military_National_Day_Parade_2022.jpg",
  "Pakistan":
    WP + "Pakistan_Day_Parade_2015.jpg",
  "Egypt":
    WP + "Military_parade_in_Egypt.jpg",
  "Iran":
    WP + "Islamic_Republic_of_Iran_Army_Day_Parade_2009.jpg",
};

export function getCountryBanner(countryName) {
  return COUNTRY_BANNERS[countryName] ?? null;
}
