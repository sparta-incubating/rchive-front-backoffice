export const removeMarkdown = (text: string) => {
  return (
    text
      // Remove headers (e.g., ##, ###)
      .replace(/^#+\s/gm, '')
      // Remove bold (**text** or __text__)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      // Remove links [text](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      // Remove images ![alt](url) and inline image text
      .replace(/!\[.*?\]\(([^)]+)\)/g, '') // Remove markdown image
      .replace(/!\S+\.(jpg|jpeg|png|gif)/g, '') // Remove inline image text
      // Remove videos (e.g., video.mp4)
      .replace(/\b\S+?\.(mp4|webm|ogg)\b/g, '') // Remove video links
      // Remove <details> and <summary> tags and their contents
      .replace(/<details>[\s\S]*?<\/details>/g, '')
      // Remove inline code `code`
      .replace(/`([^`]+)`/g, '$1')
      // Remove lists (-, *)
      .replace(/^\s*[-*]\s+/gm, '')
      // Remove extra line breaks and whitespace
      .replace(/\n{2,}/g, '\n')
      .trim()
  );
};
