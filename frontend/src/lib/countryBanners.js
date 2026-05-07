// Static mapping of country names to Wikipedia Commons banner images.
// Images chosen to represent the country's military (parades, ceremonies, equipment).
// Special:FilePath redirects to the actual CDN URL transparently in <img> tags.
const WP = "https://upload.wikimedia.org/wikipedia/commons/";

export const COUNTRY_BANNERS = {
  "France":
    WP + "thumb/b/b6/Bastille_Day_2013_Paris_-_Bastille_Day_Parade_002.jpg/1280px-Bastille_Day_2013_Paris_-_Bastille_Day_Parade_002.jpg",
  "United States":
    WP + "thumb/9/97/US_Navy_100712-N-6138K-001_Capt._Chris_Bolt%2C_right%2C_commanding_officer_of_USS_George_H.W._Bush_%28CVN_77%29%2C_stands_at_parade_rest_during_the_change_of_command_cer.jpg/1280px-thumbnail.jpg",
  "United Kingdom":
    WP + "thumb/6/67/Trooping_the_Colour%2C_15_June_2013.jpg/1280px-Trooping_the_Colour%2C_15_June_2013.jpg",
  "Germany":
    WP + "thumb/0/08/Bundeswehr_honour_guard_2013.jpg/1280px-Bundeswehr_honour_guard_2013.jpg",
  "Russia":
    WP + "thumb/3/3b/2014_Moscow_Victory_Day_Parade_01.jpg/1280px-2014_Moscow_Victory_Day_Parade_01.jpg",
  "China":
    WP + "thumb/5/52/2015_China_Victory_Day_Parade_-_Equipment_formations_25.jpg/1280px-2015_China_Victory_Day_Parade_-_Equipment_formations_25.jpg",
  "India":
    WP + "thumb/a/a9/Republic_Day_Parade_-_2008.jpg/1280px-Republic_Day_Parade_-_2008.jpg",
  "Japan":
    WP + "thumb/7/70/GSDF_parade_201410.jpg/1280px-GSDF_parade_201410.jpg",
  "South Korea":
    WP + "thumb/c/c3/Republic_of_Korea_Armed_Forces_Day_parade_2013.jpg/1280px-Republic_of_Korea_Armed_Forces_Day_parade_2013.jpg",
  "Australia":
    WP + "thumb/5/5c/Australian_Defence_Force_personnel_march_in_the_2013_ANZAC_Day_parade_in_Sydney.jpg/1280px-Australian_Defence_Force_personnel_march_in_the_2013_ANZAC_Day_parade_in_Sydney.jpg",
  "Italy":
    WP + "thumb/3/35/Festa_della_Repubblica_-_Folgore_in_parata.jpg/1280px-Festa_della_Repubblica_-_Folgore_in_parata.jpg",
  "Israel":
    WP + "thumb/7/71/IDF_Armored_Corps_Merkava_4_tanks_parade_in_Latrun_2012.jpg/1280px-IDF_Armored_Corps_Merkava_4_tanks_parade_in_Latrun_2012.jpg",
  "Turkey":
    WP + "thumb/0/04/Turkish_Armed_Forces_parade.jpg/1280px-Turkish_Armed_Forces_parade.jpg",
  "Poland":
    WP + "thumb/9/92/Wojsko_polskie_defilada_2018.jpg/1280px-Wojsko_polskie_defilada_2018.jpg",
  "Ukraine":
    WP + "thumb/1/1b/Kyiv_independence_2018_parade_2.jpg/1280px-Kyiv_independence_2018_parade_2.jpg",
  "Sweden":
    WP + "thumb/3/30/Swedish_Armed_Forces_review_2019.jpg/1280px-Swedish_Armed_Forces_review_2019.jpg",
  "Norway":
    WP + "thumb/0/0c/Norwegian_Armed_Forces_17_may_parade.jpg/1280px-Norwegian_Armed_Forces_17_may_parade.jpg",
  "Greece":
    WP + "thumb/3/33/Greek_Independence_Day_parade_Athens.jpg/1280px-Greek_Independence_Day_parade_Athens.jpg",
  "Spain":
    WP + "thumb/7/72/Desfile_de_las_Fuerzas_Armadas_2016.jpg/1280px-Desfile_de_las_Fuerzas_Armadas_2016.jpg",
  "Netherlands":
    WP + "thumb/5/5e/Prinsjesdag_2012_-_Militaire_erewacht.jpg/1280px-Prinsjesdag_2012_-_Militaire_erewacht.jpg",
  "Saudi Arabia":
    WP + "thumb/c/ce/Saudi_Arabia_National_Guard_parade.jpg/1280px-Saudi_Arabia_National_Guard_parade.jpg",
  "Brazil":
    WP + "thumb/5/50/Desfile_7_de_Setembro_Bras%C3%ADlia_2014.jpg/1280px-Desfile_7_de_Setembro_Bras%C3%ADlia_2014.jpg",
  "Canada":
    WP + "thumb/f/fa/Canadian_Forces_Day_parade_Ottawa_2018.jpg/1280px-Canadian_Forces_Day_parade_Ottawa_2018.jpg",
  "Taiwan":
    WP + "thumb/5/5b/ROC_National_Day_Military_Parade_2022.jpg/1280px-ROC_National_Day_Military_Parade_2022.jpg",
};

export function getCountryBanner(countryName) {
  return COUNTRY_BANNERS[countryName] ?? null;
}
