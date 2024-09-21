"use client";

import { CATEGORIES } from "@/categories.data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageInput } from "@/features/images/ImageInput";
import { getId } from "@/lib/id";
import { getItem } from "@/lib/items/get-item";
import { setItem } from "@/lib/items/set-item";
import { useUserStore } from "@/lib/store/use-user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(2).max(50).optional(),
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  price: z.coerce.number().min(0).max(1000),
  image: z.any(),
});

// itemId === new => Créer un nouvelle item
// itemId = récupère cette item pour le modifier !
export default function ItemIdPage({ params }) {
  const isAdmin = useUserStore((s) => s.isAdmin);

  const { data, isLoading } = useSWR(`/item/${params.itemId}`, async () => {
    if (params.itemId === "new") return null;

    return getItem(params.itemId);
  });

  console.log({ data, isLoading, params });

  if (!isAdmin) {
    return (
      <Alert>
        <User size={12} />
        <AlertTitle>You are not authorized to view this page.</AlertTitle>
        <AlertDescription>Only admin can.</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Create item</h1>
      <ItemForm defaultItem={data} />
    </div>
  );
}

const ItemForm = ({ defaultItem }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultItem
      ? {
          ...defaultItem,
          price: defaultItem.price / 100,
        }
      : null,
  });

  const router = useRouter();

  function onSubmit(values) {
    const id = defaultItem ? defaultItem.id : getId(values.name);
    setItem(id, {
      name: values.name,
      price: values.price * 100,
      category: values.category,
      image: values.image,
    });
    mutate((key) => typeof key === "string" && key.startsWith("/item"));
    mutate(`/item/${id}`);
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem value={c.id} key={c.id}>
                      <div className="flex items-center gap-2">
                        <Image src={c.logo} width={24} height={24} />
                        <span>{c.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="22.2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageInput image={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
