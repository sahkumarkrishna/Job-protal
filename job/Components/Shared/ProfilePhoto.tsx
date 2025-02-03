import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ProfilePhotoProps {
  src?: string; // Optional string for the image source
}

const ProfilePhoto = ({ src }: ProfilePhotoProps) => {
  return (
    <div>
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={src || "https://github.com/shadcn.png"}
          alt="profile photo"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfilePhoto;
