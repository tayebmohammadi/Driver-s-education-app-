import Image from "next/image";

export function PublicAppShowcase() {
  return (
    <div className="public-app-showcase" aria-label="App preview">
      <Image
        src="/marketing/app-showcase.png"
        alt="DriveEasy app showing Theory study modules and Driving instructor booking side by side"
        width={1024}
        height={768}
        className="public-app-showcase__image"
        priority
        unoptimized
      />
    </div>
  );
}
