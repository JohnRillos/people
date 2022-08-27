import React from 'react';
import { useContext } from 'react'
import { ContactWithKey } from '../types/ContactTypes';
import { getDisplayName } from '../util/ContactUtil';
import { ModalContext } from '../context/ModalContext'

export const ContactCard = (props:{contact:ContactWithKey}) => {
  let { selectContact, openModal } = useContext(ModalContext);

  return (
    <button
      className='hover:transition-colors ease-out duration-300 hover:bg-sky-500/10 dark:hover:bg-gray-800 max-w-sm w-full'
      onClick={() => {
        selectContact(props.contact.key);
        openModal();
      }}
    >
      <div className='px-2 py-2 text-left text-lg'>
        <p>{getDisplayName(props.contact)}</p>
      </div>
    </button>
  );
};
