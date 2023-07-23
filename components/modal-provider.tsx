"use client"
import {toast} from "react-hot-toast"
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { userProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import {MessageSquare,Music,ImageIcon,VideoIcon,CodeIcon, Check, Zap} from "lucide-react"
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";

const tools = [
  {
    label:"Conversation",
    icon:MessageSquare,
    color:"text-violet-500",
    bgColor:"bg-violet-500/10",
    
  },
  {
    label:"Music Generation",
    icon:Music,
    color:"text-emerald-500",
    bgColor:"bg-emerald-500/10",
    
  },
  {
    label:"Image Generation",
    icon:ImageIcon,
    color:"text-pink-500",
    bgColor:"bg-pink-500/10",
    
  },
  {
    label:"Video Generation",
    icon:VideoIcon,
    color:"text-orange-500",
    bgColor:"bg-orange-500/10",
    
  },
  {
    label:"Code Generation",
    icon:CodeIcon,
    color:"text-green-700",
    bgColor:"bg-green-700/10",

  },
]

export const ModalProvider = ()=>{
    const proModal = userProModal();
    const [isMounted,setIsMounted] = useState(false);
    const [loading,setLoading]= useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

    const onSubscribe = async ()=>{
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
           
            toast.error("STRIPE_CLIENT_ERROR");
        }finally{
            setLoading(false);
        }
    }    

    return(
        <>
            <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                            <div className="flex items-center gap-x-2 font-bold py-1">
                                Upgrade to Pro
                                <Badge className="uppercase text-sm py-1" variant="premium">
                                    Pro
                                </Badge>
                            </div>
                        </DialogTitle>
                        <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                            {tools.map((tool)=>(
                                <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                                    <div className="flex items-center gap-x-4">
                                        <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                            <tool.icon className={cn("w-6 h-6",tool.color)} />
                                        </div>
                                        <div className="font-semibold text-sm">
                                            {tool.label}
                                        </div>
                                    </div>
                                    <Check className="text-primary w-5 h-5"/>
                                </Card>
                            ))}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button disabled={loading} onClick={onSubscribe} size='lg' variant='premium' className="w-full">
                            Upgrade
                            <Zap className="w-4 h-4 ml-2 fill-white"/>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}