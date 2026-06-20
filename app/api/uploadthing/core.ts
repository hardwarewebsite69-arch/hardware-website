import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  quoteUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "8MB" },
    text: { maxFileSize: "4MB" },
    blob: { maxFileSize: "16MB" },
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for file:", file.name);
      console.log("File URL:", file.url);
      return { url: file.url, name: file.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
