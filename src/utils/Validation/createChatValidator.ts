import { Chat } from '../../models';
import isEmpty from './isEmpty';
import * as Validator from 'validator';

interface IForm {
  name?: string;
  status?: string;
  storeMessages?: string;
}

export default ({ name, status, storeMessages }: IForm) => { 
  const errors: IForm = {};

  if (!Validator.isLength(name, { min: 5, max: 18 })) {
    errors.name = 'כמות התווים המותרת בשם החדר היא בין 5 ל-18';
  }

  if (!['public', 'private'].includes(status)) {
    errors.status = 'סטטוס החדר חייב להיות פרטי/ציבורי';
  }

  if (typeof JSON.parse(storeMessages) !== 'boolean') {
    errors.storeMessages = 'אנא בחר/י האם לשמור את ההודעות בחדר זה';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}