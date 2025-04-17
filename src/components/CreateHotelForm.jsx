import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const formSchema = z.object({
  name: z.string().min(1, { message: "Hotel name is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  image: z.string().min(1, { message: "Image URL is required" }),
  price: z.coerce.number({ message: "Price must be a number" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const CreateHotelForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      image: "",
      price: 0,
      description: "",
    },
  });

  const handleSubmit = async (values) => {
    
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
          render={({ field: { onChange, ...rest } }) => (
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
          <Button type="submit">Create Hotel</Button>
          <Button type="button" onClick={handleUpdate}>Update Hotel</Button>
          <Button type="button" onClick={handleDelete}>Delete Hotel</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateHotelForm;
