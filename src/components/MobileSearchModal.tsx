
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";

interface MobileSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({ open, onOpenChange }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
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
        className="p-0 bg-black h-screen max-w-full !rounded-none border-0"
        showClose={false}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center px-4 pt-8 pb-4 bg-black"
        >
          <button
            type="button"
            aria-label="Back"
            className="mr-2 p-2"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="text-gray-400 w-6 h-6" />
          </button>
          <Input
            ref={inputRef}
            className="flex-1 h-11 rounded-xl bg-[#181B20] border border-[#23272F] text-white text-base placeholder:text-gray-400 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
          />
        </form>
        {/* Optional: Add recent searches, suggestion here */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearchModal;
