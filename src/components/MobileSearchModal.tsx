
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface MobileSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure input is focused on modal open and not unfocused until modal closes
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) setSearchQuery(""); // Reset query on close
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onOpenChange(false);
      setSearchQuery("");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="top"
        className="p-0 bg-black h-screen max-w-full !rounded-none border-0 flex flex-col z-[9999]"
      >
        {/* HEADER BAR */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center px-2 pt-6 pb-3 bg-black"
        >
          <button
            type="button"
            aria-label="Back"
            className="mr-2 p-2 rounded-full hover:bg-[#23272F] transition"
            onClick={() => onOpenChange(false)}
            tabIndex={0}
          >
            <ArrowLeft className="text-gray-400 w-6 h-6" />
          </button>
          <Input
            ref={inputRef}
            type="search" // mobile will show Search keyboard
            inputMode="search"
            className="
              flex-1 h-11
              rounded-xl bg-[#181B20]
              border border-[#23272F] 
              text-white text-base 
              placeholder:text-[#757680]
              shadow-none
              focus-visible:ring-0
              focus-visible:ring-offset-0
              px-4
            "
            placeholder="Search Movie"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
        {/* EMPTY FLEX BLOCK TO PUSH KEYBOARD */}
        <div className="flex-1 bg-black" />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSearchModal;

