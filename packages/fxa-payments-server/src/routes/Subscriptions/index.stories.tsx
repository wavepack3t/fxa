import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MockApp from '../../../.storybook/components/MockApp';
import { SettingsLayout } from '../../components/AppLayout';
import { Subscriptions, SubscriptionsProps } from './index';

function init() {
  const RouteWrapper = (props: SubscriptionsProps) => (
    <MockApp>
      <SettingsLayout>
        <Subscriptions {...props} />
      </SettingsLayout>
    </MockApp>
  );
  storiesOf('routes/Subscriptions', module)
    .add('blank slate', () => (
      <RouteWrapper {...baseProps} />
    ))
    .add('loading', () => (
      <RouteWrapper {...{
        ...baseProps,
        subscriptions: {
          loading: true,
          error: false,
          result: null
        }
      }} />
    ))
    .add('error', () => (
      <RouteWrapper {...{
        ...baseProps,
        subscriptions: {
          loading: false,
          error: { message: 'network error' },
          result: null
        }
      }} />
    ))
    .add('subscribed', () => (
      <RouteWrapper  {...subscribedProps} />
    ));
}

const baseProps: SubscriptionsProps = {
  customer:  {
    error: null,
    loading: false,
    result: null,
  },
  subscriptions:  {
    error: null,
    loading: false,
    result: null,
  },
  customerSubscriptions: [],
  fetchCustomerAndSubscriptions: action('fetchCustomerAndSubscriptions'),
  cancelSubscription: action('cancelSubscription'),
  resetUpdatePayment: action('resetUpdatePayment'),
  resetCancelSubscription: action('resetCancelSubscription'),
  updatePayment: action('updatePayment'),
  updatePaymentStatus: {
    error: null,
    loading: false,
    result: null,
  },
};

const subscribedProps: SubscriptionsProps = {
  ...baseProps,
  customer: {
    loading: false,
    error: null,
    result: {
      payment_type: 'card',
      last4: '8675',
      exp_month: '12',
      exp_year: '2028',
      subscriptions: [],
    }
  },
  customerSubscriptions: [
    {
      current_period_end: '' + (Date.now() + 86400),
      current_period_start: '' + (Date.now() - 86400),
      ended_at: null,
      nickname: 'Example Plan',
      plan_id: 'plan_8675309',
      status: 'active',
      subscription_id: 'sub_5551212'
    }
  ],
  subscriptions: {
    loading: false,
    error: null,
    result: [
      {
        subscriptionId: 'sub_5551212',
        productName: 'product_123',
        createdAt: Date.now(),
        cancelledAt: null
      }
    ]
  }
};

init();