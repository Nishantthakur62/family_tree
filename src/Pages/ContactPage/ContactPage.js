import React, { useState } from 'react';
import { FiMail, FiMessageCircle } from 'react-icons/fi';
import { ContactShell, ContactGrid, ContactIntro, Eyebrow, Heading, Copy, ContactForm, Field, Textarea, SubmitButton, Confirmation } from './ContactPage.style';

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <ContactShell>
      <ContactGrid>
        <ContactIntro>
          <Eyebrow>We are listening</Eyebrow>
          <Heading>Questions about your family story?</Heading>
          <Copy>Whether you need a hand with your tree or want to share an idea, send us a note. We usually reply within two working days.</Copy>
          <p><FiMail aria-hidden="true" /> support@familytree.com</p>
          <p><FiMessageCircle aria-hidden="true" /> Monday to Friday, 9am–5pm</p>
        </ContactIntro>
        {sent ? (
          <Confirmation><strong>Message received.</strong><span>Thanks for reaching out. We’ll be in touch soon.</span></Confirmation>
        ) : (
          <ContactForm onSubmit={handleSubmit}>
            <Field><span>Name</span><input type="text" required /></Field>
            <Field><span>Email</span><input type="email" required /></Field>
            <Field><span>How can we help?</span><Textarea required rows="5" /></Field>
            <SubmitButton type="submit">Send message <span aria-hidden="true">→</span></SubmitButton>
          </ContactForm>
        )}
      </ContactGrid>
    </ContactShell>
  );
};

export default ContactPage;