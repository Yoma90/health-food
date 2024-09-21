import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex items-center gap-2 px-4 py-2 border-b shadow-sm">
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
      <Button
        size="sm"
        variant="outline"
        className="inline-flex gap-2 items-center"
      >
        0
        <ShoppingBasket size={12} />
      </Button>
    </header>
  );
};
