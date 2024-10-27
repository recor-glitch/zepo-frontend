"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { DualRangeSlider } from "@/components/slider/multi-range-slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const PropertyFilterSchema = z.object({
  propertyTypes: z
    .array(z.string())
    .min(1, { message: "Select at least one property type" }),
  beds: z
    .array(z.number())
    .min(1, { message: "Select at least one bed option" }),
  priceRange: z.tuple([z.number().min(0), z.number().max(10000)]),
});

type PropertyFilterFormData = z.infer<typeof PropertyFilterSchema>;

const propertyTypeOptions = [
  "Apartment",
  "House",
  "Condo",
  "Townhouse",
  "Studio",
];
const bedOptions = [1, 2, 3, 4, 5];

export function PropertyFilterForm() {
  const form = useForm<PropertyFilterFormData>({
    resolver: zodResolver(PropertyFilterSchema),
    defaultValues: {
      propertyTypes: [],
      beds: [],
      priceRange: [0, 10000],
    },
  });

  const [minMaxValues, setMinMaxValues] = useState([500, 10000]);

  const onSubmit = (data: PropertyFilterFormData) => {
    console.log("Filter submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full p-default overflow-y-auto"
      >
        {/* Price Range Slider */}
        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-text-normal font-bold text-md-subtitle-primary">
                Price Range
              </FormLabel>
              <FormControl>
                <DualRangeSlider
                  className="pt-8"
                  label={(value) => value}
                  value={minMaxValues}
                  onValueChange={setMinMaxValues}
                  min={500}
                  max={10000}
                  step={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Property Type Checklist */}
        <FormField
          control={form.control}
          name="propertyTypes"
          render={() => (
            <FormItem>
              <FormLabel className="text-text-normal font-bold text-md-subtitle-primary">
                Property Types
              </FormLabel>
              <div className="space-y-2">
                {propertyTypeOptions.map((type) => (
                  <FormField
                    key={type}
                    control={form.control}
                    name="propertyTypes"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(type)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...field.value, type]
                                  : field.value.filter((item) => item !== type)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{type}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        {/* Beds Checklist */}
        <FormField
          control={form.control}
          name="beds"
          render={() => (
            <FormItem>
              <FormLabel className="text-text-normal font-bold text-md-subtitle-primary">
                Beds
              </FormLabel>
              <div className="space-y-2">
                {bedOptions.map((bed) => (
                  <FormField
                    key={bed}
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(bed)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...field.value, bed]
                                  : field.value.filter((item) => item !== bed)
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel>{bed} Beds</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <Button type="submit" className="filledBtn w-full">
          Apply Filters
        </Button>
      </form>
    </Form>
  );
}
