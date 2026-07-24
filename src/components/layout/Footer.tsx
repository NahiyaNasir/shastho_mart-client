import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

interface Footer7Props {
  logo?: {
    url: string;
    title: string;
  };
  className?: string;
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Shop",
    links: [
      { name: "Browse Medicines", href: "/shop" },
      { name: "My Cart", href: "/cart" },
      { name: "My Orders", href: "/orders" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/terms" },
    ],
  },
];

// TODO: replace with the project's real social media URLs before
// deploying to production — these are placeholders.
const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const Footer = ({
  logo = {
    url: "/",
    title: "Shastho-Mart",
  },
  sections = defaultSections,
  description = "Your health, our priority. Committed to providing quality healthcare products and services for a healthier tomorrow.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Shastho-Mart. All rights reserved.",
  legalLinks = defaultLegalLinks,
  className,
}: Footer7Props) => {
  return (
    <section className={cn("py-16 border-t", className)}>
      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full max-w-sm flex-col justify-between gap-4 lg:items-start">
            <Link href={logo.url} className="text-xl font-bold">
              {logo.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a href="tel:+8801000000000" className="hover:text-primary">
                  +880 1000-000000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a href="mailto:support@shasthomart.com" className="hover:text-primary">
                  support@shasthomart.com
                </a>
              </li>
            </ul>

            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 sm:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <Link href={link.href}> {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Footer };