import * as z from "zod";

export const formSchema = z.object({
  morningPerson: z.enum(["yes", "no"], {
    required_error: "Please select if you're a morning person.",
  }),
  favoriteSnack: z.enum(["sweet", "savory"], {
    required_error: "Please select your favorite type of snack.",
  }),
  favoriteSeason: z.enum(["spring", "summer", "autumn", "winter"], {
    required_error: "Please select your favorite season.",
  }),
  idealActivity: z.enum(["reading", "hiking", "cooking", "gaming", "socializing"], {
    required_error: "Please select your ideal activity.",
  }),
  competitiveness: z.number().int().min(1).max(10, {
    message: "Competitiveness must be between 1 and 10.",
  }),
  selectedDate: z.date({
    required_error: "Please select today's date.",
  }).refine((date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }, {
    message: "The selected date must be today.",
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

export type FormData = z.infer<typeof formSchema>;

export const calculateScore = (data: FormData): number => {
  let score = 0;

  const scoringRules: Record<string, number> = {
    morningPerson: data.morningPerson === "yes" ? 2 : 0,
    favoriteSnack: data.favoriteSnack === "sweet" ? 2 : 8,
    favoriteSeason:
      data.favoriteSeason === "spring" ? 2 :
      data.favoriteSeason === "summer" ? 10 :
      data.favoriteSeason === "autumn" ? 4 :
      1,
    idealActivity:
      data.idealActivity === "reading" ? 1 :
      data.idealActivity === "hiking" ? 2 :
      data.idealActivity === "cooking" ? 5 :
      data.idealActivity === "gaming" ? 4 :
      10,
  };

  Object.values(scoringRules).forEach((val) => {
    score += val;
  });

  if (data.competitiveness >= 10) score += 25;
  else if (data.competitiveness >= 8) score += 10;
  else if (data.competitiveness >= 5) score += 2;
  else if (data.competitiveness >= 3) score += 1;

  return score;
};

// Function to determine spirit animal based on score
export const getSpiritAnimal = (score: number): string => {
  if (score <= 10) return "Sloth";
  if (score <= 20) return "Owl";
  if (score <= 30) return "Dolphin";
  if (score <= 40) return "Wolf";
  if (score <= 50) return "Eagle";
  return "Lion";
};