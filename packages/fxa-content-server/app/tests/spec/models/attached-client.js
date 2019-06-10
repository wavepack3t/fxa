/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { assert } from 'chai';
import AttachedClient from 'models/attached-client';
import sinon from 'sinon';

describe('models/attached-client', function () {
  var client;

  beforeEach(function () {
    client = new AttachedClient();
  });

  describe('destroy', function () {
    beforeEach(function () {
      sinon.spy(client, 'trigger');

      client.destroy();
    });

    it('triggers a `destroy` message', function () {
      assert.isTrue(client.trigger.calledWith('destroy'));
    });
  });
});
