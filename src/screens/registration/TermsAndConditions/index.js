import * as React from "react";
import { useTranslate } from '../../../hooks/Translation';

import TermsAndConditionsDE from './TermsAndConditionsDE';
import TermsAndConditionsEN from './TermsAndConditionsEN';
import TermsAndConditionsES from './TermsAndConditionsES';
import TermsAndConditionsPT from './TermsAndConditionsPT';
import TermsAndConditionsFR from './TermsAndConditionsFR';
import TermsAndConditionsRU from './TermsAndConditionsRU';

export default () => {
  const {locale} = useTranslate("registration");
  const language = locale.toUpperCase();
  if( language == 'DE' ) {
    return <TermsAndConditionsDE/>
  } else if( language == 'ES' ) {
    return <TermsAndConditionsES/>
  } else if( language == 'FR' ) {
    return <TermsAndConditionsFR/>
  } else if( language == 'PT' ) {
    return <TermsAndConditionsPT/>
  } else if( language == 'RU' ) {
    return <TermsAndConditionsRU/>
  } else {
    return <TermsAndConditionsEN/>
  }
};
