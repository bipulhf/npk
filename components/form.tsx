"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type ChatData = {
  content: string;
  role: "user" | "assistant" | "system" | "model";
  date: Date;
};

export default function ChatForm() {
  const ref = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState<ChatData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState("");
  const [isFirst, setFirst] = useState(true);
  const [npk, setNPK] = useState({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
  });

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [chat]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let singleChat: ChatData;

    if (isFirst) {
      setFirst(false);
      singleChat = {
        role: "user",
        content: `I have this much nitrogen ${npk.nitrogen} mg/kg, phosphorus ${npk.phosphorus} mg/kg, and potassium ${npk.potassium} mg/kg in my soil. What crops should I plant?`,
        date: new Date(),
      };
    } else {
      singleChat = {
        role: "user",
        content: formData,
        date: new Date(),
      };
    }

    setChat((chat) => [...chat, singleChat]);
    setLoading(true);
    const response = await (
      await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify(singleChat.content),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    const assistantChat: ChatData = {
      role: "assistant",
      content: response,
      date: new Date(),
    };
    setLoading(false);
    setChat((chat) => [...chat, assistantChat]);
    setFormData("");
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute text-justify bottom-10 mb-10 w-full overflow-auto h-[85%] px-3 scroll">
        {chat.length > 0 ? (
          chat.map((singleChat) => (
            <div
              key={singleChat.date.toString()}
              className={`${
                singleChat.role === "user" ? "bg-gray-100" : "bg-slate-200"
              } rounded-xl p-4 mb-4`}
            >
              <p className="text-gray-400 text-[11px]">
                {singleChat.role.toUpperCase()} .{" "}
                {singleChat.date.toLocaleTimeString()}
              </p>
              <ReactMarkdown>{singleChat.content}</ReactMarkdown>
            </div>
          ))
        ) : (
          <p className="text-gray-300 text-3xl w-full text-center">
            Insert <span className="font-bold">NPK</span> Value
          </p>
        )}
        {isLoading && (
          <div className="bg-slate-200 rounded-xl p-4 mb-4">
            <p className="text-gray-400 text-[11px]">Thinking ...</p>
          </div>
        )}
        <form
          className={`mt-5 flex flex-col gap-4 items-center ${
            !isFirst ? `hidden` : ``
          } justify-center`}
          onSubmit={handleSubmit}
        >
          <div className="flex w-full">
            <label className="w-[30%] text-md text-center">
              Nitrogen (mg/kg)
            </label>
            <Input
              name="nitrogen"
              className="focus-visible:ring-transparent mr-5"
              placeholder="Enter nitrogen value (mg/kg)..."
              onChange={(event) =>
                setNPK({ ...npk, nitrogen: parseFloat(event.target.value) })
              }
              value={npk.nitrogen}
              autoComplete="false"
              type="number"
              step={0.01}
            />
          </div>
          <div className="flex w-full">
            <label className="w-[30%] text-md text-center">
              Phosphorus (mg/kg)
            </label>
            <Input
              name="phosphorus"
              className="focus-visible:ring-transparent mr-5"
              placeholder="Enter phosphorus value (mg/kg)..."
              onChange={(event) =>
                setNPK({ ...npk, phosphorus: parseFloat(event.target.value) })
              }
              value={npk.phosphorus}
              autoComplete="false"
              type="number"
              step={0.01}
            />
          </div>
          <div className="flex w-full">
            <label className="w-[30%] text-md text-center">
              Potassium (mg/kg)
            </label>
            <Input
              name="potassium"
              className="focus-visible:ring-transparent mr-5"
              placeholder="Enter potassium value (mg/kg)..."
              onChange={(event) =>
                setNPK({ ...npk, potassium: parseFloat(event.target.value) })
              }
              value={npk.potassium}
              autoComplete="false"
              type="number"
              step={0.01}
            />
          </div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <div ref={ref} />
      </div>

      <form
        className={`flex md:w-[60%] bottom-0 fixed bg-white ${
          isFirst ? `hidden` : ``
        } pb-10 pt-3`}
        onSubmit={handleSubmit}
      >
        <Input
          name="prompt"
          className="focus-visible:ring-transparent mr-5"
          placeholder="Enter your prompt..."
          onChange={(event) => setFormData(event.target.value)}
          value={formData}
          autoComplete="false"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
