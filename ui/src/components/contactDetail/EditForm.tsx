import React from 'react';
import { Contact, InfoValue, InfoDate, InfoKey } from '../../types/ContactTypes';
import { getDisplayName } from '../../util/ContactUtil';

const displayFieldNames: Record<InfoKey, string> = {
  "first-name": "First Name",
  "middle-name": "Middle Name",
  "last-name": "Last Name",
  "nickname": "Nickname",
  "label": "Label",
  "dob": "Date of Birth",
  "note": "Note",
  "job": "Occupation",
  "phone": "Phone #",
  "email": "Email",
  "website": "Website",
  "github": "GitHub",
  "twitter": "Twitter",
};

const fieldPositions: { [key: string]: number } =
  Object.fromEntries(Object.keys(displayFieldNames).map((key, i) => ([key, i])));

function getDisplayKey(key: InfoKey) {
  return displayFieldNames[key] || key;
}

function getFieldType(val: InfoValue) {
  if (typeof val === 'string') {
    return 'string';
  }
  return Object.keys(val)[0];
}

function renderTextValue(val: string) {
  return <p>{val}</p>;
}

function renderDateValue({ date }: InfoDate) {
  return (
    <span>
      {`${date.year}/${date.month}/${date.day}`}
    </span>
  );
}

function renderInfoValue(key: InfoKey, val: InfoValue | undefined) {
  if (val == undefined) {
    return '______________';
  }
  switch (getFieldType(val)) {
    case 'string': return renderTextValue(val as string);
    case 'date': return renderDateValue(val as InfoDate);
    default: return JSON.stringify(val);
  }
}

function renderInfoField(key: InfoKey, val: InfoValue | undefined) {
  const opacity = !val ? 'opacity-50' : '';
  return (
    <div className='flex'>
      <span className={`flex-none font-semibold mr-2 ${opacity}`}>{getDisplayKey(key)}: </span>
      {renderInfoValue(key, val)}
    </div>
  );
}

function renderCustomField(key: string, val: string) {
  return (
    <div className='flex'>
      <p className='flex-none font-semibold mr-2'>{key}: </p>
      <div className='inline-block'>
        {renderTextValue(val)}
      </div>
    </div>
  );
}

function renderShipName(contact: Contact) {
  if (contact.ship) {
    return <>
      <span className='font-semibold mr-2'>Urbit: </span>
      {contact.ship}
    </>
  }
  return <>
    <span className='font-semibold mr-2'>Urbit: </span>______________
  </>;
}

function sortCustomFields(info: { [key: string]: string }): [string, string][] {
  return Object.entries(info).sort(([keyA], [keyB]) => {
    return keyA > keyB ? 1 : -1;
  });
}

export default function EditForm(props: {contact: Contact}) {
  return (
    <div className='text-left'>
      <p>Edit Contact</p>
      <p className='mb-2'>
        <strong>{getDisplayName(props.contact)}</strong>
      </p>
      {renderShipName(props.contact)}
      <ul>
        {Object.keys(displayFieldNames)
          .map(key => key as InfoKey)
          .map((key: InfoKey) => ({
              key: key,
              value: props.contact.info[key]
          }))
          .map((arg: {key: InfoKey, value: InfoValue | undefined}) => (
            <li key={arg.key}>
              {renderInfoField(arg.key, arg.value)}
            </li>
          ))}
      </ul>
      <p>Custom Fields</p>
      <ul>
        {sortCustomFields(props.contact.custom)
          .map(([key, val]) => (
            <li key={key}>
              {renderCustomField(key, val)}
            </li>
          ))}
      </ul>
    </div>
  );
}