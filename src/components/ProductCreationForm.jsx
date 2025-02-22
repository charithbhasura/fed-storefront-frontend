import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useCreateProductMutation } from "@/lib/api";
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  description: z.string().min(1),
  stockQuantity: z.number().min(0),
  lowStockThreshold: z.number().min(1).optional(),
  Image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const ProductCreationForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [createProduct] = useCreateProductMutation();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  
  function handleSubmit(values) {
    createProduct({
      productInfo: {
        name: values.name,
        price: values.price,
        image: values.image,
        description: values.description,
      },
    });
    navigate("/shop");
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImagePreview(URL.createObjectURL(file));
    form.setValue('image', file);
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div className="container mx-auto px-4 py-8 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
         
          <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
                        hover:border-primary transition-colors`}
                    >
                      <input {...getInputProps()} />
                      {imagePreview ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-40 object-contain mb-4"
                          />
                          <p className="text-sm text-gray-500">
                            Click or drag to replace image
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <p className="text-gray-600">
                            Drag & drop an image here, or click to select
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          <div className="grid grid-cols-3 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="macbook pro" {...field} />
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
                    <Input placeholder="799$" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Stock Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
                    <Input className="h-20 max-w-screen-2xl" placeholder="@loream ipsum" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
           
          </div>
          <div className="mt-4">
            <Button type="submit"
            onClick={() => {
              if (form.getValues('name') === '' || form.getValues('price') === '' || form.getValues('description') === '' || form.getValues('image') === '') {
                toast.error("Please fill all the fields");
                return;
              }
              toast.success("Product Item Added Successfully");
            }}
            >Add Product Item</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ProductCreationForm;