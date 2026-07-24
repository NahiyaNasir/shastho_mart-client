export const metadata = {
  title: "Privacy Policy | Shastho Mart",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate dark:prose-invert">
      <h1 className="text-4xl font-black tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: 2026</p>

      <h2 className="mt-8 font-bold text-xl">Information We Collect</h2>
      <p className="text-muted-foreground">
        When you create an account, place an order, or contact us, we collect
        information such as your name, email address, phone number, and
        shipping address, so we can fulfill your orders and provide support.
      </p>

      <h2 className="mt-8 font-bold text-xl">How We Use Your Information</h2>
      <p className="text-muted-foreground">
        We use your information to process orders, communicate order status,
        respond to support requests, and improve our platform. We do not sell
        your personal information to third parties.
      </p>

      <h2 className="mt-8 font-bold text-xl">Data Security</h2>
      <p className="text-muted-foreground">
        Passwords are hashed and never stored in plain text. We take
        reasonable steps to protect your data, but no online service can
        guarantee absolute security.
      </p>

      <h2 className="mt-8 font-bold text-xl">Your Rights</h2>
      <p className="text-muted-foreground">
        You can update your profile information at any time from your account
        settings, or contact us to request that your data be updated or
        removed.
      </p>

      <h2 className="mt-8 font-bold text-xl">Contact</h2>
      <p className="text-muted-foreground">
        Questions about this policy? Reach us at{" "}
        <a href="mailto:support@shasthomart.com" className="text-primary">
          support@shasthomart.com
        </a>
        .
      </p>
    </div>
  );
}