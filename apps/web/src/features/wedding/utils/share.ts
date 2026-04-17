import { weddingContent } from "../data/wedding-content";

export async function shareWeddingInvitation(fallbackCopy: (text: string) => void) {
  const url = window.location.href;

  if (navigator.share) {
    await navigator.share({
      title: weddingContent.share.title,
      text: weddingContent.share.text,
      url,
    });
    return;
  }

  fallbackCopy(url);
}
