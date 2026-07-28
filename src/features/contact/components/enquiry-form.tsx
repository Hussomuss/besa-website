"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import { CONTACT } from "@/data/contact";
import { SITE } from "@/data/site";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { Heading } from "@/shared/ui/heading";
import { Text } from "@/shared/ui/text";
import { IDLE_ENQUIRY } from "../actions/enquiry-state";
import { sendEnquiry } from "../actions/send-enquiry";

/**
 * Declared once and worn by both the form and the message that replaces it.
 * The two layers are stacked on the panel rather than nested, so nothing
 * inherits the inset and it has to be stated on each.
 */
const PANEL_INSET = "p-6 lg:p-12 xl:p-14";

/**
 * min-h-11 for the same reason the footer carries it: label type is an 11px
 * line box, which without it is a 13px tap target against a 44px guidance.
 */
const DIRECT_CLASS = "inline-flex min-h-11 items-center font-sans text-label uppercase";

function DirectLine({ className }: { className?: string }) {
  return (
    <address className={`flex flex-col not-italic ${className ?? ""}`}>
      <span className={DIRECT_CLASS}>{SITE.city}</span>
      <a
        href={`tel:${SITE.phone.replace(/\s/g, "")}`}
        className={`${DIRECT_CLASS} hover:opacity-70`}
      >
        {SITE.phone}
      </a>
      <a
        href={`mailto:${SITE.email}`}
        className={`${DIRECT_CLASS} lowercase hover:opacity-70`}
      >
        {SITE.email}
      </a>
    </address>
  );
}

/**
 * The panel's whole interior: the form, the plane that rises over it, and the
 * message that plane carries.
 *
 * All three are siblings filling the panel, because the rise has to cover the
 * panel's padding as well as its content — a plane inset by the padding would
 * leave a bone frame around itself. The heading arrives as children so it stays
 * server-rendered; nothing else here needs to.
 *
 * `noValidate` because the browser's own bubbles cannot be styled and arrive in
 * the reader's UI language rather than this practice's voice. The action is the
 * only validator, which is also the honest arrangement: a Server Action is a
 * public endpoint and the browser is not a gate.
 */
export function EnquiryForm({ children }: { children: ReactNode }) {
  const [state, action, isPending] = useActionState(sendEnquiry, IDLE_ENQUIRY);
  const isSent = state.status === "sent";

  return (
    <div className="relative flex flex-1 flex-col">
      <div className={`flex flex-1 flex-col ${PANEL_INSET}`} inert={isSent}>
        {children}

        <form action={action} noValidate className="mt-10 lg:mt-auto lg:pt-12">
          {/*
           * Four fields into a two-column grid leaves the cell beside Phone
           * empty, because Note spans the pair and cannot fit beside it. That
           * gap is the composition: a filled rectangle of inputs reads as a
           * questionnaire.
           */}
          <div className="grid gap-7 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
            <Field
              name="name"
              label={CONTACT.labels.name}
              autoComplete="name"
              isRequired
              defaultValue={state.values.name}
              error={state.errors.name}
            />
            <Field
              name="email"
              label={CONTACT.labels.email}
              type="email"
              autoComplete="email"
              isRequired
              defaultValue={state.values.email}
              error={state.errors.email}
            />
            <Field
              name="phone"
              label={CONTACT.labels.phone}
              type="tel"
              autoComplete="tel"
              defaultValue={state.values.phone}
            />
            <Field
              name="note"
              label={CONTACT.labels.note}
              rows={2}
              isRequired
              defaultValue={state.values.note}
              error={state.errors.note}
              className="lg:col-span-2"
            />
          </div>

          {state.message ? (
            <p role="alert" className="mt-8 font-sans text-label text-ink">
              {state.message}
            </p>
          ) : null}

          {/* Column on a phone, where stretch gives the button the full width
              its own prop asks for; a row at lg, where the item sizes to its
              content instead. */}
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Button
                type="submit"
                on="bone"
                colour="moss"
                width="full"
                isDisabled={isPending}
              >
                {isPending ? CONTACT.pending : CONTACT.submit}
              </Button>
            </div>
            <DirectLine className="text-ink" />
          </div>
        </form>
      </div>

      {/*
       * The gesture the reader just pressed, at the scale of the panel: the
       * button's curve and origin, with the duration scaled to roughly the
       * square root of the travel rather than to the travel itself.
       *
       * No grain on it. The plane is scaled rather than moved, and a scaled
       * element stretches its own texture the whole way up — the tile would
       * arrive squashed and un-squash as it went.
       */}
      <div
        aria-hidden
        data-sent={isSent}
        className="absolute inset-0 z-10 origin-bottom scale-y-0 bg-moss transition-transform duration-[820ms] ease-rise data-[sent=true]:scale-y-100 motion-reduce:transition-none"
      />

      {/*
       * Riding the plane, 140ms behind it — the panel-scale version of the
       * button's 70ms label lag, which is the difference between the plane
       * appearing to carry the message and the two appearing to be wired to the
       * same switch. Unclipped, so the spring's overshoot is the one in this
       * gesture that can actually be seen.
       *
       * The transition names `translate`, not `transform`. Tailwind v4 emits
       * the standalone translate property, so an arbitrary transition naming
       * `transform` would carry the fade and leave the movement behind.
       */}
      <div
        role="status"
        inert={!isSent}
        data-sent={isSent}
        className={`absolute inset-0 z-20 flex translate-y-3.5 flex-col justify-end text-bone opacity-0 transition-[opacity,translate] delay-[140ms] duration-700 ease-spring data-[sent=true]:translate-y-0 data-[sent=true]:opacity-100 motion-reduce:transition-none ${PANEL_INSET}`}
      >
        <Heading as="h2" size="display" className="max-w-[15ch] text-balance">
          {CONTACT.success.heading.map((segment) =>
            segment.isAccent ? (
              <em key={segment.text} className="font-normal italic">
                {segment.text}
              </em>
            ) : (
              segment.text
            ),
          )}
        </Heading>

        <Text className="mt-6 max-w-[36ch] text-bone/85">
          {CONTACT.success.body}
        </Text>

        <DirectLine className="mt-8 text-bone" />
      </div>
    </div>
  );
}
