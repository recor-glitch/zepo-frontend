"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import ChipSkeleton from "@/components/skeletons/chip/chip-skeleton";
import { DualRangeSlider } from "@/components/slider/multi-range-slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RulesIconMap } from "@/constants";
import { usePropertyFilterContext } from "@/context/property/property-filter/property-filter-content";
import { useGetPropertyRules } from "@/query/propertyQuery";
import { IPropertyRuleWithIcon } from "@/type/dto/property/property-dto";

const PropertyFilterSchema = z.object({
  propertyTypes: z.array(z.string()),
  beds: z.array(z.number()),
  priceRange: z.tuple([z.number().min(0), z.number().max(10000)]),
  rules: z.array(z.number()),
});

type PropertyFilterFormData = z.infer<typeof PropertyFilterSchema>;

const propertyTypeOptions = ["SINGLE", "DOUBLE", "BHK", "VILLA"];
const bedOptions = [1, 2, 3, 4, 5];

export function PropertyFilterForm() {
  const { dispatch, filters } = usePropertyFilterContext();
  const form = useForm<PropertyFilterFormData>({
    resolver: zodResolver(PropertyFilterSchema),
    defaultValues: {
      propertyTypes: filters.property_type || [],
      beds: filters.beds || [],
      priceRange: [filters.min_price || 0, filters.max_price || 10000],
    },
  });

  const [minMaxValues, setMinMaxValues] = useState([500, 10000]);

  const handleClearFilter = () => {
    dispatch({ type: "clearPropertyFilter", payload: {} });
    setMinMaxValues([500, 10000]);
  };

  const {
    data: propertyRules,
    isLoading: RulesLoading,
    isError: RulesError,
  } = useGetPropertyRules({ option: { queryKey: ["getPropertyRules"] } });

  const [rules, setRules] = useState<number[]>([]);

  const [tags, setTags] = useState<IPropertyRuleWithIcon[]>([]);

  useEffect(() => {
    if (propertyRules?.data) {
      setTags(
        propertyRules.data?.rules?.map((rule) => ({
          ...rule,
          icon: RulesIconMap[rule?.rule_name as keyof typeof RulesIconMap],
        }))
      );
    }
  }, [propertyRules]);

  const onSubmit = (data: PropertyFilterFormData) => {
    console.log("On submit form data: ", data, minMaxValues);
    dispatch({
      type: "setPropertyFilter",
      payload: {
        ...filters,
        beds: data.beds,
        min_price: minMaxValues[0],
        max_price: minMaxValues[1],
        property_type: data.propertyTypes,
        rules: data.rules,
      },
    });
  };

  console.log("Form errors: ", form.formState.errors);

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
                            className="text-white bg-white checked:bg-white checked:border-white"
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
                            className="text-white bg-white checked:bg-white checked:border-white"
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

        {/* Rules */}
        <FormField
          control={form.control}
          name="rules"
          render={() => (
            <FormItem>
              <FormLabel className="text-text-normal font-bold text-md-subtitle-primary">
                Rules
              </FormLabel>
              <div className="flex flex-wrap gap-default">
                {RulesLoading
                  ? [...new Array(6).fill(null)].map((item, index) => (
                      <ChipSkeleton key={index} />
                    ))
                  : tags?.map((rule) => (
                      <FormField
                        key={rule.id}
                        control={form.control}
                        name="rules"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                className="text-white bg-white checked:bg-white checked:border-white"
                                checked={field.value?.includes(rule.id)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || []; // Ensure array
                                  field.onChange(
                                    checked
                                      ? [...currentValue, rule.id]
                                      : currentValue.filter(
                                          (item) => item !== rule.id
                                        )
                                  );
                                }}
                              />
                            </FormControl>
                            <FormLabel>{rule.rule_name}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
              </div>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <div className="flex gap-default justify-between items-center">
          <button
            className="outlinedBtn flex-1"
            type="reset"
            onClick={handleClearFilter}
          >
            Clear
          </button>
          <button className="filledBtn flex-1" type="submit">
            Apply
          </button>
        </div>
      </form>
    </Form>
  );
}
