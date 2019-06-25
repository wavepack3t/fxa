// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, you can obtain one at https://mozilla.org/MPL/2.0/.

use http::StatusCode;
use sendgrid::v3::{
    Content, Email as EmailAddress, Personalization, Message, Sender as Client,
};

use super::{Headers, Provider};
use crate::{
    settings::{Sender, Sendgrid as SendgridSettings, Settings},
    types::error::{AppErrorKind, AppResult},
};

pub struct SendgridProvider {
    client: Client,
    sender: Sender,
}

impl SendgridProvider {
    pub fn new(sendgrid_settings: &SendgridSettings, settings: &Settings) -> SendgridProvider {
        SendgridProvider {
            client: Client::new(sendgrid_settings.key.to_string()),
            sender: settings.sender.clone(),
        }
    }
}

impl Provider for SendgridProvider {
    fn send(
        &self,
        to: &str,
        cc: &[&str],
        headers: Option<&Headers>,
        subject: &str,
        body_text: &str,
        body_html: Option<&str>,
    ) -> AppResult<String> {
        let mut message = Message::new();
        let mut from_address = EmailAddress::new();
        from_address.set_email(&self.sender.address.as_ref());
        from_address.set_name(self.sender.name.as_ref());
        message.set_from(from_address);
        message.set_subject(subject);

        let mut text = Content::new();
        text.set_content_type("text/plain");
        text.set_value(body_text);
        message.add_content(text);

        if let Some(body_html) = body_html {
            let mut html = Content::new();
            html.set_content_type("text/html");
            html.set_value(body_html);
            message.add_content(html);
        }

        let mut personalization = Personalization::new();
        let mut to_address = EmailAddress::new();
        to_address.set_email(to);
        personalization.add_to(to_address);
        cc.iter().for_each(|cc| {
            let mut cc_address = EmailAddress::new();
            cc_address.set_email(cc);
            personalization.add_cc(cc_address);
        });
        if let Some(headers) = headers {
            personalization.add_headers(headers.clone());
        }
        message.add_personalization(personalization);

        self.client
            .send(&message)
            .map_err(From::from)
            .and_then(|mut response| {
                let status = response.status();
                if status == StatusCode::OK || status == StatusCode::ACCEPTED {
                    response
                        .headers()
                        .get("X-Message-Id")
                        .ok_or(
                            AppErrorKind::Internal(
                                "Missing or duplicate X-Message-Id header in Sendgrid response"
                                    .to_owned(),
                            )
                            .into(),
                        )
                        .and_then(|message_id| message_id.to_str().map_err(From::from))
                        .map(|message_id| message_id.to_string())
                } else {
                    Err(AppErrorKind::Internal(format!(
                        "Sendgrid response: {}, \"{}\"",
                        status,
                        response.text().unwrap_or("[no body]".to_owned())
                    )))?
                }
            })
    }
}
