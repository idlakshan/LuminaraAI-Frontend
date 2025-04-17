import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateHotelMutation } from "@/redux/features/hotel/hotelApi";
import { useState } from "react";
import { toast } from "sonner";


const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  image: z.instanceof(FileList).refine((files) => files?.length === 1, "Image is required"),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const CreateHotelForm = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      image: undefined,
      price: 0,
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Creating hotel...");

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('location', values.location);
      formData.append('price', values.price.toString());
      formData.append('description', values.description);
      formData.append('image', values.image[0]);

      await createHotel(formData).unwrap();

      toast.success("Hotel created successfully", {
        id: toastId
      })
      
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Hotel creation failed", {
        id: toastId,
       });
       
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {

  };

  const handleDelete = async () => {

  };

  return (
    <Form {...form}>
      <form className="w-1/2 grid gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl>
                <Input placeholder="Hotel Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>Hotel Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...rest}
                />
              </FormControl>
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
                <Input type="number" step="0.01" placeholder="Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 mt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Hotel"}
          </Button>
          <Button type="button" onClick={handleUpdate}>
            Update Hotel
          </Button>
          <Button type="button" onClick={handleDelete}>
            Delete Hotel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;