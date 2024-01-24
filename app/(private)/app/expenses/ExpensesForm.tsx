"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

// id              String         @id @default(cuid())
// date            DateTime
// amount          Int
// memo            String?
// category        Category?      @relation(fields: [categoryId], references: [id])
// categoryId      String?
// user            User?          @relation(fields: [userId], references: [id])
// userId          String?
// paymentMethod   PaymentMethod? @relation(fields: [paymentMethodId], references: [id])
// paymentMethodId String?
// currency        Currency      @relation(fields: [currencyId], references: [id])
// currencyId      String
// createdAt       DateTime       @default(now())

const formSchema = z.object({
  amount: z.coerce.number().min(0, {
    message: "Must be non-negative",
  }),
  date: z.date(),
  memo: z.string(),
  categoryId: z.string().optional(),
  paymentMethodId: z.string().optional(),
  currencyId: z.string(),
});

export function ExpensesForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      memo: "",
      currencyId: "MYR",
    },
  });

  const { watch } = form;
  const watchAll = watch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = {
      ...values,
      userId: "TODO",
    };

    console.log(params);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="0" type="number" min={0} {...field} />
              </FormControl>
              <FormDescription>How much?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memo</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Describe this transaction</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="anothercat">Another Cat</SelectItem>
                    <SelectItem value="anothercat2">Another Cat 2</SelectItem>
                    <SelectItem value="anothercat3">Another Cat 3</SelectItem>
                    <SelectItem value="anothercat4">Another Cat 4</SelectItem>
                    <SelectItem value="anothercat5">Another Cat 5</SelectItem>
                    <SelectItem value="anothercat6">Another Cat 6</SelectItem>
                    <SelectItem value="anothercat7">Another Cat 7</SelectItem>
                    <SelectItem value="anothercat8">Another Cat 8</SelectItem>
                    <SelectItem value="anothercat9">Another Cat 9</SelectItem>
                    <SelectItem value="anothercat10">Another Cat 10</SelectItem>
                    <SelectItem value="anothercat11">Another Cat 11</SelectItem>
                    <SelectItem value="anothercat12">Another Cat 12</SelectItem>
                    <SelectItem value="anothercat13">Another Cat 13</SelectItem>
                    <SelectItem value="anothercat14">Another Cat 14</SelectItem>
                    <SelectItem value="anothercat15">Another Cat 15</SelectItem>
                    <SelectItem value="anothercat16">Another Cat 16</SelectItem>
                    <SelectItem value="anothercat17">Another Cat 17</SelectItem>
                    <SelectItem value="anothercat18">Another Cat 18</SelectItem>
                    <SelectItem value="anothercat19">Another Cat 19</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select a category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
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
              <FormDescription>When did you buy it?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethodId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="anothercat">Another Cat</SelectItem>
                    <SelectItem value="anothercat2">Another Cat 2</SelectItem>
                    <SelectItem value="anothercat3">Another Cat 3</SelectItem>
                    <SelectItem value="anothercat4">Another Cat 4</SelectItem>
                    <SelectItem value="anothercat5">Another Cat 5</SelectItem>
                    <SelectItem value="anothercat6">Another Cat 6</SelectItem>
                    <SelectItem value="anothercat7">Another Cat 7</SelectItem>
                    <SelectItem value="anothercat8">Another Cat 8</SelectItem>
                    <SelectItem value="anothercat9">Another Cat 9</SelectItem>
                    <SelectItem value="anothercat10">Another Cat 10</SelectItem>
                    <SelectItem value="anothercat11">Another Cat 11</SelectItem>
                    <SelectItem value="anothercat12">Another Cat 12</SelectItem>
                    <SelectItem value="anothercat13">Another Cat 13</SelectItem>
                    <SelectItem value="anothercat14">Another Cat 14</SelectItem>
                    <SelectItem value="anothercat15">Another Cat 15</SelectItem>
                    <SelectItem value="anothercat16">Another Cat 16</SelectItem>
                    <SelectItem value="anothercat17">Another Cat 17</SelectItem>
                    <SelectItem value="anothercat18">Another Cat 18</SelectItem>
                    <SelectItem value="anothercat19">Another Cat 19</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select a payment method</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currencyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MYR">Malaysian Ringgit</SelectItem>
                    <SelectItem value="anothercat">Another Cat</SelectItem>
                    <SelectItem value="anothercat2">Another Cat 2</SelectItem>
                    <SelectItem value="anothercat3">Another Cat 3</SelectItem>
                    <SelectItem value="anothercat4">Another Cat 4</SelectItem>
                    <SelectItem value="anothercat5">Another Cat 5</SelectItem>
                    <SelectItem value="anothercat6">Another Cat 6</SelectItem>
                    <SelectItem value="anothercat7">Another Cat 7</SelectItem>
                    <SelectItem value="anothercat8">Another Cat 8</SelectItem>
                    <SelectItem value="anothercat9">Another Cat 9</SelectItem>
                    <SelectItem value="anothercat10">Another Cat 10</SelectItem>
                    <SelectItem value="anothercat11">Another Cat 11</SelectItem>
                    <SelectItem value="anothercat12">Another Cat 12</SelectItem>
                    <SelectItem value="anothercat13">Another Cat 13</SelectItem>
                    <SelectItem value="anothercat14">Another Cat 14</SelectItem>
                    <SelectItem value="anothercat15">Another Cat 15</SelectItem>
                    <SelectItem value="anothercat16">Another Cat 16</SelectItem>
                    <SelectItem value="anothercat17">Another Cat 17</SelectItem>
                    <SelectItem value="anothercat18">Another Cat 18</SelectItem>
                    <SelectItem value="anothercat19">Another Cat 19</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select a currency</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
