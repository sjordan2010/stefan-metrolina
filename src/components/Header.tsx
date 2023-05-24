import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed bg-white w-full h-20 flex z-10">
      <Image alt="Metrolina Greenhouses logo" src="MetrolinaGreenhouses_logo.svg" width={300} height={50} />
    </header>
  );
}
