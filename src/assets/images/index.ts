import logo from './logo.png';
import splash from './splash.png';
import headerCrowdBg from './headerCrowdBg.png';
import blackCrowdBg from './blackCrowdBg.png';
import userWithGrayBg from './userWithGrayBg.png';
import stripeConnect from './stripeConnect.png';
import noAccess from './noAccess.png';
import purpleCrowds from './purpleCrowds.png';

import categoryExtras from './categories/extras.png';
import categoryHospitality from './categories/hospitality.png';
import categoryMusic from './categories/music.png';
import categoryPolitics from './categories/politics.png';
import categoryPR from './categories/pr.png';
import categoryPrivate from './categories/private.png';
import categoryRetail from './categories/retail.png';
import categorySports from './categories/sports.png';
import categoryTV from './categories/tv.png';

const categories: Record<string, any> = {
  Extras: categoryExtras,
  Hospitality: categoryHospitality,
  Music: categoryMusic,
  Politics: categoryPolitics,
  PR: categoryPR,
  Private: categoryPrivate,
  Retail: categoryRetail,
  Sports: categorySports,
  TV: categoryTV,
};

export const IMAGES = {
  logo,
  purpleCrowds,
  splash,
  blackCrowdBg,
  headerCrowdBg,
  userWithGrayBg,
  stripeConnect,
  noAccess,
  categories,
};
