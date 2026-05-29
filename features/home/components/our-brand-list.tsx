import { ClientsMarquee, SplitText } from "@/shared/components/ui";

export function ClientsList() {
  const logos = [
    { key: "cosgrove", src: "/pictures/logos/cosgrove-new-logo.png", alt: "Cosgrove" },
    { key: "ecobank", src: "/pictures/logos/ecobank-logo.png", alt: "Ecobank" },
    { key: "son", src: "/pictures/logos/son-logo-2.jpeg", alt: "SON" },
    { key: "uber", src: "/pictures/logos/uber.png", alt: "Uber" },
    { key: "affinity", src: "/pictures/logos/affinity-logo.png", alt: "Affinity" },
    { key: "dangote", src: "/pictures/logos/favpng-logo-dangote-refinery-dangote-group-kano-lagos.png", alt: "Dangote" },
    { key: "ingene", src: "/pictures/logos/ingene-Full-Colour.png", alt: "Ingene" },
    { key: "totalenergies", src: "/pictures/logos/logo-totalenergies.png", alt: "TotalEnergies" },
    { key: "nnpc", src: "/pictures/logos/nigerian-national-petroleum-company-logo.svg", alt: "NNPC" },
    { key: "sec", src: "/pictures/logos/sec-logo-2019.png", alt: "SEC" },
  ].map(logo => ({ ...logo, className: "h-[var(--spacing-10)] w-auto" }));

  return (
    <ClientsMarquee
      title={
        <SplitText 
          as="h2"
          variant="slide-up"
          className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading text-center m-0 max-md:mx-[var(--spacing-5)]"
        >
          Brands We&apos;ve{' '}
          <span className="text-[color:var(--color-primary-500)]">Powered</span>
        </SplitText>
      }
      items={logos}
      className="!bg-[var(--color-primary-25)] py-[var(--spacing-15)] lg:py-[var(--spacing-25)]"
      titleClassName=""
    />
  );
}

export default ClientsList;