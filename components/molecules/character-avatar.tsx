import Image from "next/image";

interface CharacterAvatarProps {
  image?: string | null;
  name: string;
}

export function CharacterAvatar({ image, name }: CharacterAvatarProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={52}
        height={52}
        className="rounded-xl object-cover"
      />
    );
  }

  return <div className="size-13 rounded-full bg-zinc-200" />;
}
