/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { Firestore, Settings } from '@google-cloud/firestore';

import { ClientWebhooks } from '../selfUpdatingService/clientWebhookService';
import { Datastore } from './index';

class FirestoreDatastore implements Datastore {
  private db: Firestore;

  constructor(config: Settings, firestore?: Firestore) {
    if (firestore) {
      this.db = firestore;
    } else {
      this.db = new Firestore(config);
    }
  }

  public async storeLogin(uid: string, clientId: string) {
    const document = this.db.doc(`users/${uid}`);
    const doc = await document.get();
    if (doc.exists) {
      const data = doc.data();
      if (data && data.oauth_clients && data.oauth_clients[clientId]) {
        // Record is already in the database
        return;
      }
    }
    await document.set({ oauth_clients: { [clientId]: true } }, { merge: true });
  }

  public async fetchClientIds(uid: string): Promise<string[]> {
    const document = this.db.doc(`users/${uid}`);
    const doc = await document.get();
    if (doc.exists) {
      const data = doc.data();
      if (data && data.oauth_clients) {
        return Object.keys(data.oauth_clients);
      }
    }
    return [];
  }

  public async fetchClientIdWebhooks(): Promise<ClientWebhooks> {
    const query = this.db.collection('clients');
    const results = await query.select('webhookUrl').get();
    const clientWebhooks: ClientWebhooks = {};
    results.docs.forEach(doc => {
      clientWebhooks[doc.id] = doc.get('webhookUrl');
    });
    return clientWebhooks;
  }
}

export { FirestoreDatastore };
