// Static mapping of country names to Wikimedia Commons CDN images.
// Direct upload.wikimedia.org paths — no redirect needed, works reliably in <img>.
// Hash path: md5(filename)[0] / md5(filename)[0:2] / filename (URL-encoded).
const WP = "https://upload.wikimedia.org/wikipedia/commons/";

export const COUNTRY_BANNERS = {
  "France":
    WP + "b/ba/Bastille_Day_2008_military_parade_in_Paris_01.jpg",
  "United States":
    WP + "e/e2/110729-N-YM440-001_Joint_Base_Lewis-McChord_soldiers_march_in_the_Armed_Forces_Parade.jpg",
  "United Kingdom":
    WP + "5/50/Trooping_Colour_2012_MOD_45154720.jpg",
  "Germany":
    WP + "2/2c/Gro%C3%9Fer_Zapfenstreich_Bundeswehr.jpg",
  "Russia":
    WP + "c/c2/2014_Moscow_Victory_Day_Parade_01.jpg",
  "China":
    WP + "2/23/2015_China_Victory_Day_Parade_-_Aerial_formations_03.jpg",
  "India":
    WP + "f/fd/2013_Republic_Day_Parade_-_India.jpg",
  "Japan":
    WP + "0/09/JGSDF_parade_2014.jpg",
  "South Korea":
    WP + "3/37/Daehanminguk_Gukgun_ui_nal_gunsa_haengsa.jpg",
  "Australia":
    WP + "1/10/ANZAC_Day_March_Sydney_2013.jpg",
  "Italy":
    WP + "6/65/2_Giugno_2014%2C_Festa_della_Repubblica_Italiana.jpg",
  "Israel":
    WP + "0/05/IDF_Merkava_MK4_Tanks.jpg",
  "Turkey":
    WP + "b/be/Turkish_Land_Forces_Victory_Day_Parade_2012.jpg",
  "Poland":
    WP + "a/af/Military_Parade_Warsaw_15_August_2018.jpg",
  "Ukraine":
    WP + "a/a6/Independence_Day_Military_Parade_in_Kyiv_2018_%281%29.jpg",
  "Sweden":
    WP + "9/97/Hemv%C3%A4rnet_parad.jpg",
  "Norway":
    WP + "f/f6/HM_The_King%27s_Guard_17_May_2014.jpg",
  "Greece":
    WP + "0/03/25th_March_parade_Athens_2013.jpg",
  "Spain":
    WP + "a/a3/Desfile_del_D%C3%ADa_de_la_Fiesta_Nacional_2016.jpg",
  "Netherlands":
    WP + "9/93/Nationale_Militaire_Begraafplaats_Loenen_2010.jpg",
  "Saudi Arabia":
    WP + "f/f5/Saudi_Abrams_tanks.jpg",
  "Brazil":
    WP + "3/36/Desfile_de_7_de_setembro_de_2014_no_Rio_de_Janeiro.jpg",
  "Canada":
    WP + "d/d3/Canada_Day_Ottawa_2012_Military.jpg",
  "Taiwan":
    WP + "b/b4/ROC_Military_National_Day_Parade_2022.jpg",
};

export function getCountryBanner(countryName) {
  return COUNTRY_BANNERS[countryName] ?? null;
}
