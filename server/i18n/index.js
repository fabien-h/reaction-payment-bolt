import { loadTranslations } from "/imports/plugins/core/core/server/startup/i18n";

import en from "./en.json";
import fr from "./fr.json";

//
// we want all the files in individual
// imports for easier handling by
// automated translation software
//
loadTranslations([en, fr]);
