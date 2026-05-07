import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AssetAgreementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onCancel: () => void;
}

export function AssetAgreementDialog({ open, onOpenChange, onAccept, onCancel }: AssetAgreementDialogProps) {
  const [agreementScrolled, setAgreementScrolled] = useState(false);
  const [canConfirm, setCanConfirm] = useState(false);

  useEffect(() => {
    if (open) {
      setAgreementScrolled(false);
      setCanConfirm(false);
      const timer = setTimeout(() => {
        setCanConfirm(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleAgreementScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!agreementScrolled) {
      setAgreementScrolled(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Asset Liability Agreement</DialogTitle>
          <DialogDescription className="pt-2 text-zinc-600">
            Please carefully read the following agreement regarding your rights and legal obligations for the materials you upload.
            You must scroll through the agreement before you can confirm.
          </DialogDescription>
        </DialogHeader>
        
        <div 
          className="h-[40vh] overflow-y-auto p-4 border border-zinc-200 rounded-xl bg-zinc-50 text-sm text-zinc-700 space-y-4"
          onScroll={handleAgreementScroll}
        >
          <h4 className="font-semibold text-zinc-900">1. Acceptance of Terms</h4>
          <p>By uploading any digital assets (including but not limited to images, videos, and audio files, collectively referred to as "Materials") into the Seedance 2.0 platform, you agree to be bound by the terms of this Asset Liability Agreement. If you do not agree to these terms, do not use the upload feature.</p>
          
          <h4 className="font-semibold text-zinc-900">2. Asset Library Creation</h4>
          <p>Upon clicking "Confirm", an <b>Asset Library</b> will be created for your account. All future Materials uploaded or generated within Seedance 2.0 will be securely saved to your personal library, allowing you to easily manage and reuse these assets for subsequent creations. You understand that these assets are temporarily stored to facilitate your workflow.</p>
          
          <h4 className="font-semibold text-zinc-900">3. User Warranties and Representations</h4>
          <p>You represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You own all necessary rights, title, and interest in and to the Materials, or you have obtained all necessary licenses, permissions, and consents to use and upload the Materials.</li>
            <li>The Materials do not infringe, misappropriate, or violate a third party's patent, copyright, trademark, trade secret, moral rights, or other intellectual property rights, or rights of publicity or privacy.</li>
            <li>The Materials do not violate any applicable law or regulation, and are not defamatory, obscene, pornographic, vulgar, or offensive.</li>
          </ul>

          <h4 className="font-semibold text-zinc-900">4. Assumption of Liability</h4>
          <p>You assume full legal responsibility and liability for all Materials you upload, store, or process using Seedance 2.0. The platform providers assume no responsibility for the content you upload, generate, or share. You agree to indemnify and hold harmless the platform and its affiliates from any claims, damages, liabilities, costs, and expenses arising from your uploaded Materials.</p>

          <h4 className="font-semibold text-zinc-900">5. Right to Remove Content</h4>
          <p>We reserve the right, but are not obligated, to review, monitor, and remove any Materials at our sole discretion, at any time, for any reason, particularly if they violate this agreement or applicable laws.</p>

          <p className="pt-4 text-xs italic text-zinc-500">Document generated for Seedance 2.0 Asset Management System. End of agreement.</p>
        </div>

        <DialogFooter className="mt-4 flex sm:justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50" 
            onClick={onAccept}
            disabled={!canConfirm}
          >
            {canConfirm ? "I Agree and Confirm" : "Please scroll to read (5s)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
