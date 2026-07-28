"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * A labelled form control. One component for both the single-line and the
 * multi-line case, because they differ only in the element and would otherwise
 * be two files agreeing about a baseline, a label, a counter and an error.
 *
 * The field is underlined rather than boxed or sunk into a tonal well: a sand
 * baseline at rest, an ink one drawn over it from the left on entry, and a rust
 * one held drawn while the field is at fault. That gesture lives in the
 * `field-line` utility, which sits on the wrapper because an input is a
 * replaced element and renders no pseudo-element of its own.
 *
 * A client component for one reason: the remaining-characters count. Everything
 * else here would render on the server.
 */

/*
 * A quarter step down from ink, and the arithmetic is the point: ink at 75% on
 * bone resolves to #5f5f5c and measures 5.8:1, which clears AA for text at this
 * size. The footer's comparable step — bone at 70% on moss — measures 4.4:1 and
 * was dropped for exactly that reason, so this is not the same decision made
 * twice differently but the same test applied to a different ground.
 */
const LABEL_CLASS =
  "block font-sans text-label uppercase text-ink/75 transition-colors duration-[400ms] ease-editorial group-focus-within:text-ink motion-reduce:transition-none";

const CONTROL_CLASS =
  "block w-full border-0 border-b bg-transparent px-0 pb-2.5 font-sans text-body text-ink";

/* An error marks the resting baseline as well as writing under it, so the field
   still reads as the one at fault once the message has been read. */
const BASELINE_CLASS = { rest: "border-sand", invalid: "border-rust" } as const;

/** Shown only once the reader is close enough for the number to be useful. */
const COUNTER_THRESHOLD = 0.8;

interface BaseFieldProps {
  name: string;
  label: string;
  /** Present only after the action has rejected this field. */
  error?: string;
  /** Refills the control when the action returns, including with no JS. */
  defaultValue?: string;
  isRequired?: boolean;
  autoComplete?: string;
  /** Caps typing, and turns on the remaining count near the limit. */
  maxLength?: number;
  className?: string;
}

/**
 * `rows` is what selects the textarea, and the union is what stops a call site
 * asking for a multi-line email field: the two sets of props cannot be mixed.
 */
type FieldProps = BaseFieldProps &
  ({ rows: number; type?: never } | { rows?: never; type?: "text" | "email" | "tel" });

export function Field(props: FieldProps) {
  const {
    name,
    label,
    error,
    defaultValue,
    isRequired,
    autoComplete,
    maxLength,
    className,
  } = props;

  const [length, setLength] = useState(defaultValue?.length ?? 0);

  const id = `enquiry-${name}`;
  const errorId = `${id}-error`;

  const isCounting = maxLength !== undefined;
  const isNearLimit = isCounting && length > maxLength * COUNTER_THRESHOLD;
  const remaining = isCounting ? maxLength - length : 0;

  const shared = {
    id,
    name,
    defaultValue,
    autoComplete,
    maxLength,
    required: isRequired,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onChange: isCounting
      ? (event: { target: { value: string } }) => setLength(event.target.value.length)
      : undefined,
  };

  const baseline = error ? BASELINE_CLASS.invalid : BASELINE_CLASS.rest;

  return (
    <div className={cn("group", className)}>
      <label
        htmlFor={id}
        className={cn(LABEL_CLASS, error && "text-rust group-focus-within:text-rust")}
      >
        {label}
      </label>

      <div className="field-line mt-3" data-invalid={error ? "" : undefined}>
        {props.rows === undefined ? (
          <input
            {...shared}
            type={props.type ?? "text"}
            className={cn(CONTROL_CLASS, baseline)}
          />
        ) : (
          <textarea
            {...shared}
            rows={props.rows}
            className={cn(CONTROL_CLASS, baseline, "resize-none")}
          />
        )}
      </div>

      {error || isNearLimit ? (
        <div className="mt-3 flex items-start gap-4">
          {error ? (
            <p id={errorId} role="alert" className="font-sans text-label text-rust">
              {error}
            </p>
          ) : null}

          {isNearLimit ? (
            <p
              className={cn(
                "ml-auto shrink-0 font-sans text-label tabular-nums",
                remaining === 0 ? "text-rust" : "text-ink/75",
              )}
            >
              {remaining}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
