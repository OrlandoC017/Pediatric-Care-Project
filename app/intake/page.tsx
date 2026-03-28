"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import "./intake.css";

type IntakeErrors = Partial<Record<"parentName" | "parentEmail" | "childFirstName" | "childAgeGroup" | "primaryConcern" | "severity" | "consent", string>>;

type IntakePayload = {
  parentName: string;
  parentEmail: string;
  childFirstName: string;
  childAgeGroup: string;
  primaryConcern: string;
  severity: string;
  symptoms: string;
  contactPreference: string;
  consent: boolean;
  website: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: IntakePayload): IntakeErrors {
  const errors: IntakeErrors = {};

  if (!payload.parentName.trim()) {
    errors.parentName = "Parent or guardian name is required.";
  }

  if (!emailPattern.test(payload.parentEmail.trim())) {
    errors.parentEmail = "Enter a valid email address.";
  }

  if (!payload.childFirstName.trim()) {
    errors.childFirstName = "Child first name is required.";
  }

  if (!payload.childAgeGroup) {
    errors.childAgeGroup = "Please choose an age range.";
  }

  if (!payload.primaryConcern) {
    errors.primaryConcern = "Please select the main concern.";
  }

  if (!payload.severity) {
    errors.severity = "Please choose a severity level.";
  }

  if (!payload.consent) {
    errors.consent = "Consent is required before submitting.";
  }

  return errors;
}

function getPayload(form: HTMLFormElement): IntakePayload {
  const formData = new FormData(form);

  return {
    parentName: String(formData.get("parentName") ?? ""),
    parentEmail: String(formData.get("parentEmail") ?? ""),
    childFirstName: String(formData.get("childFirstName") ?? ""),
    childAgeGroup: String(formData.get("childAgeGroup") ?? ""),
    primaryConcern: String(formData.get("primaryConcern") ?? ""),
    severity: String(formData.get("severity") ?? ""),
    symptoms: String(formData.get("symptoms") ?? ""),
    contactPreference: String(formData.get("contactPreference") ?? "email"),
    consent: formData.get("consent") === "on",
    website: String(formData.get("website") ?? ""),
  };
}

export default function IntakePage() {
  const [errors, setErrors] = useState<IntakeErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitError("");
    const payload = getPayload(event.currentTarget);
    const nextErrors = validate(payload);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: { referenceId?: string; error?: string } = await response.json();

      if (!response.ok || !result.referenceId) {
        throw new Error(result.error ?? "Unable to submit intake right now.");
      }

      setReferenceId(result.referenceId);
      event.currentTarget.reset();
    } catch {
      setSubmitError("We could not submit your intake just now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="intake-page">
      <header className="intake-header" aria-label="Page heading">
        <p className="intake-eyebrow">BrightCalm Intake</p>
        <h1>Start your child&apos;s care journey</h1>
        <p>
          Share a few details so our pediatric anxiety team can recommend the best next step.
          Submissions are reviewed within one business day.
        </p>
      </header>

      <main className="intake-main">
        {referenceId ? (
          <section className="intake-success" aria-live="polite">
            <h2>Intake submitted successfully</h2>
            <p>
              Your reference id is <strong>{referenceId}</strong>. A care coordinator will contact
              you soon with your recommended pathway.
            </p>
            <div className="intake-success-actions">
              <button type="button" className="btn btn-primary" onClick={() => setReferenceId("")}>
                Submit Another Intake
              </button>
              <Link href="/" className="btn btn-secondary">
                Return Home
              </Link>
            </div>
          </section>
        ) : (
          <form className="intake-form" onSubmit={onSubmit} noValidate>
            <div className="intake-grid">
              <label>
                Parent or Guardian Name
                <input name="parentName" autoComplete="name" />
                {errors.parentName ? <span className="field-error">{errors.parentName}</span> : null}
              </label>

              <label>
                Parent Email
                <input name="parentEmail" type="email" autoComplete="email" />
                {errors.parentEmail ? <span className="field-error">{errors.parentEmail}</span> : null}
              </label>

              <label>
                Child First Name
                <input name="childFirstName" autoComplete="off" />
                {errors.childFirstName ? <span className="field-error">{errors.childFirstName}</span> : null}
              </label>

              <label>
                Child Age Group
                <select name="childAgeGroup" defaultValue="">
                  <option value="" disabled>
                    Select age range
                  </option>
                  <option value="4-6">4 to 6 years</option>
                  <option value="7-9">7 to 9 years</option>
                  <option value="10-12">10 to 12 years</option>
                  <option value="13-15">13 to 15 years</option>
                  <option value="16-17">16 to 17 years</option>
                </select>
                {errors.childAgeGroup ? <span className="field-error">{errors.childAgeGroup}</span> : null}
              </label>

              <label>
                Primary Concern
                <select name="primaryConcern" defaultValue="">
                  <option value="" disabled>
                    Select primary concern
                  </option>
                  <option value="school-anxiety">School anxiety</option>
                  <option value="separation">Separation anxiety</option>
                  <option value="social">Social anxiety</option>
                  <option value="panic">Panic symptoms</option>
                  <option value="generalized">Generalized worry</option>
                </select>
                {errors.primaryConcern ? <span className="field-error">{errors.primaryConcern}</span> : null}
              </label>

              <label>
                Current Severity
                <select name="severity" defaultValue="">
                  <option value="" disabled>
                    Select severity
                  </option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                {errors.severity ? <span className="field-error">{errors.severity}</span> : null}
              </label>
            </div>

            <label>
              Symptoms and context (optional)
              <textarea
                name="symptoms"
                rows={4}
                placeholder="Share what your child is experiencing at home or school."
              />
            </label>

            <fieldset>
              <legend>Preferred first contact method</legend>
              <div className="radio-group">
                <label>
                  <input type="radio" name="contactPreference" value="email" defaultChecked /> Email
                </label>
                <label>
                  <input type="radio" name="contactPreference" value="phone" /> Phone
                </label>
              </div>
            </fieldset>

            <label className="consent-row">
              <input type="checkbox" name="consent" />
              I confirm I am the parent/legal guardian and consent to BrightCalm reviewing this intake.
            </label>
            {errors.consent ? <span className="field-error">{errors.consent}</span> : null}

            <label className="honeypot" aria-hidden="true">
              Leave this field empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>

            {submitError ? (
              <p className="submit-error" role="alert">
                {submitError}
              </p>
            ) : null}

            <div className="form-actions">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Intake"}
              </button>
              <Link href="/" className="btn btn-secondary">
                Cancel
              </Link>
            </div>

            {hasErrors ? (
              <p className="hint" role="status">
                Please resolve the highlighted fields before submitting.
              </p>
            ) : null}
          </form>
        )}
      </main>
    </div>
  );
}
