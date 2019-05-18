/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * OAuth authorization view, redirects based on requested OAuth actions.
 */
import BaseView from './base';
import Cocktail from 'cocktail';
import OAuthErrors from '../lib/oauth-errors';
import { OAUTH_PROMPT_NONE } from '../lib/constants';
import CachedCredentialsMixin from './mixins/cached-credentials-mixin';

class AuthorizationView extends BaseView {
  beforeRender () {
    if (this.relier.get('prompt') === OAUTH_PROMPT_NONE) {
      return this._doPromptNone();
    }

    const action = this.relier.get('action');
    if (action) {
      const pathname = action === 'email' ? '/oauth/' : action;
      this.replaceCurrentPage(pathname);
    } else {
      // if no action is specified, let oauth-index decide based on
      // current user signed in state.
      this.replaceCurrentPage('/oauth/');
    }
  }

  _doPromptNone () {
    const account = this.getSignedInAccount();

    this._validatePromptNone(account);

    return this.useLoggedInAccount(account);
  }

  _validatePromptNone (account) {
    const relier = this.relier;

    if (! relier.isTrusted()) {
      throw OAuthErrors.toError('PROMPT_NONE_WITH_UNTRUSTED');
    }

    if (relier.wantsKeys()) {
      throw OAuthErrors.toError('PROMPT_NONE_WITH_KEYS');
    }

    if (account.isDefault()) {
      throw OAuthErrors.toError('PROMPT_NONE_NOT_SIGNED_IN');
    }

    const loginHint = relier.get('loginHint');
    if (loginHint && loginHint !== account.get('email')) {
      throw OAuthErrors.toError('PROMPT_NONE_DIFFERENT_USER_SIGNED_IN');
    }
  }
}

Cocktail.mixin(
  AuthorizationView,
  CachedCredentialsMixin,
);

export default AuthorizationView;
