import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const donationSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  message: z.string().max(200, "Mensagem deve ter no máximo 200 caracteres"),
  price: z.enum(["15", "25", "35", "50", "100"], {
    required_error: "Selecione um valor",
  })
})

type DonationFormDataSchema = z.infer<typeof donationSchema>;

export default function FormDonation() {
  const form = useForm<DonationFormDataSchema>({
    resolver: zodResolver(donationSchema),
  });
  // const navigate = useNavigate();

  function onSubmit(data: DonationFormDataSchema) {
    console.log(data);
    // navigate("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-5 bg-white border-2 border-gray-100 rounded-lg p-5 md:w-[70%] lg:w-[60%]">
        <h1 className="text-center text-2xl font-semibold text-gray-600">Doação</h1>
        <span></span>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite sua mensagem" {...field} className="h-32 resize-none"/>
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
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex items-center gap-4"
                >

                  {["15", "25", "35", "50", "100"].map((value) => (
                    <div key={value} className="flex items-center gap-1">
                      <RadioGroupItem value={value} id={value}/>
                      <Label htmlFor={value}>R$ {value}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size={"sm"}
          className='bg-blue-500 hover:bg-blue-600 cursor-pointer w-[100%] flex m-auto'
          type="submit"
        >
          Doar
        </Button>
      </form>
    </Form>
  )
}