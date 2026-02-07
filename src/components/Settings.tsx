import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import string from "@/i18n/en.json";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { DEFAULT_DIFFICULTY, DIFFICULTY } from "@/utils/settings";
import { useSettings } from "@/context/SettingsContext";
import * as z from "zod";

const { title, description, saveSetting, playerName, numberOfCards } =
  string.settings;

const formSchema = z.object({
  playerName: z.string().nonempty("Player name is required"),
  difficulty: z.string().nonempty("Difficulty is required"),
});
export const Settings = () => {
  const { settings, handleUpdateSettings } = useSettings();

  const form = useForm({
    defaultValues: {
      playerName: settings.playerName || "",
      difficulty: settings.difficulty || DEFAULT_DIFFICULTY,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: (form) => {
      handleUpdateSettings(form.value);
    },
  });
  return (
    <div className="max-w-md mx-auto py-8 space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
      <form
        id="game-settings"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="space-y-6 bg-slate-950/30 p-8 rounded-2xl border border-slate-800">
          <div className="space-y-2">
            <form.Field name="playerName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <>
                    <FieldLabel htmlFor="player" className="text-slate-300">
                      {playerName}
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter name..."
                      className="bg-slate-900 border-slate-700 text-white focus:ring-indigo-500"
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </>
                );
              }}
            </form.Field>
          </div>
          <div className="space-y-2">
            <form.Field name="difficulty">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <Label htmlFor="cards" className="text-slate-300">
                      {numberOfCards}
                    </Label>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        className="bg-slate-900 border-slate-700 text-white"
                        aria-invalid={isInvalid}
                      >
                        <SelectValue placeholder="Select count" />
                      </SelectTrigger>
                      <SelectContent
                        position="item-aligned"
                        className="bg-slate-900 border-slate-700 text-white"
                      >
                        {DIFFICULTY.map((cards) => (
                          <SelectItem key={cards} value={cards.toString()}>
                            {cards} Cards ({cards / 2} Pairs)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            </form.Field>
          </div>
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
          >
            <Save className="w-4 h-4 mr-2" />
            {saveSetting}
          </Button>
        </div>
      </form>
    </div>
  );
};
