'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { z } from '@/lib/pt-zod'
import { Link2Icon, PlusIcon, TagIcon, Trash2Icon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from '@/components/ui/form'
import InputWithLeadingIcon from '@/components/form-fields/Input-with-leading-icon'
import CustomFormItem from '@/components/ui/custom-form-item'
import { useTrip } from '@/hooks/useTrip'
import { useToast } from '@/components/ui/use-toast'
import { use, useEffect, useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { cn } from '@/lib/utils'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Links } from '@prisma/client'

interface Props {
  tripId: string
  className?: ClassNameValue
}

export default function LinksSection({ tripId, className }: Props) {
  const { trip, registerLink, isRegisteringLink, deleteLink, isDeletingLink, updateLink, isUpdatingLink } = useTrip(tripId)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState<Links | null>(null)
  const { toast } = useToast()

  const formSchema = z.object({
    title: z.string().min(2).max(50),
    url: z.string().url(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  })

  useEffect(() => {
    if (selectedLink) {
      form.reset(selectedLink)
    } else {
      form.reset({
        title: '',
        url: '',
      })
    }
  }, [selectedLink])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedLink) {
      try {
        await updateLink({ ...selectedLink, ...values })
        form.reset()
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao atualizar link',
          variant: 'destructive',
        })
      }
    } else {
      try {
        await registerLink(values)
        form.reset()
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao cadastrar link',
          variant: 'destructive',
        })
      }
    }
  }

  async function onDelete() {
    if (selectedLink) {
      try {
        await deleteLink({ linkId: selectedLink.id })
        form.reset()
        setOpenDialog(false)
      } catch (error) {
        console.error(error)
        toast({
          title: 'Erro ao deletar link',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className={cn('w-full space-y-2', className)}>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className='text-xl font-bold'>Links Importantes</h2>
            </AccordionTrigger>
            <AccordionContent>
              <ul className='w-full space-y-2'>
                {trip?.Links.map(link => {
                  return (
                    <li className='w-full flex flex-row justify-between' key={link.id}>
                      <DialogTrigger asChild onClick={() => setSelectedLink(link)}>
                        <div className='max-w-[80%] cursor-pointer'>
                          <h3 className='text-base font-semibold'>{link.title}</h3>
                          <p className='text-xs text-muted-foreground line-clamp-1'>{link.url}</p>
                        </div>
                      </DialogTrigger>
                      <Button size='icon' variant='ghost' onClick={
                        () => window.open(link.url, '_blank')
                      }>
                        <Link2Icon />
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>


        <DialogTrigger asChild>
          <Button
            variant='secondary'
            className='w-full'
            onClick={() => {
              setSelectedLink(null)
            }}
          >
            <PlusIcon />
            Cadastrar novo link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {selectedLink && (
              <Button
                size='icon'
                variant='destructive'
                className='absolute top-2 left-2'
                onClick={onDelete}
                isLoading={isDeletingLink}
              >
                <Trash2Icon />
              </Button>
            )}
            <DialogTitle>Link</DialogTitle>
            <DialogDescription>
              Todos convidados podem visualizar os links importantes.
            </DialogDescription>
          </DialogHeader>


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <CustomFormItem>
                    <FormControl>
                      <InputWithLeadingIcon
                        Icon={TagIcon}
                        placeholder='Título do link' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <CustomFormItem>
                    <FormControl>
                      <InputWithLeadingIcon
                        Icon={Link2Icon}
                        placeholder='URL' {...field} />
                    </FormControl>
                    <FormMessage />
                  </CustomFormItem>
                )}
              />
              <Button
                isLoading={isRegisteringLink || isDeletingLink || isUpdatingLink}
                className='w-full'
                type="submit"
              >Salvar link</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
