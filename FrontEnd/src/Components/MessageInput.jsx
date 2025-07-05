import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.log("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="w-full p-4">
      {imagePreview && (
        <div className="flex items-center mb-2 gap">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover w-20 h-20 border rounded-lg border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex items-center flex-1 gap-2">
          <input
            type="text"
            className="w-full rounded-lg input input-bordered input-sm sm:input:md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            } `}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={22} />
          </button>
        </div>
        <button
          type="button"
          className="flex items-center justify-center btn btn-sm btn-circle size-8"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} className="flex items-center justify-center" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
