"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BadgeSelectInput } from "@/components/BadgeSelectInput";
import { FormFieldLabel } from "@/components/FormFieldLabel";
import { useCategories } from "@/hooks/api/useCategories";
import { useCurrencies } from "@/hooks/api/useCurrencies";
import { usePaymentMethods } from "@/hooks/api/usePaymentMethods";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  amount: z.coerce.number().min(0, {
    message: "Must be non-negative",
  }),
  date: z.date(),
  memo: z.string(),
  categoryId: z.string(),
  paymentMethodId: z.string(),
  currencyId: z.string(),
});

export function ExpensesForm({}: {}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      memo: "",
    },
  });
  const { watch, setValue } = form;

  const { isFetching: categoriesIsFetching, data: categories } =
    useCategories();
  const { isFetching: paymentMethodsIsFetching, data: paymentMethods } =
    usePaymentMethods();
  const { isFetching: currenciesIsFetching, data: currencies } =
    useCurrencies();

  useEffect(() => {
    if (categories && categories.length > 0 && !watch("categoryId")) {
      setValue("categoryId", categories[0].id);
    }
  }, [categories, watch, setValue]);

  useEffect(() => {
    if (
      paymentMethods &&
      paymentMethods.length > 0 &&
      !watch("paymentMethodId")
    ) {
      setValue("paymentMethodId", paymentMethods[0].id);
    }
  }, [paymentMethods, watch, setValue]);

  useEffect(() => {
    if (currencies && currencies.length > 0 && !watch("currencyId")) {
      setValue("currencyId", currencies[0].id);
    }
  }, [currencies, watch, setValue]);

  const { mutate: createTransaction, isPending } = useMutation({
    mutationFn: (params: object) => axios.post(`/api/transactions`, params),
    onSuccess: (res) => {
      console.log("success", res); // todo: show toast
      router.push("/app/expenses/");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createTransaction(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormFieldLabel>Amount</FormFieldLabel>
              <FormControl>
                <Input placeholder="0.00" type="number" min={0} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormFieldLabel>Memo</FormFieldLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormFieldLabel>Category</FormFieldLabel>
              <BadgeSelectInput
                items={categories ?? []}
                renderLabel={(cat) => cat?.name}
                currentValue={watch("categoryId")}
                isLoading={categoriesIsFetching}
                isEmpty={!(categories && categories.length > 0)}
                keyName="id"
                onSelect={(cat) => setValue("categoryId", cat.id)}
              />

              <FormControl>
                <Input type="text" className="hidden" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormFieldLabel>Date</FormFieldLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
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
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethodId"
          render={() => (
            <FormItem>
              <FormFieldLabel>Payment Method</FormFieldLabel>
              <BadgeSelectInput
                items={paymentMethods ?? []}
                renderLabel={(pm) => pm?.name}
                currentValue={watch("paymentMethodId")}
                isLoading={paymentMethodsIsFetching}
                isEmpty={!(paymentMethods && paymentMethods.length > 0)}
                keyName="id"
                onSelect={(pm) => setValue("paymentMethodId", pm.id)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <FormItem>
              <FormFieldLabel>Currency</FormFieldLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={watch("currencyId")}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currenciesIsFetching ? (
                      <SelectItem disabled value=" ">
                        Loading...
                      </SelectItem>
                    ) : !currencies || currencies.length <= 0 ? (
                      <SelectItem disabled value=" ">
                        No available items
                      </SelectItem>
                    ) : (
                      currencies.map((currency) => (
                        <SelectItem key={currency.id} value={currency.id}>
                          {currency.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={isPending} type="submit">
          {isPending ? "Please wait..." : "Add"}
        </Button>
      </form>
    </Form>
  );
}
