import { NextResponse } from "next/server";

type IntakeSubmission = {
  referenceId: string;
  parentName: string;
  parentEmail: string;
  childFirstName: string;
  childAgeGroup: string;
  primaryConcern: string;
  severity: string;
  symptoms: string;
  contactPreference: string;
  createdAt: string;
};

const submissions: IntakeSubmission[] = [];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createReferenceId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `BC-${stamp}-${rand}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;

  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ referenceId: "BC-SPAM-IGNORED" }, { status: 202 });
  }

  const parentName = String(body.parentName ?? "").trim();
  const parentEmail = String(body.parentEmail ?? "").trim();
  const childFirstName = String(body.childFirstName ?? "").trim();
  const childAgeGroup = String(body.childAgeGroup ?? "").trim();
  const primaryConcern = String(body.primaryConcern ?? "").trim();
  const severity = String(body.severity ?? "").trim();
  const symptoms = String(body.symptoms ?? "").trim();
  const contactPreference = String(body.contactPreference ?? "email").trim();
  const consent = Boolean(body.consent);

  if (
    !parentName ||
    !EMAIL_PATTERN.test(parentEmail) ||
    !childFirstName ||
    !childAgeGroup ||
    !primaryConcern ||
    !severity ||
    !consent
  ) {
    return NextResponse.json(
      {
        error: "Please complete all required fields with valid information.",
      },
      { status: 400 },
    );
  }

  const referenceId = createReferenceId();
  submissions.push({
    referenceId,
    parentName,
    parentEmail,
    childFirstName,
    childAgeGroup,
    primaryConcern,
    severity,
    symptoms,
    contactPreference,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    referenceId,
    received: true,
  });
}
