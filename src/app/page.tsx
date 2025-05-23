'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // For loading spinner

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to humanize.");
      setOutputText("");
      return;
    }
    setIsLoading(true);
    setOutputText("");
    setError(null);

    try {
      const response = await fetch("/api/humanize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.statusText}`);
      }
      
      setOutputText(data.humanizedText);
    } catch (e) {
      console.error("Failed to humanize text:", e);
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(`Failed to humanize text: ${errorMessage}`);
      setOutputText("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-800 dark">
      <Card className="w-full max-w-2xl shadow-2xl bg-slate-900/80 backdrop-blur-sm border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-sky-400">
            Humanize This
          </CardTitle>
          <CardDescription className="text-slate-400 pt-2">
            Transform AI-generated text into more natural, human-like content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid w-full gap-2">
            <Label htmlFor="inputText" className="text-slate-300 font-semibold">
              Your AI Text
            </Label>
            <Textarea
              id="inputText"
              placeholder="Paste your AI-generated text here..."
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
              disabled={isLoading}
              className="min-h-[150px] bg-slate-800 border-slate-700 text-slate-50 focus:ring-sky-500 resize-y"
            />
          </div>
          <Button
            onClick={handleHumanize}
            disabled={isLoading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-slate-900 font-bold text-lg py-6 transition-all duration-150 ease-in-out transform hover:scale-105 active:scale-95 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Humanizing...
              </>
            ) : (
              "Humanize It!"
            )}
          </Button>
        </CardContent>
        {(outputText || error) && (
          <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t border-slate-700">
            {error && (
              <div className="w-full p-3 rounded-md bg-red-900/50 border border-red-700 text-red-300">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
              </div>
            )}
            {outputText && (
              <div className="w-full">
                <Label htmlFor="outputText" className="text-slate-300 font-semibold mb-2 block">
                  Humanized Result
                </Label>
                <Textarea
                  id="outputText"
                  value={outputText}
                  readOnly
                  className="min-h-[150px] bg-slate-800/70 border-slate-700 text-slate-200 focus:ring-sky-500 resize-y"
                  placeholder="Your humanized text will appear here..."
                />
              </div>
            )}
          </CardFooter>
        )}
      </Card>
      <footer className="mt-8 text-center">
        <p className="text-xs text-slate-500">
          Powered by Next.js & Shadcn/UI
        </p>
      </footer>
    </main>
  );
}
