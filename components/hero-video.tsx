import Image from "next/image";
import Link from "next/link";

export function HeroVideo() {
  return (
    <div className="relative mx-auto aspect-[608/336] w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_80px_rgba(0,255,136,0.08)]">
      <Image
        src="/speak-to-toby.jpg"
        alt="Toby Sinclair in a live conversation"
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-center"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/speak-to-toby.jpg"
        aria-hidden
      >
        <source src="/speak-to-toby.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 md:p-5">
        <Link href="/talk-with-toby" className="btn-primary shadow-[0_8px_32px_rgba(0,255,136,0.28)]">
          Speak to Toby
        </Link>
      </div>
    </div>
  );
}
