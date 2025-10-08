import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" style={{ display: "inline-block" }}>
      <Image
        src="/images/divvyfi-logo.png"
        alt="DivvyFi Logo"
        width={250}
        height={100}
        priority
        quality={100}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: "250px",
          display: "block",
        }}
      />
    </Link>
  );
};

export default Logo;
