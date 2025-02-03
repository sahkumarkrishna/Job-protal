import ProfilePhoto from "./Shared/ProfilePhoto";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";
import { readFileDataUrl } from "@/lib/utils";
import { Images } from "lucide-react";
import { createPostAction } from "@/lib/serveractions";

export function PostDialog({
  setOpen,
  open,
  src,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const postActionHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createPostAction(inputText, selectedFile);
      setOpen(false);
    } catch (error) {
      console.log("Error occurred:", error);
    }
    setInputText("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <ProfilePhoto src={src} />
            <div>
              <h1>Krishna Kumar</h1>
              <p className="text-xs">Post to Anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={postActionHandler}>
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              value={inputText}
              onChange={changeHandler}
              className="border-spacing-10 text-lg focus-visible:ring-0"
              placeholder="Type your message here."
            />

            {selectedFile && (
              <div className="my-4">
                <img
                  src={selectedFile}
                  alt="Selected media preview"
                  width={400}
                  height={400}
                  className="w-full max-w-sm rounded-lg gap-2"
                />
              </div>
            )}

            <DialogFooter className="flex justify-between items-center">
              <Input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />

              <Button
                type="button"
                variant="ghost"
                onClick={() => inputRef.current?.click()}
                className="gap-2"
                aria-label="Upload Media"
              >
                <Images className="text-blue-500" />
                <p>Media</p>
              </Button>

              <Button type="submit">Post</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
