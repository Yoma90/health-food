import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex items-center gap-2 px-4 py-2 border-t">
      <Link href="/" className="inline-flex items-center gap-2">
        <Image
          src="/healthdonals.png"
          alt="Healthdonals"
          width={32}
          height={32}
        />
        <p className="text-sm font-bold">Healthdonals</p>
      </Link>
      <div className="ml-auto"></div>
      <p className="text-xs">
        &copy; {new Date().getFullYear()} Healthdonals. All rights reserved.
      </p>
    </footer>
  );
};
