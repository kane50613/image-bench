import { ImageCard } from "~/components/image-card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center container mx-auto px-4">
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <h1 className="text-4xl sm:text-6xl font-bold">Image Bench</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          See how fast the image generation can be.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <ImageCard provider="next-og" variant="vercel" />
        <ImageCard provider="takumi" variant="vercel" />
      </div>
      {/* <ButtonGroup>
        {objectKeys(variants).map((variant) => (
          <Button key={variant} variant="outline">
            {variants[variant]}
          </Button>
        ))}
      </ButtonGroup> */}
    </main>
  );
}
