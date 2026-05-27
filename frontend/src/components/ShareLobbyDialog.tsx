import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Share2, QrCode } from "lucide-react";
import { toast } from "sonner";

interface ShareLobbyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
  // Path used to build the join URL, e.g. "/poker" or "/imposter"
  joinPath: string;
  gameLabel: string;
}

export function ShareLobbyDialog({ open, onOpenChange, code, joinPath, gameLabel }: ShareLobbyDialogProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const joinUrl = typeof window !== "undefined"
    ? `${window.location.origin}${joinPath}?code=${encodeURIComponent(code)}`
    : `${joinPath}?code=${encodeURIComponent(code)}`;

  useEffect(() => {
    if (!open) return;
    QRCode.toDataURL(joinUrl, {
      width: 280,
      margin: 1,
      color: { dark: "#0f172a", light: "#ffffff" },
      errorCorrectionLevel: "M",
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(""));
  }, [open, joinUrl]);

  async function copy(text: string, kind: "url" | "code") {
    try {
      await navigator.clipboard.writeText(text);
      if (kind === "url") {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 1500);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 1500);
      }
      toast.success(kind === "url" ? "Link kopiert" : "Code kopiert");
    } catch {
      toast.error("Konnte nicht kopieren");
    }
  }

  async function nativeShare() {
    if (!navigator.share) {
      copy(joinUrl, "url");
      return;
    }
    try {
      await navigator.share({
        title: `${gameLabel} – Lobby ${code}`,
        text: `Tritt meiner ${gameLabel}-Lobby bei! Code: ${code}`,
        url: joinUrl,
      });
    } catch {
      // user cancelled or share blocked – ignore
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="share-lobby-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display tracking-wider">
            <Share2 className="w-5 h-5" /> Lobby teilen
          </DialogTitle>
          <DialogDescription>
            Scan den Code oder teile den Link – Freunde joinen in Sekunden.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 pt-2">
          <div className="rounded-2xl bg-white p-3 shadow-md ring-1 ring-border" data-testid="share-qr-wrapper">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" width={280} height={280} className="block" />
            ) : (
              <div className="w-[280px] h-[280px] flex items-center justify-center text-muted-foreground text-sm">
                QR wird erstellt …
              </div>
            )}
          </div>

          <div className="w-full space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground text-center">
              Lobby-Code
            </div>
            <button
              data-testid="share-copy-code-btn"
              onClick={() => copy(code, "code")}
              className="w-full font-display tracking-[0.4em] text-4xl bg-muted/40 hover:bg-muted/60 transition rounded-xl py-3 flex items-center justify-center gap-3"
            >
              {code}
              {copiedCode ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-4 h-4 opacity-50" />}
            </button>
          </div>

          <div className="w-full space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Link</div>
            <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-xs">
              <QrCode className="w-3 h-3 shrink-0 opacity-60" />
              <span className="truncate flex-1" data-testid="share-join-url">{joinUrl}</span>
              <button
                data-testid="share-copy-url-btn"
                onClick={() => copy(joinUrl, "url")}
                className="shrink-0 hover:opacity-70"
                title="Link kopieren"
              >
                {copiedUrl ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button onClick={nativeShare} className="w-full" size="lg" data-testid="share-native-btn">
            <Share2 className="w-4 h-4 mr-2" /> Teilen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
