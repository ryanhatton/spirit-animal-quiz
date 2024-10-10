"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formSchema,
  FormData,
  calculateScore,
  getSpiritAnimal,
} from "@/lib/validationSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ResultsCard } from "./ResultsCard";
import { Separator } from "@/components/ui/separator";

export function SpiritAnimalForm() {
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      morningPerson: undefined,
      favoriteSnack: undefined,
      favoriteSeason: undefined,
      idealActivity: undefined,
      competitiveness: 5,
      selectedDate: undefined,
      agreeToTerms: false,
    },
    mode: "onChange",
  });

  const requiredFields: Array<keyof FormData> = [
    "morningPerson",
    "favoriteSnack",
    "favoriteSeason",
    "idealActivity",
    "competitiveness",
    "selectedDate",
    "agreeToTerms",
  ];

  const onSubmit: SubmitHandler<FormData> = useCallback(
    (data) => {
      const score = calculateScore(data);
      const spiritAnimal = getSpiritAnimal(score);
      setResult(spiritAnimal);
    },
    [setResult]
  );

  const resetForm = useCallback(() => {
    form.reset();
    setResult(null);
    setProgress(0);
  }, [form]);

  const updateProgress = useCallback(() => {
    const values = form.getValues();
    const filledFields = requiredFields.reduce((count, field) => {
      const value = values[field];
      if (typeof value === "string") {
        return count + (value.trim() !== "" ? 1 : 0);
      } else if (typeof value === "number") {
        return count + (value !== undefined && value !== null ? 1 : 0);
      } else if (value instanceof Date) {
        return count + (!isNaN(value.getTime()) ? 1 : 0);
      } else if (typeof value === "boolean") {
        return count + (value === true ? 1 : 0);
      }
      return count;
    }, 0);
    setProgress((filledFields / requiredFields.length) * 100);
  }, [form, requiredFields]);

  useEffect(() => {
    const subscription = form.watch(() => {
      updateProgress();
    });
    return () => subscription.unsubscribe();
  }, [form, updateProgress]);

  if (result) {
    return <ResultsCard spiritAnimal={result} onReset={resetForm} />;
  }

  return (
    <Card className="w-full max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-center">Spirit Animal Quiz</CardTitle>
        <CardDescription className="text-center">
          Answer the questions to find your spirit animal!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={progress}
          className={`mb-4 transition-colors duration-300 ${
            progress === 100 ? "bg-green-500" : "bg-secondary"
          }`}
          aria-label="Quiz progress"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              {/* Morning Person */}
              <FormField
                control={form.control}
                name="morningPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you a morning person?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-row space-x-2"
                        aria-label="Morning person"
                      >
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="yes" id="morning-yes" />
                          <Label htmlFor="morning-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-1">
                          <RadioGroupItem value="no" id="morning-no" />
                          <Label htmlFor="morning-no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Favorite Snack */}
              <FormField
                control={form.control}
                name="favoriteSnack"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's your favorite type of snack?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        aria-label="Favorite snack"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a snack type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sweet">Sweet</SelectItem>
                          <SelectItem value="savory">Savory</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Favorite Season */}
              <FormField
                control={form.control}
                name="favoriteSeason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What's your favorite season?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        aria-label="Favorite season"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spring">Spring</SelectItem>
                          <SelectItem value="summer">Summer</SelectItem>
                          <SelectItem value="autumn">Autumn</SelectItem>
                          <SelectItem value="winter">Winter</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ideal Activity */}
              <FormField
                control={form.control}
                name="idealActivity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      What's your ideal activity on your day off?
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        aria-label="Ideal activity"
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reading">Reading</SelectItem>
                          <SelectItem value="hiking">Hiking</SelectItem>
                          <SelectItem value="cooking">Cooking</SelectItem>
                          <SelectItem value="gaming">Gaming</SelectItem>
                          <SelectItem value="socializing">
                            Socializing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Competitiveness */}
              <FormField
                control={form.control}
                name="competitiveness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      On a scale of 1-10, how competitive are you?{"  "}
                      <span className="text-center font-semibold text-sm bg-gray-200 text-primary p-1 rounded-md">
                        {field.value}
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        aria-label="Competitiveness slider"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              {/* Select Today's Date */}
              <FormField
                control={form.control}
                name="selectedDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select today's date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                            aria-label="Select date"
                          >
                            {field.value ? (
                              format(field.value, "yyyy-MM-dd")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Agree to Terms */}
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-label="Agree to terms and conditions"
                        />
                      </FormControl>
                      <FormLabel className="flex-1">
                        I agree to the terms and conditions
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}