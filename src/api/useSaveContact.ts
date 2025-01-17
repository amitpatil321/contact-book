import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { TABLES } from "../constants/constants";
import messages from "../constants/messages";
import supabase from "../constants/supabase";
import { Contact, Meta } from "../types/types";

const saveContact = async (
  contact: Contact
): Promise<{ contacts: Contact[]; meta: Meta[] }> => {
  const {
    id,
    created_at,
    first_name,
    last_name,
    email,
    mobile,
    profile_pic,
    ...rest
  } = contact;

  const { data: basicInfo, error: contactError } = await supabase
    .from(TABLES.contacts)
    .insert({
      id,
      created_at,
      first_name,
      last_name,
      email,
      mobile,
      profile_pic,
      status,
    })
    .select();

  if (contactError) {
    throw new Error(messages.contacts.errorSaving);
  }

  let metaData: Meta[] = [];

  if (basicInfo) {
    const { data: metaResult, error: metaError } = await supabase
      .from(TABLES.meta)
      .insert({ user_id: contact.id, ...rest })
      .select();

    if (metaError) {
      throw new Error(messages.meta.errorSaving);
    }

    metaData = metaResult as Meta[];
  }

  // Return both results
  return { contacts: basicInfo as Contact[], meta: metaData };
};

interface SaveContactResult {
  contacts: Contact[];
  meta: Meta[];
}

const useSaveContact = (): UseMutationResult<
  SaveContactResult,
  Error,
  Contact
> => {
  return useMutation<SaveContactResult, Error, Contact>({
    mutationFn: async (contact) => await saveContact(contact),
  });
};

export default useSaveContact;
