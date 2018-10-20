import { User } from '../../models';
import isEmpty from './isEmpty';

interface IForm {
  displayName?: string;
  email?: string;
}

export default async (displayName: string, email: string) => {
  const errors: IForm = {};

  // Check If Username Is Available
  const takenUsername = await User.findOne({ slug: displayName.toLowerCase() });
  if (takenUsername) errors.displayName = 'שם המשתמש שבחרת תפוס, אנא בחר/י אחר';
  
  // Check If Email Is Available
  const takenEmail = await User.findOne({ email });
  if (takenEmail) errors.email = 'כתובת דואר האלקטרוני שהזנת כבר קיימת במערכת';

  return {
    errors,
    isValid: isEmpty(errors)
  }
}