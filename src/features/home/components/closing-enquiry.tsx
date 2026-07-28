import { CLOSING } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";

/**
 * A block rather than a section: it closes the questions section instead of
 * standing alone, because one sentence and a button did not carry a section
 * boundary of its own.
 */
export function ClosingEnquiry() {
  const { heading, cta } = CLOSING;

  return (
    // Left aligned on the page's single text axis, and set in the same
    // columns as the content above it. What marks this as the ending is the
    // gap in front of it, which is the largest on the page: whitespace is the
    // punctuation, rather than a rule, a colour band or a change of alignment.
    <div className="mt-32 grid lg:mt-40 lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-6 lg:col-start-7">
        <Heading as="h2" size="h2" className="max-w-[24ch] text-balance">
          {heading.map((segment) =>
            segment.isAccent ? (
              <em key={segment.text} className="font-normal italic">
                {segment.text}
              </em>
            ) : (
              segment.text
            ),
          )}
        </Heading>

        {cta ? (
          <Button href={cta.href} className="mt-10">
            {cta.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
