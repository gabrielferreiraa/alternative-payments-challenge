import Image from "next/image";

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center">
          <div className="flex w-full items-center justify-center gap-4 sm:justify-start">
            <Image
              src="/alternative-payments.svg"
              alt="Alternative Payments"
              width={134}
              height={36}
              className="w-26 md:w-[134px]"
            />
            <div className="bg-border hidden h-8 w-px sm:block" />
            <div>
              <h1 className="font-display text-foreground text-sm font-semibold md:text-xl">
                Rick & Morty Dashboard
              </h1>
              <p className="text-muted-foreground hidden text-xs sm:block">
                Senior Software Engineer - Frontend Challenge
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
