export const metadata = {
  title: "Terms & Conditions | Shastho Mart",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-black tracking-tight mb-2">Terms & Conditions</h1>
      <p className="text-muted-foreground">Last updated: 2026</p>

      <h2 className="mt-8 font-bold text-xl">Using Shastho Mart</h2>
      <p className="text-muted-foreground">
        By creating an account or placing an order, you agree to provide
        accurate information and to use the platform only for lawful
        purposes. Medicines listed are over-the-counter (OTC) products that
        do not require a prescription.
      </p>

      <h2 className="mt-8 font-bold text-xl">Orders & Payment</h2>
      <p className="text-muted-foreground">
        Orders are currently fulfilled on a Cash on Delivery basis. Prices
        shown at checkout are final at the time of order placement.
      </p>

      <h2 className="mt-8 font-bold text-xl">Sellers</h2>
      <p className="text-muted-foreground">
        Sellers are responsible for the accuracy of their medicine listings,
        including stock levels and pricing, and for fulfilling orders in a
        timely manner.
      </p>

      <h2 className="mt-8 font-bold text-xl">Account Suspension</h2>
      <p className="text-muted-foreground">
        Accounts that violate these terms, including fraudulent listings or
        abusive behavior, may be suspended or banned at our discretion.
      </p>

      <h2 className="mt-8 font-bold text-xl">Contact</h2>
      <p className="text-muted-foreground">
        Questions about these terms? Reach us at{" "}
        <a href="mailto:support@shasthomart.com" className="text-primary">
          support@shasthomart.com
        </a>
        .
      </p>
    </div>
  );
}