import { useTypingAnimation } from '@/hooks/useTypingAnimation';
import { cn } from '@/lib/utils';
import siteContent from '@/content/siteContent';

const HERO_HEADING_LINE_1 = siteContent.home.hero.headingLine1;
const HERO_HEADING_LINE_2 = siteContent.home.hero.headingLine2;

interface TypingHeadingProps {
  className?: string;
}
export function TypingHeading({
  className
}: TypingHeadingProps) {
  // No second line: type only line 1 and keep the cursor on it
  const hasLine2 = HERO_HEADING_LINE_2.trim().length > 0;
  const fullText = hasLine2
    ? `${HERO_HEADING_LINE_1} ${HERO_HEADING_LINE_2}`
    : HERO_HEADING_LINE_1;
  const {
    displayedText,
    showCursor,
    isComplete
  } = useTypingAnimation({
    text: fullText,
    typingSpeed: 55,
    pauseAfterTyping: 500,
    startDelay: 400
  });

  // Find where to split for the second line
  const line1Length = HERO_HEADING_LINE_1.length;
  const displayedLine1 = displayedText.slice(0, line1Length);
  const displayedLine2 = displayedText.slice(line1Length + 1); // +1 for the space

  return <h1 className={cn("text-5xl md:text-7xl tracking-tight text-white leading-[0.95] lg:text-6xl font-light", className)} aria-label={fullText}>
      <span className="inline text-4xl">
        {displayedLine1}
        {/* Show cursor on line 1 while typing (always, when there is no line 2) */}
        {showCursor && (!hasLine2 || displayedText.length <= line1Length) && <span className={cn("inline-block w-[3px] h-[0.9em] bg-white ml-1 align-middle", !isComplete && "animate-pulse")} aria-hidden="true" />}
      </span>
      {hasLine2 && <span className="block mt-2 text-4xl">
        {displayedLine2}
        {/* Show cursor on line 2 if typing line 2 */}
        {showCursor && displayedText.length > line1Length && <span className={cn("inline-block w-[3px] h-[0.9em] bg-white ml-1 align-middle", !isComplete && "animate-pulse")} aria-hidden="true" />}
      </span>}
      {/* Hidden text for screen readers */}
      <span className="sr-only">{fullText}</span>
    </h1>;
}