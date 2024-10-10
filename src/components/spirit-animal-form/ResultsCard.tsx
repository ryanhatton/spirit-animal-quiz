import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

interface ResultsCardProps {
  spiritAnimal: string;
  onReset: () => void;
}

export function ResultsCard({ spiritAnimal, onReset }: ResultsCardProps) {
  const imageSrc = `/gifs/spirit-animal-quiz/${spiritAnimal.toLowerCase()}.gif`;
  
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/gifs/spirit-animal-quiz/sloth.gif"; // Default image fallback
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 text-center">
      <CardHeader>
        <CardTitle>Your Spirit Animal is a...</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Image
          src={imageSrc}
          alt={`Spirit Animal: ${spiritAnimal}`}
          width={200}
          height={200}
          className="rounded-lg object-cover"
          onError={handleImageError}
          priority
        />
        <h2 className="text-3xl font-bold mt-4">{spiritAnimal}</h2>
      </CardContent>
      <CardFooter>
        <Button onClick={onReset} className="w-full">
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}