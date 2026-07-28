import { CLOSING } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Heading } from "@/shared/ui/heading";

/**
 * A block rather than a section: it closes the questions section instead of
 * standing alone, because one sentence and a button did not carry a section
 * boundary of its own. It renders inside the questions text column, so it
 * places nothing on the grid itself.
 *
 * What marks it as the ending is the gap in front of it, which is the largest
 * inside the section: whitespace is the punctuation, rather than a rule, a
 * colour band or a change of alignment.
 */
export function ClosingEnquiry() {
  const { heading, cta } = CLOSING;

  return (
    <div className="mt-32 lg:mt-40">
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
  );
}
