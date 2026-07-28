import { cn } from "@/shared/lib/cn";

/**
 * A labelled form control. One component for both the single-line and the
 * multi-line case, because they differ only in the element and would otherwise
 * be two files agreeing about a baseline, a label and an error message.
 *
 * The field is underlined rather than boxed or sunk into a tonal well: a sand
 * baseline at rest, with an ink one drawn over it from the left on entry. That
 * gesture lives in the `field-line` utility, which sits on the wrapper because
 * an input is a replaced element and renders no pseudo-element of its own.
 *
 * No focus ring is suppressed here. The site has exactly one focus treatment
 * and it is declared once in globals.css; a component that reinvents it is the
 * thing that rule exists to prevent.
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

/* An error marks the resting baseline as well as writing under it, so the
   field still reads as the one at fault once the message has been read. */
const BASELINE_CLASS = { rest: "border-sand", invalid: "border-ink" } as const;

const ERROR_CLASS = "mt-3 font-sans text-label text-ink";

interface BaseFieldProps {
  name: string;
  label: string;
  /** Present only after the action has rejected this field. */
  error?: string;
  /** Refills the control when the action returns, including with no JS. */
  defaultValue?: string;
  isRequired?: boolean;
  autoComplete?: string;
  className?: string;
}

/**
 * `rows` is what selects the textarea, and the union is what stops a call site
 * asking for a multi-line email field: the two sets of props cannot be mixed.
 */
type FieldProps = BaseFieldProps &
  ({ rows: number; type?: never } | { rows?: never; type?: "text" | "email" | "tel" });

export function Field(props: FieldProps) {
  const { name, label, error, defaultValue, isRequired, autoComplete, className } = props;

  const id = `enquiry-${name}`;
  const errorId = `${id}-error`;

  const shared = {
    id,
    name,
    defaultValue,
    autoComplete,
    required: isRequired,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  const baseline = error ? BASELINE_CLASS.invalid : BASELINE_CLASS.rest;

  return (
    <div className={cn("group", className)}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>

      <div className="field-line mt-3">
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

      {error ? (
        <p id={errorId} role="alert" className={ERROR_CLASS}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
