import { Contact, Contacts, InfoValue } from './ContactTypes';
import { Self } from './ProfileTypes';
import { FieldDefWithKey, FieldTypeTag } from './SettingTypes';

export declare type GallApp = 'whom';

export enum ScryPath {
  Contacts = '/0/contacts',
  Fields = '/0/fields',
  Self = '/0/self',
  ImportPals = '/0/pals/import'
}

export declare type GallUpdate = ContactUpdate | FieldUpdate | SelfUpdate | ImportPalsUpdate;

export enum SubscribePath {
  Contacts = '/0/contacts',
  Fields = '/0/fields',
  Self = '/0/self',
  ImportPals = '/0/pals/import'
}

export declare type ContactUpdate = {
  app: 'whom',
  path: SubscribePath.Contacts,
  data: Contacts
};

export declare type FieldUpdate = {
  app: 'whom',
  path: SubscribePath.Fields,
  data: FieldDefWithKey[]
};

export declare type SelfUpdate = {
  app: 'whom',
  path: SubscribePath.Self,
  data: Self
};

export declare type ImportPalsUpdate = {
  app: 'whom',
  path: SubscribePath.ImportPals,
  data: boolean
}

export type WhomAction = AddContactAction |
  EditContactAction |
  EditContactShipAction |
  DeleteContactAction |
  AddFieldAction |
  DelFieldAction |
  EditSelfAction |
  PalSyncAction;

type AddContactAction = {
  'add-contact': {
    ship: string | null,
    contact: Contact
  }
};

type EditContactAction = {
  'mod-contact-info': {
    key: string,
    info: Record<string, InfoValue | null>
  }
};

type EditContactShipAction = {
  'mod-contact-ship': {
    key: string,
    ship: string | null
  }
};

type DeleteContactAction = {
  'del-contact': {
    key: string
  }
};

type AddFieldAction = {
  'add-field': {
    key: string,
    def: {
      name: string,
      type: FieldTypeTag,
    }
  }
};

type DelFieldAction = {
  'del-field': {
    key: string
  }
};

type EditSelfAction = {
  'mod-self': {
    info: Record<string, InfoValue | null>
  }
};

type PalSyncAction = {
  'pal-sync': {
    enabled: boolean
  }
}
