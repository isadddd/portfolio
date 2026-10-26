import React from "react";

const CtaSection = () => {
  return (
    <section
      id="cta"
      data-theme="light"
      className="relative z-10 bg-primary px-4 py-16 md:px-[50px] md:py-24"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-6">
        <h2 className="font-heading text-[clamp(46px,6vw,80px)] font-bold tracking-[-0.1em] text-secondary">
          got a project? let&apos;s talk.
        </h2>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <a
            href="mailto:you@email.com"
            className="group w-fit bg-secondary px-4 py-3 text-[clamp(16px,1.6vw,20px)] text-primary transition-colors duration-200 hover:bg-black hover:text-secondary"
          >
            [{" "}
            <span className="underline underline-offset-2">chat my e-mail</span>{" "}
            ]
          </a>
          <a
            href="https://wa.me/62xxxxxxxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-fit bg-secondary px-4 py-3 text-[clamp(16px,1.6vw,20px)] text-primary transition-colors duration-200 hover:bg-black hover:text-secondary"
          >
            [{" "}
            <span className="underline underline-offset-2">
              chat my whatsapp
            </span>{" "}
            ]
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
